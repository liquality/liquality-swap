import { replace } from 'connected-react-router'
import _ from 'lodash'
import moment from 'moment'
import config from '../config'
import { actions as swapActions } from './swap'
import { actions as secretActions } from './secretparams'
import { steps } from '../components/SwapProgressStepper/steps'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'
import { getFundExpiration } from '../utils/expiration'
import { generateLink } from '../utils/app-links'
import storage from '../utils/storage'

const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

async function setSecret (swap, party, tx, dispatch) {
  const currentParty = party === 'a' ? 'b' : 'a'
  const client = getClient(swap.assets[currentParty].currency, swap.wallets[currentParty].type)
  const secret = await client.getSwapSecret(tx.hash)
  dispatch(secretActions.setSecret(secret))
}

function setStep (transactions, isPartyB, dispatch) {
  let step = steps.INITIATION
  if (transactions.a.fund.hash) {
    step = steps.AGREEMENT
    if (transactions.b.fund.hash) {
      if (transactions.a.fund.confirmations >= config.minConfirmations && transactions.b.fund.confirmations >= config.minConfirmations) {
        if (transactions.b.claim.confirmations >= config.minConfirmations || !isPartyB) {
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
  const canNavigate = currentLocation.pathname !== '/backupLink' && currentLocation.pathname !== '/refund'
  if (canNavigate) {
    const hasInitiated = swap.transactions.a.fund.hash && swap.transactions.a.fund.confirmations > 0
    const canRefund = !swap.transactions.b.claim.hash || swap.transactions.b.claim.confirmations === 0
    const swapExpiration = getFundExpiration(swap.expiration, swap.isPartyB ? 'b' : 'a').time
    const swapExpired = moment().isAfter(swapExpiration)
    if (hasInitiated && canRefund && swapExpired) {
      dispatch(replace('/refund'))
    } else if (swap.step === steps.AGREEMENT && currentLocation.pathname !== '/waiting') {
      if (swap.isPartyB || swap.transactions.b.fund.hash) {
        dispatch(replace('/waiting'))
      } else {
        dispatch(replace('/counterPartyLink'))
      }
    } else if (swap.step === steps.CLAIMING) {
      dispatch(replace('/redeem'))
    } else if (swap.step === steps.SETTLED) {
      dispatch(replace('/completed'))
    }
  }
}

async function monitorTransaction (swap, party, kind, tx, dispatch, getState) {
  while (true) {
    let client
    if (kind === 'claim') {
      const currentParty = party === 'a' ? 'b' : 'a'
      client = getClient(swap.assets[currentParty].currency, swap.wallets[currentParty].type)
    } else if (kind === 'fund') {
      client = getClient(swap.assets[party].currency, swap.wallets[party].type)
    }
    const updatedTransaction = await client.getTransactionByHash(tx.hash)
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx: updatedTransaction })
    let state = getState()
    setStep(state.swap.transactions, state.swap.isPartyB, dispatch)
    state = getState()
    setLocation(state.swap, state.router.location, dispatch)
    await sleep(5000)
  }
}

function setTransaction (party, kind, tx) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx })
    let swap = getState().swap
    if (kind === 'claim') {
      await setSecret(swap, party, tx, dispatch)
    }
    swap = getState().swap
    if (!swap.link) {
      const link = generateLink(getState().swap)
      dispatch(swapActions.setLink(link))
    }
    swap = getState().swap
    storage.update({ transactions: { [party]: { [kind]: { hash: tx.hash } } } })
    await monitorTransaction(swap, party, kind, tx, dispatch, getState)
  }
}

function loadTransactions () {
  return async (dispatch, getState) => {
    const data = storage.get()
    if (data && data.transactions) {
      const transactions = data.transactions
      const transactionPaths = [
        'a.fund.hash',
        'b.fund.hash',
        'a.claim.hash',
        'b.claim.hash'
      ]
      transactionPaths.forEach(path => {
        if (_.has(transactions, path)) {
          const parts = path.split('.')
          const party = parts[0]
          const kind = parts[1]
          const txHash = _.get(transactions, path)
          dispatch(setTransaction(party, kind, { hash: txHash }))
        }
      })
      const swapState = getState().swap
      if (swapState.transactions.a.fund.hash && !swapState.transactions.b.claim.hash) {
        dispatch(swapActions.waitForSwapClaim())
      }
    }
  }
}

const actions = {
  setTransaction,
  loadTransactions
}

export { types, actions }
