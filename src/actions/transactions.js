import { replace } from 'connected-react-router'
import { actions as swapActions } from './swap'
import { steps } from '../components/SwapProgressStepper/steps'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'

const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

function setStep (transactions, isPartyB, dispatch) {
  let step = steps.INITIATION
  if (transactions.a.fund.hash) {
    step = steps.AGREEMENT
    if (transactions.b.fund.hash) {
      if (transactions.a.fund.confirmations >= 0 && transactions.b.fund.confirmations >= 0) {
        if (transactions.b.claim.confirmations >= 0 || !isPartyB) {
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

function setLocation (step, currentLocation, dispatch) {
  if (currentLocation.pathname !== '/refund') {
    if (step === steps.CLAIMING) {
      dispatch(replace('/redeem'))
    } else if (step === steps.SETTLED) {
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
    setLocation(state.swap.step, state.router.location, dispatch)
    await sleep(5000)
  }
}

function setTransaction (party, kind, tx) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx })
    const swap = getState().swap
    await monitorTransaction(swap, party, kind, tx, dispatch, getState)
  }
}

const actions = {
  setTransaction
}

export { types, actions }
