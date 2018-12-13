const types = {
  CHANGE_AMOUNT: 'CHANGE_AMOUNT'
}

function changeAmount (party, newValue) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHANGE_AMOUNT, party, newValue })
    const { assets } = getState().swap

    const a = {type: 'a', value: assets.a.value || 0}
    const b = {type: 'b', value: assets.b.value || 0}
    const rate = {type: 'rate', value: assets.rate.value || 0}

    if (party === 'a' || party === 'rate') {
      let newVal = +(parseFloat(a.value) * parseFloat(rate.value)).toFixed(6)
      dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newVal.toString() })
    } else if (party === 'b') {
      if (a.value === 0) {
        let newVal = +(parseFloat(b.value) * parseFloat(rate.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'a', newValue: newVal.toString() })
      } else {
        let newVal = +(parseFloat(b.value) / parseFloat(a.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'rate', newValue: newVal.toString() })
      }
    }
  }
}

const actions = {
  changeAmount
}

export { types, actions }
