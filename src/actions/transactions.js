import { replace } from 'connected-react-router'
import _ from 'lodash'
import { actions as swapActions } from './swap'
import { actions as secretActions } from './secretparams'
import { steps } from '../components/SwapProgressStepper/steps'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'
import storage from '../utils/storage'

const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

function setStep (transactions, isPartyB, dispatch) {
  let step = steps.INITIATION
  if (transactions.a.fund.hash) {
    step = steps.AGREEMENT
    if (transactions.b.fund.hash) {
      if (transactions.a.fund.confirmations > 0 && transactions.b.fund.confirmations > 0) {
        if (transactions.b.claim.confirmations > 0 || !isPartyB) {
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
  if (currentLocation.pathname !== '/refund' && currentLocation.pathname !== '/backupLink') {
    if (swap.step === steps.AGREEMENT && currentLocation.pathname !== '/waiting') {
      dispatch(replace(swap.isPartyB ? 'waiting' : '/counterPartyLink'))
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
      client = getClient(swap.assets[party === 'a' ? 'b' : 'a'].currency)
    } else if (kind === 'fund') {
      client = getClient(swap.assets[party].currency)
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
    storage.update({ transactions: { [party]: { [kind]: { hash: tx.hash } } } })
    if (tx.secret) {
      dispatch(secretActions.setSecret(tx.secret))
    }
    const swap = getState().swap
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
