import { replace } from 'connected-react-router'
import moment from 'moment'
import config from '../config'
import { actions as swapActions } from './swap'
import { actions as secretActions } from './secretparams'
import { steps } from '../components/SwapProgressStepper/steps'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'
import { getFundExpiration } from '../utils/expiration'
import { generateLink } from '../utils/app-links'

const types = {
  SET_TRANSACTION: 'SET_TRANSACTION',
  SET_START_BLOCK: 'SET_START_BLOCK',
  SET_IS_VERIFIED: 'SET_IS_VERIFIED'
}

function setIsVerified (isVerified) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_IS_VERIFIED, isVerified })
    updateStep(dispatch, getState)
  }
}

async function setSecret (swap, party, tx, dispatch) {
  const currentParty = party === 'a' ? 'b' : 'a'
  const client = getClient(swap.assets[currentParty].currency, swap.wallets[currentParty].type)
  const secret = await client.swap.getSwapSecret(tx.hash)
  dispatch(secretActions.setSecret(secret))
}

function setStep (transactions, isPartyB, isVerified, dispatch) {
  let step = steps.INITIATION
  if (transactions.a.fund.hash) {
    step = steps.AGREEMENT
    if (transactions.b.fund.hash) {
      if (transactions.a.fund.confirmations >= config.minConfirmations && transactions.b.fund.confirmations >= config.minConfirmations) {
        if ((transactions.b.claim.hash || !isPartyB) && isVerified) {
          step = steps.CLAIMING
        }
        if (transactions.a.claim.hash) {
          step = steps.SETTLED
        }
      }
    }
  }

  dispatch(swapActions.setStep(step))
}

function setLocation (swap, currentLocation, dispatch) {
  // Do not navigate away from backup link
  if (currentLocation.pathname === '/backupLink') return
  if (currentLocation.pathname === '/counterPartyLink') return

  const hasInitiated = swap.transactions.a.fund.hash && swap.transactions.a.fund.confirmations > 0
  const hasRefunded = swap.transactions.a.refund && swap.transactions.a.refund.hash
  const canRefund = !swap.transactions.b.claim.hash || swap.transactions.b.claim.confirmations === 0
  const canClaim = swap.transactions.b.claim.hash && swap.secretParams.secret
  const swapExpiration = getFundExpiration(swap.expiration, swap.isPartyB ? 'b' : 'a').time
  const swapExpired = moment().isAfter(swapExpiration)

  if (hasInitiated && swapExpired && !canClaim) {
    if (hasRefunded) {
      dispatch(replace('/refunded'))
    } else if (canRefund) {
      dispatch(replace('/refund'))
    }
  } else if (swap.step === steps.AGREEMENT) {
    dispatch(replace('/waiting'))
  } else if (swap.step === steps.CLAIMING) {
    dispatch(replace('/redeem'))
  } else if (swap.step === steps.SETTLED) {
    dispatch(replace('/completed'))
  }
}

function updateStep (dispatch, getState) {
  let state = getState()
  setStep(state.swap.transactions, state.swap.isPartyB, state.swap.transactions.isVerified, dispatch)
  state = getState()
  setLocation(state.swap, state.router.location, dispatch)
}

async function monitorTransaction (swap, party, kind, tx, dispatch, getState) {
  while (true) {
    let client
    if (kind === 'claim') {
      const currentParty = party === 'a' ? 'b' : 'a'
      client = getClient(swap.assets[currentParty].currency, swap.wallets[currentParty].type)
    } else if (kind === 'fund') {
      client = getClient(swap.assets[party].currency, swap.wallets[party].type)
    } else if (kind === 'refund') {
      client = getClient(swap.assets[party].currency, swap.wallets[party].type)
    }
    let updatedTransaction
    try {
      updatedTransaction = await client.chain.getTransactionByHash(tx.hash)
    } catch (e) {
      console.error(`Getting transaction ${tx.hash} failed. Trying again later.`)
    }
    if (updatedTransaction) {
      dispatch({ type: types.SET_TRANSACTION, party, kind, tx: updatedTransaction })
      if (kind === 'claim') {
        await setSecret(swap, party, updatedTransaction, dispatch)
      }
    }
    updateStep(dispatch, getState)
    await sleep(5000)
  }
}

function setTransaction (party, kind, tx) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx })
    let swap = getState().swap
    const link = generateLink(getState().swap)
    dispatch(swapActions.setLink(link))
    if (tx.hash) { // Only start monitoring when a hash is available
      swap = getState().swap
      await monitorTransaction(swap, party, kind, tx, dispatch, getState)
    }
  }
}

function setStartBlock (party, blockNumber) {
  return async (dispatch, getState) => {
    dispatch({type: types.SET_START_BLOCK, party, blockNumber})
    const link = generateLink(getState().swap)
    dispatch(swapActions.setLink(link))
  }
}

const actions = {
  setTransaction,
  setStartBlock,
  setIsVerified
}

export { types, actions }
