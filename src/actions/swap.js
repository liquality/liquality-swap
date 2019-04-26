import { replace } from 'connected-react-router'
import config from '../config'
import { getClient } from '../services/chainClient'
import { actions as transactionActions } from './transactions'
import { actions as secretActions } from './secretparams'
import { actions as walletActions } from './wallets'
import cryptoassets from '@liquality/cryptoassets'
import { sleep } from '../utils/async'
import { getFundExpiration, getClaimExpiration, generateExpiration } from '../utils/expiration'
import { isInitiateValid } from '../utils/validation'

const types = {
  SWITCH_SIDES: 'SWITCH_SIDES',
  SET_STEP: 'SET_STEP',
  SET_EXPIRATION: 'SET_EXPIRATION',
  SET_LINK: 'SET_LINK',
  SET_IS_VERIFIED: 'SET_IS_VERIFIED',
  SET_SHOW_ERRORS: 'SET_SHOW_ERRORS'
}

function switchSides () {
  return { type: types.SWITCH_SIDES }
}

function setStep (step) {
  return { type: types.SET_STEP, step }
}

function setExpiration (expiration) {
  return { type: types.SET_EXPIRATION, expiration }
}

function setLink (link) {
  return { type: types.SET_LINK, link }
}

function setIsVerified (isVerified) {
  return { type: types.SET_IS_VERIFIED, isVerified }
}

function showErrors () {
  return { type: types.SET_SHOW_ERRORS, showErrors: true }
}

function hideErrors () {
  return { type: types.SET_SHOW_ERRORS, showErrors: false }
}

async function ensureWallet (party, dispatch, getState) {
  const {
    wallets,
    assets
  } = getState().swap
  const client = getClient(assets[party].currency)
  const walletSet = wallets[party].connected
  const walletAvailable = await client.isWalletAvailable()
  if (!walletSet || !walletAvailable) {
    dispatch(walletActions.disconnectWallet(party))
    dispatch(walletActions.toggleWalletConnect(party))
    return false
  }
  return true
}

async function ensureSecret (dispatch, getState) {
  const {
    secretParams,
    assets,
    wallets,
    counterParty,
    isPartyB,
    expiration
  } = getState().swap
  if (!isPartyB && !secretParams.secret) {
    const walletConnected = await ensureWallet('a', dispatch, getState)
    if (!walletConnected) return

    const client = getClient(assets.a.currency)
    const secretData = [
      assets.a.value,
      assets.a.currency,
      assets.b.value,
      assets.b.currency,
      wallets.a.addresses[0],
      counterParty.a.address,
      wallets.b.addresses[0],
      counterParty.b.address,
      expiration.unix()
    ]
    const secretMsg = secretData.join('')
    const secret = await client.generateSecret(secretMsg)
    dispatch(secretActions.setSecret(secret))
  }
}

async function lockFunds (dispatch, getState) {
  const {
    assets,
    wallets,
    counterParty,
    secretParams,
    expiration,
    isPartyB
  } = getState().swap
  const client = getClient(assets.a.currency)

  const swapExpiration = isPartyB ? getFundExpiration(expiration, 'b').time : expiration

  const block = await client.getBlockHeight()
  const valueInUnit = cryptoassets[assets.a.currency].currencyToUnit(assets.a.value)
  const initiateSwapParams = [
    valueInUnit,
    counterParty.a.address,
    wallets.a.addresses[0],
    secretParams.secretHash,
    swapExpiration.unix()
  ]
  if (config.debug) { // TODO: enable debugging universally on all CAL functions (chainClient.js)
    console.log('Initiating Swap', initiateSwapParams)
  }
  const txHash = await client.initiateSwap(...initiateSwapParams)
  dispatch(transactionActions.setTransaction('a', 'fund', { hash: txHash, block }))
}

function initiateSwap () {
  return async (dispatch, getState) => {
    dispatch(showErrors())
    dispatch(setExpiration(generateExpiration()))
    const walletConnected = await ensureWallet('b', dispatch, getState)
    if (!walletConnected) return
    const initiateValid = isInitiateValid(getState().swap)
    if (!initiateValid) return
    await ensureSecret(dispatch, getState)
    await lockFunds(dispatch, getState)
    dispatch(setIsVerified(true))
    dispatch(replace('/backupLink'))
  }
}

function confirmSwap () {
  return async (dispatch, getState) => {
    dispatch(showErrors())
    const walletConnected = await ensureWallet('b', dispatch, getState)
    if (!walletConnected) return
    const initiateValid = isInitiateValid(getState().swap)
    if (!initiateValid) return
    await lockFunds(dispatch, getState)
    dispatch(waitForSwapClaim())
    dispatch(replace('/backupLink'))
  }
}

async function verifyInitiateSwapTransaction (dispatch, getState) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses } },
    counterParty,
    secretParams,
    transactions,
    expiration
  } = getState().swap
  const client = getClient(currency)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value)
  while (true) {
    try {
      const swapVerified = await client.verifyInitiateSwapTransaction(transactions.b.fund.hash, valueInUnit, addresses[0], counterParty.b.address, secretParams.secretHash, expiration.unix())
      if (swapVerified) {
        dispatch(setIsVerified(true))
        break
      }
    } catch (e) {
      console.error(e)
    }
    await sleep(5000)
  }
}

async function findInitiateSwapTransaction (dispatch, getState) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses } },
    counterParty,
    secretParams,
    expiration
  } = getState().swap
  const client = getClient(currency)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value)
  const swapExpiration = getFundExpiration(expiration, 'b').time
  const initiateTransaction = await client.findInitiateSwapTransaction(valueInUnit, addresses[0], counterParty.b.address, secretParams.secretHash, swapExpiration.unix())
  dispatch(transactionActions.setTransaction('b', 'fund', initiateTransaction))
}

function waitForSwapConfirmation () {
  return async (dispatch, getState) => {
    dispatch(replace('/waiting'))
    await findInitiateSwapTransaction(dispatch, getState)
  }
}

function waitForSwapClaim () {
  return async (dispatch, getState) => {
    const {
      assets,
      wallets,
      transactions,
      counterParty,
      secretParams,
      expiration,
      isPartyB
    } = getState().swap
    const client = getClient(assets.a.currency)
    const swapExpiration = getFundExpiration(expiration, isPartyB ? 'b' : 'a').time
    const claimTransaction = await client.findClaimSwapTransaction(transactions.a.fund.hash, counterParty.a.address, wallets.a.addresses[0], secretParams.secretHash, swapExpiration.unix())
    dispatch(transactionActions.setTransaction('b', 'claim', claimTransaction))
  }
}

async function unlockFunds (dispatch, getState) {
  const {
    assets,
    wallets,
    counterParty,
    transactions,
    secretParams,
    isPartyB,
    expiration
  } = getState().swap

  const client = getClient(assets.b.currency)
  const block = await client.getBlockHeight()
  const swapExpiration = getClaimExpiration(expiration, isPartyB ? 'b' : 'a').time
  const claimSwapParams = [
    transactions.b.fund.hash,
    wallets.b.addresses[0],
    counterParty.b.address,
    secretParams.secret,
    swapExpiration.unix()
  ]
  if (config.debug) { // TODO: enable debugging universally on all CAL functions (chainClient.js)
    console.log('Claiming Swap', claimSwapParams)
  }
  const txHash = await client.claimSwap(...claimSwapParams)
  dispatch(transactionActions.setTransaction('a', 'claim', { hash: txHash, block }))
}

function redeemSwap () {
  return async (dispatch, getState) => {
    await ensureSecret(dispatch, getState)
    const walletConnected = await ensureWallet('b', dispatch, getState)
    if (!walletConnected) return
    await unlockFunds(dispatch, getState)
  }
}

function refundSwap () {
  return async (dispatch, getState) => {
    const walletConnected = await ensureWallet('a', dispatch, getState)
    if (!walletConnected) return

    const {
      assets,
      wallets,
      counterParty,
      transactions,
      secretParams,
      isPartyB,
      expiration
    } = getState().swap

    const client = getClient(assets.a.currency)
    const swapExpiration = getFundExpiration(expiration, isPartyB ? 'b' : 'a').time
    await client.refundSwap(
      transactions.a.fund.hash,
      counterParty.a.address,
      wallets.a.addresses[0],
      secretParams.secretHash,
      swapExpiration.unix()
    )
  }
}

const actions = {
  switchSides,
  setStep,
  setExpiration,
  setLink,
  setIsVerified,
  showErrors,
  hideErrors,
  initiateSwap,
  confirmSwap,
  findInitiateSwapTransaction,
  verifyInitiateSwapTransaction,
  waitForSwapConfirmation,
  waitForSwapClaim,
  redeemSwap,
  refundSwap
}

export { types, actions }
