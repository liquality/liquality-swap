import _ from 'lodash';

const types = {
  CHANGE_AMOUNT: 'CHANGE_AMOUNT'
}

function changeAmount (party, newValue) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHANGE_AMOUNT, party, newValue })
    const assets = getState().swap.assets

    const a = {type: 'a', value: assets.a.value}
    const b = {type: 'b', value: assets.b.value}
    const rate = {type: 'rate', value: assets.rate.value}

    var filledInputs = _.filter([a,b,rate], (asset) => {
      return asset.value !== null && asset.value !== "0" && asset.value !== ""
    })
    var unfilledInputs = _.filter([a,b,rate], (asset) => {
      return asset.value === null || asset.value === "0" || asset.value === ""
    })

    var allFilled = filledInputs.length === 3
    var twoFilled = filledInputs.length === 2

    var onlyAUnfilled = twoFilled && unfilledInputs[0].type === 'a'
    var onlyBUnfilled = twoFilled && unfilledInputs[0].type === 'b'
    var onlyRateUnfilled = twoFilled && unfilledInputs[0].type === 'rate'

    if (filledInputs.length >= 2) {
      if (((allFilled && party === 'rate') || onlyAUnfilled) && party !== 'a') {
        var newA = +(parseFloat(b.value) * parseFloat(rate.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'a', newValue: newA.toString() })
      } else if (onlyBUnfilled && party !== 'b') {
        var newB = +(parseFloat(a.value) / parseFloat(rate.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newB.toString() })
      } else if ((allFilled || onlyRateUnfilled) && party !== 'rate') {
        var newRate = +(parseFloat(a.value) / parseFloat(b.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'rate', newValue: newRate.toString() })
      }
    }
  }
}

const actions = {
  changeAmount
}

export { types, actions }
