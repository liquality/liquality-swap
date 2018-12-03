import { actions as swapActions } from './swap'
import { steps } from '../components/SwapProgressStepper/steps'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'

const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

function setStep (transactions, dispatch) {
  let step = steps.INITIATION
  if (transactions.a.fund.hash) {
    step = steps.AGREEMENT
    if (transactions.b.fund.hash) {
      if (transactions.a.fund.confirmations > 0 && transactions.b.fund.confirmations > 0) {
        step = steps.CLAIMING
        if (transactions.a.claim.hash) {
          step = steps.SETTLED
        }
      }
    }
  }
  dispatch(swapActions.setStep(step))
}

async function monitorTransaction (swap, party, kind, tx, dispatch) {
  while (true) {
    let client
    if (kind === 'claim') {
      client = getClient(swap.assets[party === 'a' ? 'b' : 'a'].currency)
    } else if (kind === 'fund') {
      client = getClient(swap.assets[party].currency)
    }
    const updatedTransaction = await client.getTransactionByHash(tx.hash)
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx: updatedTransaction })
    await sleep(5000)
  }
}

function setTransaction (party, kind, tx) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx })
    const swap = getState().swap
    setStep(swap.transactions, dispatch)
    await monitorTransaction(swap, party, kind, tx, dispatch)
  }
}

const actions = {
  setTransaction
}

export { types, actions }
