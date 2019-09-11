/* global alert, localStorage */

import { replace } from 'connected-react-router'
import watch from 'redux-watch'
import { store } from '../store'
import config from '../config'
import { getClient } from '../services/chainClient'
import { actions as transactionActions } from './transactions'
import { actions as secretActions } from './secretparams'
import { actions as walletActions } from './wallets'
import cryptoassets from '@liquality/cryptoassets'
import { wallets as walletsConfig } from '../utils/wallets'
import { sleep } from '../utils/async'
import { getFundExpiration, getClaimExpiration, generateExpiration } from '../utils/expiration'
import { isInitiateValid } from '../utils/validation'

const types = {
  SWITCH_SIDES: 'SWITCH_SIDES',
  SET_STEP: 'SET_STEP',
  SET_EXPIRATION: 'SET_EXPIRATION',
  SET_LINK: 'SET_LINK',
  SET_IS_VERIFIED: 'SET_IS_VERIFIED',
  SET_SHOW_ERRORS: 'SET_SHOW_ERRORS',
  SET_LOADING_MESSAGE: 'SET_LOADING_MESSAGE'
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
  localStorage.setItem(link, '')
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

function setLoadingMessage (loadingMessage) {
  return { type: types.SET_LOADING_MESSAGE, loadingMessage: loadingMessage }
}

function clearLoadingMessage () {
  return { type: types.SET_LOADING_MESSAGE, loadingMessage: null }
}

async function ensureWallet (party, dispatch, getState) {
  const {
    wallets,
    assets
  } = getState().swap
  const client = wallets[party].type ? getClient(assets[party].currency, wallets[party].type) : null
  const walletSet = wallets[party].connected
  const walletAvailable = client ? await client.wallet.isWalletAvailable() : false
  const w = watch(store.getState, `swap.wallets.${party}`)

  return new Promise((resolve) => {
    const resolveOnConnection = () => {
      store.subscribe(w((wallet) => {
        if (wallet.connected && !wallet.connectOpen) resolve()
      }))
    }
    if (!walletSet) {
      dispatch(walletActions.toggleWalletConnect(party))
      resolveOnConnection()
    } else if (!walletAvailable) {
      dispatch(walletActions.disconnectWallet(party))
      dispatch(walletActions.toggleWalletConnect(party))
      resolveOnConnection()
    } else {
      resolve()
    }
  })
}

async function generateSecret (dispatch, getState) {
  const {
    assets,
    counterParty,
    expiration
  } = getState().swap
  await ensureWallet('a', dispatch, getState)
  const { wallets } = getState().swap
  const client = getClient(assets.a.currency, wallets.a.type)
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
  await withLoadingMessage('a', dispatch, getState, async () => {
    const secret = await client.swap.generateSecret(secretMsg)
    dispatch(secretActions.setSecret(secret))
  })
}

async function ensureSecret (dispatch, getState) {
  const {
    secretParams,
    isPartyB
  } = getState().swap
  if (!isPartyB && !secretParams.secret) {
    await generateSecret(dispatch, getState)
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
  const client = getClient(assets.a.currency, wallets.a.type)

  const swapExpiration = isPartyB ? getFundExpiration(expiration, 'b').time : expiration

  const blockNumber = await client.chain.getBlockHeight()
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
  const txHash = await client.swap.initiateSwap(...initiateSwapParams)
  if (wallets.a.type === 'metamask') { // TODO: fix properly
    alert('Please do not use the "Speed up" function to bump the priority of the transaction as this is not yet supported.')
  }
  dispatch(transactionActions.setTransaction('a', 'fund', { hash: txHash }))
  dispatch(transactionActions.setStartBlock('a', blockNumber))
}

async function withLoadingMessage (party, dispatch, getState, func) {
  const wallets = getState().swap.wallets
  const wallet = walletsConfig[wallets[party].type]
  dispatch(setLoadingMessage(`Confirm on ${wallet.name}`))
  try {
    await func(dispatch, getState)
  } finally {
    dispatch(clearLoadingMessage())
  }
}

async function setCounterPartyStartBlock (dispatch, getState) {
  const {
    assets: { b: { currency } },
    wallets: { b: { type } }
  } = getState().swap
  const client = getClient(currency, type)
  const blockNumber = await client.chain.getBlockHeight()
  dispatch(transactionActions.setStartBlock('b', blockNumber))
}

function initiateSwap () {
  return async (dispatch, getState) => {
    dispatch(showErrors())
    dispatch(setExpiration(generateExpiration()))
    await ensureWallet('a', dispatch, getState)
    const initiateValid = isInitiateValid(getState().swap)
    if (!initiateValid) return
    await generateSecret(dispatch, getState)
    await withLoadingMessage('a', dispatch, getState, async () => {
      await lockFunds(dispatch, getState)
    })
    await setCounterPartyStartBlock(dispatch, getState)
    dispatch(setIsVerified(true))
    dispatch(replace('/backupLink'))
  }
}

function confirmSwap () {
  return async (dispatch, getState) => {
    dispatch(showErrors())
    await ensureWallet('a', dispatch, getState)
    const initiateValid = isInitiateValid(getState().swap)
    if (!initiateValid) return
    await withLoadingMessage('a', dispatch, getState, lockFunds)
    dispatch(replace('/backupLink'))
  }
}

async function verifyInitiateSwapTransaction (dispatch, getState) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses, type } },
    counterParty,
    secretParams,
    transactions,
    expiration
  } = getState().swap
  const client = getClient(currency, type)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value)
  while (true) {
    try {
      const swapVerified = await client.swap.verifyInitiateSwapTransaction(transactions.b.fund.hash, valueInUnit, addresses[0], counterParty.b.address, secretParams.secretHash, expiration.unix())
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

async function findInitiateSwapTransaction (party, dispatch, getState) {
  const {
    assets: { [party]: { currency, value } },
    wallets: { [party]: { addresses, type } },
    transactions: { [party]: { startBlock } },
    counterParty,
    secretParams,
    expiration
  } = getState().swap
  const client = getClient(currency, type)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value)
  const swapExpiration = getFundExpiration(expiration, party).time
  const initiateTransaction = await client.swap.findInitiateSwapTransaction(valueInUnit, addresses[0], counterParty[party].address, secretParams.secretHash, swapExpiration.unix(), startBlock)
  dispatch(transactionActions.setTransaction(party, 'fund', initiateTransaction))
}

function waitForSwapConfirmation () {
  return async (dispatch, getState) => {
    await findInitiateSwapTransaction('b', dispatch, getState)
  }
}

function waitForSwapClaim (party) {
  return async (dispatch, getState) => {
    const {
      assets,
      wallets,
      transactions,
      counterParty,
      secretParams,
      expiration
    } = getState().swap
    const client = getClient(assets[party].currency, wallets[party].type)
    const swapExpiration = getFundExpiration(expiration, party).time
    const startBlock = transactions[party].startBlock
    const claimTransaction = await client.swap.findClaimSwapTransaction(transactions[party].fund.hash, counterParty[party].address, wallets[party].addresses[0], secretParams.secretHash, swapExpiration.unix(), startBlock)
    const oppositeParty = party === 'a' ? 'b' : 'a'
    dispatch(transactionActions.setTransaction(oppositeParty, 'claim', claimTransaction))
  }
}

function waitForSwapRefund () {
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
    const client = getClient(assets.a.currency, wallets.a.type)
    const swapExpiration = isPartyB ? getFundExpiration(expiration, 'b').time : expiration
    const startBlock = transactions.a.startBlock
    const refundTransaction = await client.swap.findRefundSwapTransaction(transactions.a.fund.hash, counterParty.a.address, wallets.a.addresses[0], secretParams.secretHash, swapExpiration.unix(), startBlock)
    dispatch(transactionActions.setTransaction('a', 'refund', refundTransaction))
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
  const client = getClient(assets.b.currency, wallets.b.type)
  const blockNumber = await client.chain.getBlockHeight()
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
  const txHash = await client.swap.claimSwap(...claimSwapParams)
  dispatch(transactionActions.setTransaction('a', 'claim', { hash: txHash, blockNumber }))
}

function redeemSwap () {
  return async (dispatch, getState) => {
    await ensureSecret(dispatch, getState)
    await ensureWallet('b', dispatch, getState)
    await withLoadingMessage('b', dispatch, getState, unlockFunds)
  }
}

function refundSwap () {
  return async (dispatch, getState) => {
    await ensureWallet('a', dispatch, getState)

    const {
      assets,
      wallets,
      counterParty,
      transactions,
      secretParams,
      isPartyB,
      expiration
    } = getState().swap

    const client = getClient(assets.a.currency, wallets.a.type)
    const swapExpiration = getFundExpiration(expiration, isPartyB ? 'b' : 'a').time
    const blockNumber = await client.chain.getBlockHeight()
    const refundSwapParams = [
      transactions.a.fund.hash,
      counterParty.a.address,
      wallets.a.addresses[0],
      secretParams.secretHash,
      swapExpiration.unix()
    ]
    console.log('Refunding Swap', refundSwapParams)
    await withLoadingMessage('a', dispatch, getState, async () => {
      const refundTxHash = await client.swap.refundSwap(...refundSwapParams)
      dispatch(transactionActions.setTransaction('a', 'refund', { hash: refundTxHash, blockNumber }))
    })
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
  waitForSwapRefund,
  redeemSwap,
  refundSwap
}

export { types, actions }
