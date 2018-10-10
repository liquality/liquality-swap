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
    secretParams
  } = getState().swap
  const client = getClient(assets.a.currency)
  let secretHash = secretParams.secretHash
  if (!secretHash) {
    const secretMsg = `${assets.a.value}${assets.a.currency}${assets.b.value}${assets.b.currency}${wallets.a.addresses[0]}${counterParty[assets.a.currency].address}${wallets.b.addresses[0]}${counterParty[assets.b.currency].address}`
    const secret = await client.generateSecret(secretMsg)
    secretHash = crypto.sha256(secret)
    dispatch(secretActions.setSecret(secret))
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

function waitForSwapConfirmation () {
  return async (dispatch, getState) => {
    const {
      assets: { b: { currency, value } },
      wallets: { b: { addresses } },
      counterParty,
      secretParams
    } = getState().swap
    const client = getClient(currency)
    const initiateTransaction = await client.findInitiateSwapTransaction(addresses[0], counterParty[currency].address, secretParams.secretHash, SWAP_EXPIRATION)
    dispatch(transactionActions.setTransaction('b', 'fund', initiateTransaction))
    dispatch(push('/redeem'))
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
    dispatch(transactionActions.setTransaction('a', 'claim', claimTransaction))
    dispatch(push('/redeem'))
  }
}

async function unlockFunds (dispatch, getState) {
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

function redeemSwap () {
  return async (dispatch, getState) => {
    await unlockFunds(dispatch, getState)
    dispatch(push('/completed'))
  }
}

const actions = {
  switchSides,
  initiateSwap,
  confirmSwap,
  waitForSwapConfirmation,
  waitForSwapClaim,
  redeemSwap
}

export { types, actions }
