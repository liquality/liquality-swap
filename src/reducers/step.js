import { types } from '../actions/transactions'
import { getReducerFunction } from './helpers'
import { steps } from '../components/SwapProgressStepper/steps'

const initialState = steps.INITIATION

function setStep (state, action) {
  return action.step
}

const reducers = {
  [types.SET_STEP]: setStep
}

const step = getReducerFunction(reducers, initialState)

export default step
