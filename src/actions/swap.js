import { push } from 'connected-react-router'
import { getClient } from '../services/chainClient'
import { actions as transactionActions } from './transactions'
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
    counterParty
  } = getState().swap
  const client = getClient(assets.a.currency)
  const secretMsg = `${assets.a.value}${assets.a.currency}${assets.b.value}${assets.b.currency}${wallets.a.addresses[0]}${counterParty[assets.a.currency].address}${wallets.b.addresses[0]}${counterParty[assets.b.currency].address}`
  const secretHash = await client.generateSecret(secretMsg)
  const bytecode = await client.generateSwap(
    counterParty[assets.a.currency].address,
    wallets.a.addresses[0],
    secretHash,
    SWAP_EXPIRATION
  )
  const block = await client.getBlockHeight()
  const valueInUnit = currencies[assets.a.currency].currencyToUnit(assets.a.value)
  const txHash = await client.sendTransaction(null, valueInUnit, bytecode, wallets.a.addresses[0])
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

async function checkSwapConfirmation(dispatch, getState, latestBlock) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses } },
    transactions: { a: { fund: { block } } },
    counterParty
  } = getState().swap
  const client = getClient(currency)

  let txid
  try {
    txid = await client.checkBlockSwap(latestBlock, addresses[0], counterParty[currency].address, SECRET_HASH, SWAP_EXPIRATION)
  } catch(e) {}
  

  if (txid) {
    dispatch(transactionActions.setTransaction('b', 'func', { hash: txid, block: latestBlock }))
    dispatch(push('/redeem'))
  } else {
    const newBlock = txid === undefined ? latestBlock : latestBlock + 1
    setTimeout(checkSwapConfirmation(dispatch, getState, newBlock), 2000)
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

const actions = {
  switchSides,
  initiateSwap,
  confirmSwap,
  checkSwapConfirmation,
  waitForSwapConfirmation
}

export { types, actions }
