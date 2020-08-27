import BigNumber from 'bignumber.js'
import { actions as agentActions } from './agent'

const types = {
  SET_ASSET: 'SET_ASSET',
  CHANGE_AMOUNT: 'CHANGE_AMOUNT',
  CHANGE_RATE: 'CHANGE_RATE',
  LOCK_RATE: 'LOCK_RATE'
}

function setAsset (party, currency) {
  return { type: types.SET_ASSET, party, currency }
}

function changeRate (newValue) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHANGE_RATE, newValue })
    const { assets } = getState().swap
    const a = {type: 'a', value: assets.a.value || BigNumber(0)}
    const rate = assets.rate || BigNumber(0)

    if (a.value.eq(0)) return BigNumber(0)

    let newVal = BigNumber(a.value.times(rate).toFixed(6))
    dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newVal })
  }
}

function changeAmount (party, newValue) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHANGE_AMOUNT, party, newValue })
    const { assets } = getState().swap

    const a = {type: 'a', value: assets.a.value || BigNumber(0)}
    const b = {type: 'b', value: assets.b.value || BigNumber(0)}
    const rate = assets.rate || BigNumber(0)

    if (party === 'a') {
      dispatch(agentActions.setMarket(assets.a.currency, assets.b.currency))
      let newVal = BigNumber(a.value.times(rate).toFixed(6)) // TODO: Is .tofixed() required??
      dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newVal })
    } else if (party === 'b') {
      if (a.value.isEqualTo(BigNumber(0))) {
        let newVal = BigNumber(b.value.times(rate.value).toFixed(6))
        dispatch({ type: types.CHANGE_AMOUNT, party: 'a', newValue: newVal })
      } else {
        let newRate = BigNumber(b.value.div(a.value).toFixed(6))
        dispatch({ type: types.CHANGE_RATE, newValue: newRate })
      }
    }
  }
}

const actions = {
  setAsset,
  changeAmount,
  changeRate
}

export { types, actions }
