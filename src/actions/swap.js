import { push } from 'connected-react-router'
import { getClient } from '../services/chainClient'
import { crypto } from '@liquality/chainabstractionlayer/dist/index.umd.js'
import { actions as transactionActions } from './transactions'
import { actions as secretActions } from './secretparams'
import currencies from '../utils/currencies'
import { sleep } from '../utils/async'
import { getPartyExpiration, generateExpiration } from '../utils/expiration'
import moment from 'moment'

const types = {
  SWITCH_SIDES: 'SWITCH_SIDES',
  SET_EXPIRATION: 'SET_EXPIRATION'
}

function switchSides () {
  return { type: types.SWITCH_SIDES }
}

function setExpiration (expiration) {
  return { type: types.SET_EXPIRATION, expiration }
}

async function lockFunds (dispatch, getState) {
  const {
    assets,
    wallets,
    counterParty,
    secretParams,
    expiration
  } = getState().swap
  const client = getClient(assets.a.currency)
  let secretHash = secretParams.secretHash
  if (!secretHash) {
    const secretMsg = `${assets.a.value}${assets.a.currency}${assets.b.value}${assets.b.currency}${wallets.a.addresses[0]}${counterParty[assets.a.currency].address}${wallets.b.addresses[0]}${counterParty[assets.b.currency].address}`
    const secret = await client.generateSecret(secretMsg)
    secretHash = crypto.sha256(secret)
    dispatch(secretActions.setSecret(secret))
  }

  let swapExpiration
  if (expiration) {
    swapExpiration = getPartyExpiration(expiration, 'b')
  } else {
    swapExpiration = generateExpiration()
    dispatch(setExpiration(swapExpiration))
  }

  const block = await client.getBlockHeight()
  const valueInUnit = currencies[assets.a.currency].currencyToUnit(assets.a.value)
  const txHash = await client.initiateSwap(
    valueInUnit,
    counterParty[assets.a.currency].address,
    wallets.a.addresses[0],
    secretHash,
    swapExpiration.unix()
  )
  dispatch(transactionActions.setTransaction('a', 'fund', { hash: txHash, block }))
  dispatch(waitForExpiration)
}

function initiateSwap () {
  return async (dispatch, getState) => {
    await lockFunds(dispatch, getState)
    dispatch(push('/swap/counterPartyLink'))
  }
}

function confirmSwap () {
  return async (dispatch, getState) => {
    await lockFunds(dispatch, getState)
    dispatch(push('/swap/waiting'))
  }
}

async function findAndVerifyInitiateSwapTransaction (dispatch, getState) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses } },
    counterParty,
    secretParams,
    transactions,
    expiration
  } = getState().swap
  const client = getClient(currency)
  const valueInUnit = currencies[currency].currencyToUnit(value)
  while (true) {
    const swapVerified = await client.verifyInitiateSwapTransaction(transactions.b.fund.hash, valueInUnit, addresses[0], counterParty[currency].address, secretParams.secretHash, expiration.unix())
    if (swapVerified) break
    await sleep(5000)
  }
  let initiateTransaction
  while (true) {
    initiateTransaction = await client.getTransactionByHash(transactions.b.fund.hash)
    if (initiateTransaction && initiateTransaction.confirmations > 0) break
    await sleep(5000)
  }
  dispatch(transactionActions.setTransaction('b', 'fund', initiateTransaction))
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
  const valueInUnit = currencies[currency].currencyToUnit(value)
  const swapExpiration = getPartyExpiration(expiration, 'b')
  const initiateTransaction = await client.findInitiateSwapTransaction(valueInUnit, addresses[0], counterParty[currency].address, secretParams.secretHash, swapExpiration.unix())
  dispatch(transactionActions.setTransaction('b', 'fund', initiateTransaction))
}

function waitForSwapConfirmation () {
  return async (dispatch, getState) => {
    await findInitiateSwapTransaction(dispatch, getState)
    dispatch(push('/swap/redeem'))
  }
}

function waitForSwapClaim () {
  return async (dispatch, getState) => {
    const {
      assets,
      transactions,
      secretParams
    } = getState().swap
    const client = getClient(assets.a.currency)
    const claimTransaction = await client.findClaimSwapTransaction(transactions.a.fund.hash, secretParams.secretHash)
    dispatch(secretActions.setSecret(claimTransaction.secret))
    dispatch(transactionActions.setTransaction('b', 'claim', claimTransaction))
    dispatch(push('/swap/redeem'))
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
  const swapExpiration = getPartyExpiration(expiration, isPartyB ? 'a' : 'b')
  const txHash = await client.claimSwap(
    transactions.b.fund.hash,
    wallets.b.addresses[0],
    counterParty[assets.b.currency].address,
    secretParams.secret,
    swapExpiration.unix()
  )
  dispatch(transactionActions.setTransaction('a', 'claim', { hash: txHash, block }))
  dispatch(waitForExpiration)
}

function redeemSwap () {
  return async (dispatch, getState) => {
    await unlockFunds(dispatch, getState)
    dispatch(push('/swap/completed'))
  }
}

function refundSwap () {
  return async (dispatch, getState) => {
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
    const swapExpiration = getPartyExpiration(expiration, isPartyB ? 'b' : 'a')
    await client.refundSwap(
      transactions.a.fund.hash,
      counterParty[assets.a.currency].address,
      wallets.a.addresses[0],
      secretParams.secretHash,
      swapExpiration.unix()
    )
  }
}

async function waitForExpiration (dispatch, getState) {
  const {
    isPartyB,
    expiration
  } = getState().swap

  const swapExpiration = getPartyExpiration(expiration, isPartyB ? 'b' : 'a')
  let swapExpired = false
  while (true) {
    swapExpired = moment().isAfter(swapExpiration)
    if (swapExpired) break
    await sleep(5000)
  }
  dispatch(push('/swap/refund'))
}

const actions = {
  switchSides,
  setExpiration,
  initiateSwap,
  confirmSwap,
  findInitiateSwapTransaction,
  findAndVerifyInitiateSwapTransaction,
  waitForSwapConfirmation,
  waitForSwapClaim,
  waitForExpiration,
  redeemSwap,
  refundSwap
}

export { types, actions }
