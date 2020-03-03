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
    const a = {type: 'a', value: assets.a.value || 0}
    const rate = assets.rate || 0

    if (a.value === 0) return ''

    let newVal = +(parseFloat(a.value) * parseFloat(rate)).toFixed(6)
    dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newVal.toString() })
  }
}

function changeAmount (party, newValue) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHANGE_AMOUNT, party, newValue })
    const { assets } = getState().swap

    const a = {type: 'a', value: assets.a.value || 0}
    const b = {type: 'b', value: assets.b.value || 0}
    const rate = assets.rate || 0

    if (party === 'a') {
      let newVal = +(parseFloat(a.value) * parseFloat(rate)).toFixed(6)
      dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newVal.toString() })
    } else if (party === 'b') {
      if (a.value === 0) {
        let newVal = +(parseFloat(b.value) * parseFloat(rate.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'a', newValue: newVal.toString() })
      } else {
        let newRate = +(parseFloat(b.value) / parseFloat(a.value)).toFixed(6)
        dispatch({ type: types.CHANGE_RATE, newValue: newRate.toString() })
      }
    }
  }
}

function lockRate () {
  return { type: types.LOCK_RATE }
}

const actions = {
  setAsset,
  changeAmount,
  changeRate,
  lockRate
}

export { types, actions }
