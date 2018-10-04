import { push } from 'connected-react-router'
import { getClient } from '../services/chainClient'
import { crypto } from 'chainabstractionlayer/dist/index.umd.js'
import { actions as transactionActions } from './transactions'
import { actions as secretActions } from './secretparams'
import currencies from '../utils/currencies'

const types = {
  SWITCH_SIDES: 'SWITCH_SIDES'
}

const SWAP_EXPIRATION = 12
const SECRET = 'this is a secret'
const SECRET_HASH = 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'

function switchSides () {
  return { type: types.SWITCH_SIDES }
}

async function lockFunds (dispatch, getState) {
  const {
    assets,
    wallets,
    counterParty,
    transactions,
    secretParams
  } = getState().swap
  const client = getClient(assets.a.currency)
  let secret, secretMsg
  let secretHash = secretParams.secretHash
  if (!secretHash) {
    secretMsg = `${assets.a.value}${assets.a.currency}${assets.b.value}${assets.b.currency}${wallets.a.addresses[0]}${counterParty[assets.a.currency].address}${wallets.b.addresses[0]}${counterParty[assets.b.currency].address}`
    secret = await client.generateSecret(secretMsg)
    secretHash = crypto.sha256(secret)
  }
  const block = await client.getBlockHeight()
  const valueInUnit = currencies[assets.a.currency].currencyToUnit(assets.a.value)
  const txHash = await client.initiateSwap(
    valueInUnit,
    counterParty[assets.a.currency].address,
    wallets.a.addresses[0],
    secretHash,
    SWAP_EXPIRATION
  )
  dispatch(transactionActions.setTransaction('a', 'fund', { hash: txHash, block }))
  dispatch(secretActions.setSecret(secret))
}

function initiateSwap () {
  return async (dispatch, getState) => {
    await lockFunds(dispatch, getState)
    dispatch(push('/backupLink'))
  }
}

function confirmSwap () {
  return async (dispatch, getState) => {
    await lockFunds(dispatch, getState)
    dispatch(push('/backupLink'))
  }
}

async function checkSwapConfirmation(dispatch, getState, latestBlock) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses } },
    transactions: { a: { fund: { block } } },
    counterParty,
    secretParams
  } = getState().swap
  const client = getClient(currency)

  let txid
  try {
    txid = await client.getSwapTransaction(latestBlock, addresses[0], counterParty[currency].address, secretParams.secretHash, SWAP_EXPIRATION)
  } catch(e) {}

  if (txid) {
    dispatch(transactionActions.setTransaction('b', 'fund', { hash: txid, block: latestBlock }))
    dispatch(push('/redeem'))
  } else {
    const newBlock = txid === undefined ? latestBlock : latestBlock + 1
    setTimeout(checkSwapConfirmation(dispatch, getState, newBlock), 1000000)
  }
}

function waitForSwapConfirmation () {
  return async (dispatch, getState) => {
    const {
      assets: { b: { currency, value } },
    } = getState().swap
    const client = getClient(currency)
    const latestBlock = await client.getBlockHeight()

    await checkSwapConfirmation(dispatch, getState, latestBlock)
  }
}

async function checkSwapRedemption(dispatch, getState, latestBlock) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses } },
    transactions: { a: { fund: { block, secretHash } } },
    counterParty,
    transactions
  } = getState().swap
  const client = getClient(currency)

  let txid
  try {
    txid = await client.getSwapConfirmTransaction(latestBlock, addresses[0], counterParty[currency].address, secretHash, SWAP_EXPIRATION)
  } catch(e) {}

  if (txid) {
    dispatch(transactionActions.setTransaction('b', 'claim', { hash: txid, block: latestBlock }))
    dispatch(push('/redeem'))
  } else {
    const newBlock = txid === undefined ? latestBlock : latestBlock + 1
    setTimeout(checkSwapRedemption(dispatch, getState, newBlock), 1000000)
  }
}

function waitForSwapRedemption() {
  return async (dispatch, getState) => {
    const {
      assets: { a: { currency, value } },
    } = getState().swap
    const client = getClient(currency)
    const latestBlock = await client.getBlockHeight()

    await checkSwapConfirmation(dispatch, getState, latestBlock)
  }
}

async function unlockFunds(dispatch, getState) {
  const {
    assets,
    wallets,
    counterParty,
    transactions,
    secretParams
  } = getState().swap
  const client = getClient(assets.b.currency)
  const block = await client.getBlockHeight()
  const txHash = await client.claimSwap(transactions.b.fund.hash, wallets.b.addresses[0], counterParty[assets.b.currency].address, secretParams.secret, SWAP_EXPIRATION)
  dispatch(transactionActions.setTransaction('b', 'claim', { hash: txHash, block }))
}

function redeemSwap() {
  return async (dispatch, getState) => {
    await unlockFunds(dispatch, getState)
    dispatch(push('/completed'))
  }
}

const actions = {
  switchSides,
  initiateSwap,
  confirmSwap,
  checkSwapConfirmation,
  waitForSwapConfirmation,
  redeemSwap
}

export { types, actions }
