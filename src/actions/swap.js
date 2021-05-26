/* global alert, localStorage */

import { replace } from 'connected-react-router'
import watch from 'redux-watch'
import { store, initialAppState as canonicalAppState } from '../store'
import config from '../config'
import { getClient } from '../services/chainClient'
import { getAgentClient } from '../services/agentClient'
import { actions as transactionActions } from './transactions'
import { actions as secretActions } from './secretparams'
import { actions as walletActions } from './wallets'
import { actions as syncActions } from './sync'
import { actions as agentActions } from './agent'
import { assets as cryptoassets, currencyToUnit } from '@liquality/cryptoassets'
import { wallets as walletsConfig } from '../utils/wallets'
import { getFundExpiration, getClaimExpiration, generateExpiration } from '../utils/expiration'
import { isInitiateValid } from '../utils/validation'
import { getActionPopups, WALLET_ACTION_STEPS, SWAP_STAGES } from '../utils/walletActionPopups'
import { sleep } from '../utils/async'

const types = {
  SWITCH_SIDES: 'SWITCH_SIDES',
  SET_STEP: 'SET_STEP',
  SET_EXPIRATION: 'SET_EXPIRATION',
  SET_LINK: 'SET_LINK',
  SET_SHOW_ERRORS: 'SET_SHOW_ERRORS',
  SET_LOADING_MESSAGE: 'SET_LOADING_MESSAGE',
  RESET: 'RESET'
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
  window.location = link
  return { type: types.SET_LINK, link }
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

function reset () {
  return { type: types.RESET, loadingMessage: null }
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

async function setInitiationWalletPopups (confirm, dispatch, getState) {
  const {
    assets,
    wallets
  } = getState().swap
  const popup = getActionPopups(SWAP_STAGES.INITIATE, assets.a.currency, wallets.a.type)
  const popupSteps = popup.steps
  const theSteps = confirm ? [popupSteps[1]] : popupSteps
  dispatch(walletActions.setPopupSteps(theSteps))
}

async function setClaimWalletPopups (sign, dispatch, getState) {
  const {
    assets,
    wallets
  } = getState().swap
  const signTransactionPopup = getActionPopups(SWAP_STAGES.CLAIM, assets.a.currency, wallets.a.type)
  const claimTransactionPopup = getActionPopups(SWAP_STAGES.CLAIM, assets.b.currency, wallets.b.type)
  const steps = []

  if (sign) {
    steps.push(signTransactionPopup.steps[0])
  }
  steps.push(claimTransactionPopup.steps[1])

  dispatch(walletActions.setPopupSteps(steps))
}

async function setRefundWalletSteps (dispatch, getState) {
  const {
    assets,
    wallets
  } = getState().swap
  const refundTransactionPopups = getActionPopups(SWAP_STAGES.REFUND, assets.a.currency, wallets.a.type)
  dispatch(walletActions.setPopupSteps([refundTransactionPopups.steps[1]]))
}

async function generateSecret (dispatch, getState) {
  const {
    assets,
    expiration,
    wallets,
    transactions,
    secretParams
  } = getState().swap
  // Do not regenerate if initiation has already happened
  if (secretParams.secret && transactions.a.initiation.hash) return

  const { wallets: canonicalWallets, counterParty: canonicalCounterParty } = canonicalAppState.swap || getState().swap
  const client = getClient(assets.a.currency, wallets.a.type)
  const secretMsg = `Swap terms:
  
Send: ${assets.a.value} ${assets.a.currency.toUpperCase()}
Receive: ${assets.b.value} ${assets.b.currency.toUpperCase()}

My ${assets.a.currency.toUpperCase()} Address: ${canonicalWallets.a.addresses[0]}
My ${assets.b.currency.toUpperCase()} Address: ${canonicalWallets.b.addresses[0]}

Counterparty ${assets.a.currency.toUpperCase()} Address: ${canonicalCounterParty.a.address}
Counterparty ${assets.b.currency.toUpperCase()} Address: ${canonicalCounterParty.b.address}

Time ref: ${expiration.unix()}`

  await withLoadingMessage('a', dispatch, getState, async () => {
    const secret = await client.swap.generateSecret(secretMsg)
    dispatch(secretActions.setSecret(secret))
  })
}

async function initiateSwap (dispatch, getState) {
  const {
    assets,
    wallets,
    secretParams,
    expiration,
    transactions,
    isPartyB
  } = getState().swap

  if (transactions.a.initiation.hash) return

  const { wallets: canonicalWallets, counterParty: canonicalCounterParty } = canonicalAppState.swap || getState().swap
  const client = getClient(assets.a.currency, wallets.a.type)

  const swapExpiration = isPartyB ? getFundExpiration(expiration, 'b').time : expiration

  const blockNumber = await client.chain.getBlockHeight()
  const fees = await client.chain.getFees()
  const valueInUnit = currencyToUnit(cryptoassets[assets.a.currency], assets.a.value)
  const swapParams = {
    value: valueInUnit,
    recipientAddress: canonicalCounterParty.a.address,
    refundAddress: canonicalWallets.a.addresses[0],
    secretHash: secretParams.secretHash,
    expiration: swapExpiration.unix()
  }
  if (config.debug) { // TODO: enable debugging universally on all CAL functions (chainClient.js)
    console.log('Initiating Swap', swapParams)
  }
  const initiationTx = await client.swap.initiateSwap(swapParams, fees[config.defaultFee].fee)
  if (wallets.a.type === 'metamask') { // TODO: fix properly
    alert('Please do not use the "Speed up" function to bump the priority of the transaction as this is not yet supported.')
  }
  dispatch(transactionActions.setTransaction('a', 'initiation', { hash: initiationTx.hash }))
  dispatch(transactionActions.setStartBlock('a', blockNumber))
}

async function fundSwap (dispatch, getState) {
  const {
    assets,
    wallets,
    transactions,
    secretParams,
    expiration,
    isPartyB
  } = getState().swap
  const { wallets: canonicalWallets, counterParty: canonicalCounterParty } = canonicalAppState.swap || getState().swap
  const client = getClient(assets.a.currency, wallets.a.type)

  // Only ERC20 swaps need fund step
  const isERC20 = config.assets[assets.a.currency].type === 'erc20'
  if (!isERC20) return

  let initiationTransactionReceipt = null
  while (initiationTransactionReceipt === null) {
    initiationTransactionReceipt = await client.getMethod('getTransactionReceipt')(transactions.a.initiation.hash)
    await sleep(5000)
  }
  const initiationSuccessful = initiationTransactionReceipt.contractAddress && initiationTransactionReceipt.status === '0x1'

  if (!initiationSuccessful) {
    throw new Error(`ERC20 Swap Initiation Transaction Failed: ${initiationTransactionReceipt.transactionHash}`)
  }

  const swapExpiration = getFundExpiration(expiration, isPartyB ? 'b' : 'a').time

  const fees = await client.chain.getFees()
  const valueInUnit = currencyToUnit(cryptoassets[assets.a.currency], assets.a.value)
  const swapParams = {
    value: valueInUnit,
    recipientAddress: canonicalCounterParty.a.address,
    refundAddress: canonicalWallets.a.addresses[0],
    secretHash: secretParams.secretHash,
    expiration: swapExpiration.unix()
  }
  const fundSwapParams = [
    swapParams,
    transactions.a.initiation.hash,
    fees[config.defaultFee].fee
  ]
  if (config.debug) { // TODO: enable debugging universally on all CAL functions (chainClient.js)
    console.log('Funding Swap', fundSwapParams)
  }
  const fundTx = await client.swap.fundSwap(...fundSwapParams)
  if (fundTx) {
    if (wallets.a.type === 'metamask') { // TODO: fix properly
      alert('Please do not use the "Speed up" function to bump the priority of the transaction as this is not yet supported.')
    }
    dispatch(transactionActions.setTransaction('a', 'fund', { hash: fundTx.hash }))
  }
}

async function withWalletPopupStep (step, dispatch, getState, func) {
  const steps = getState().swap.wallets.popup.steps
  if (steps && steps.find(s => s.id === step)) {
    dispatch(walletActions.setPopupStep(step))
    try {
      await func(dispatch, getState)
      if (steps.findIndex(s => s.id === step) + 1 === steps.length) { // Close popup after last step
        dispatch(walletActions.closePopup())
      }
    } catch (e) {
      dispatch(walletActions.closePopup())
      throw (e)
    }
  } else {
    await func(dispatch, getState)
  }
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

async function withLockedQuote (dispatch, getState, func) {
  dispatch(agentActions.lockQuote())
  try {
    await func(dispatch, getState)
  } catch (e) {
    const { transactions } = getState().swap
    // Do not unlock quote if initiation has happened
    if (!transactions.a.initiation.hash) dispatch(agentActions.unlockQuote())
    throw (e)
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

async function submitOrder (quote, dispatch, getState) {
  const swap = getState().swap
  await getAgentClient(swap.agent.quote.agent).submitOrder(
    quote.id,
    swap.transactions.a.initiation.hash,
    swap.wallets.a.addresses[0],
    swap.wallets.b.addresses[0],
    swap.secretParams.secretHash
  )
}

function createExpiration (dispatch, getState) {
  const {
    transactions,
    agent: { quote },
    expiration
  } = getState().swap
  // Do not regenerate expiration if initiation has happened
  if (expiration && transactions.a.initiation.hash) return
  const generatedExpiration = quote ? quote.swapExpiration : generateExpiration()
  dispatch(setExpiration(generatedExpiration))
}

function createSwap () {
  return async (dispatch, getState) => {
    dispatch(showErrors())
    const quote = getState().swap.agent.quote
    createExpiration(dispatch, getState)
    const initiateValid = isInitiateValid(getState().swap)
    if (!initiateValid) return
    await withLockedQuote(dispatch, getState, async () => {
      await setInitiationWalletPopups(false, dispatch, getState)
      await withWalletPopupStep(WALLET_ACTION_STEPS.SIGN, dispatch, getState, async () => {
        await generateSecret(dispatch, getState)
      })
      await withWalletPopupStep(WALLET_ACTION_STEPS.CONFIRM, dispatch, getState, async () => {
        await withLoadingMessage('a', dispatch, getState, async () => {
          await initiateSwap(dispatch, getState)
          await fundSwap(dispatch, getState)
        })
      })
      await setCounterPartyStartBlock(dispatch, getState)
      if (quote) {
        await submitOrder(quote, dispatch, getState)
      }
    })
    dispatch(syncActions.sync('a'))
    dispatch(syncActions.sync('b'))
    dispatch(replace('/backupLink'))
  }
}

function confirmSwap () {
  return async (dispatch, getState) => {
    dispatch(showErrors())
    await ensureWallet('a', dispatch, getState)
    const initiateValid = isInitiateValid(getState().swap)
    if (!initiateValid) return
    await setInitiationWalletPopups(true, dispatch, getState)
    await withWalletPopupStep(WALLET_ACTION_STEPS.CONFIRM, dispatch, getState, async () => {
      await withLoadingMessage('a', dispatch, getState, async () => {
        await initiateSwap(dispatch, getState)
        await fundSwap(dispatch, getState)
      })
    })
    dispatch(replace('/backupLink'))
  }
}

async function claimSwap (dispatch, getState) {
  const {
    assets,
    wallets,
    transactions,
    secretParams,
    isPartyB,
    expiration
  } = getState().swap
  const { wallets: canonicalWallets, counterParty: canonicalCounterParty } = canonicalAppState.swap || getState().swap
  const client = getClient(assets.b.currency, wallets.b.type)
  const fees = await client.chain.getFees()
  const blockNumber = await client.chain.getBlockHeight()
  const swapExpiration = getClaimExpiration(expiration, isPartyB ? 'b' : 'a').time
  const valueInUnit = currencyToUnit(cryptoassets[assets.b.currency], assets.b.value)
  const swapParams = {
    value: valueInUnit,
    recipientAddress: canonicalWallets.b.addresses[0],
    refundAddress: canonicalCounterParty.b.address,
    secretHash: secretParams.secretHash,
    expiration: swapExpiration.unix()
  }
  const claimSwapParams = [
    swapParams,
    transactions.b.initiation.hash,
    secretParams.secret,
    fees[config.defaultFee].fee
  ]
  if (config.debug) { // TODO: enable debugging universally on all CAL functions (chainClient.js)
    console.log('Claiming Swap', claimSwapParams)
  }
  const claimTx = await client.swap.claimSwap(...claimSwapParams)
  dispatch(transactionActions.setTransaction('a', 'claim', { hash: claimTx.hash, blockNumber }))
}

function redeemSwap () {
  return async (dispatch, getState) => {
    const {
      secretParams,
      isPartyB
    } = getState().swap
    const secretRequired = !isPartyB && !secretParams.secret
    if (secretRequired) {
      await ensureWallet('a', dispatch, getState)
      await setClaimWalletPopups(secretRequired, dispatch, getState)
      await withWalletPopupStep(WALLET_ACTION_STEPS.SIGN, dispatch, getState, generateSecret)
    }
    await setClaimWalletPopups(secretRequired, dispatch, getState)
    await withWalletPopupStep(WALLET_ACTION_STEPS.CONFIRM, dispatch, getState, async () => {
      await ensureWallet('b', dispatch, getState)
      await setClaimWalletPopups(secretRequired, dispatch, getState)
      await withLoadingMessage('b', dispatch, getState, claimSwap)
    })
  }
}

function refundSwap () {
  return async (dispatch, getState) => {
    await ensureWallet('a', dispatch, getState)

    const {
      assets,
      wallets,
      transactions,
      secretParams,
      isPartyB,
      expiration
    } = getState().swap
    const { wallets: canonicalWallets, counterParty: canonicalCounterParty } = canonicalAppState.swap || getState().swap

    const client = getClient(assets.a.currency, wallets.a.type)
    const swapExpiration = getFundExpiration(expiration, isPartyB ? 'b' : 'a').time
    const valueInUnit = currencyToUnit(cryptoassets[assets.a.currency], assets.a.value)
    const fees = await client.chain.getFees()
    const blockNumber = await client.chain.getBlockHeight()
    const swapParams = {
      value: valueInUnit,
      recipientAddress: canonicalCounterParty.a.address,
      refundAddress: canonicalWallets.a.addresses[0],
      secretHash: secretParams.secretHash,
      expiration: swapExpiration.unix()
    }
    const refundSwapParams = [
      swapParams,
      transactions.a.initiation.hash,
      fees[config.defaultFee].fee
    ]
    console.log('Refunding Swap', refundSwapParams)
    await setRefundWalletSteps(dispatch, getState)
    await withWalletPopupStep(WALLET_ACTION_STEPS.CONFIRM, dispatch, getState, async () => {
      await withLoadingMessage('a', dispatch, getState, async () => {
        const refundTx = await client.swap.refundSwap(...refundSwapParams)
        dispatch(transactionActions.setTransaction('a', 'refund', { hash: refundTx.hash, blockNumber }))
      })
    })
  }
}

const actions = {
  switchSides,
  setStep,
  setExpiration,
  setLink,
  showErrors,
  hideErrors,
  reset,
  createSwap,
  confirmSwap,
  redeemSwap,
  refundSwap
}

export { types, actions }
