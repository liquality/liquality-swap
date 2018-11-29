import { actions as swapActions } from './swap'
import { steps } from '../components/SwapProgressStepper/steps'

const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

function setTransaction (party, kind, tx) {
  return (dispatch, getState) => {
    dispatch({ type: types.SET_TRANSACTION, party, kind, tx })
    const transactions = getState().swap.transactions
    let step = steps.INITIATION
    if (transactions.a.fund.hash) {
      step = steps.AGREEMENT
      if (transactions.b.fund.hash) {
        step = steps.CLAIMING
        if (transactions.a.claim.hash) {
          step = steps.SETTLED
        }
      }
    }
    dispatch(swapActions.setStep(step))
  }
}

const actions = {
  setTransaction
}

export { types, actions }
