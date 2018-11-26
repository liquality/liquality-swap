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

    var unfilledInputs = _.filter([a,b,rate], (asset) => {
      return asset.value === null || asset.value === "0" || asset.value === ""
    })

    if (unfilledInputs.length <= 1) {
      if (((unfilledInputs.length === 0 && party === 'rate') ||
           (unfilledInputs.length === 1 && unfilledInputs[0].type === 'a')) &&
          party !== 'a') {
        var newA = +(parseFloat(b.value) * parseFloat(rate.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'a', newValue: newA.toString() })
      } else if ((unfilledInputs.length === 1 && unfilledInputs[0].type === 'b') &&
                 party !== 'b') {
        var newB = +(parseFloat(a.value) / parseFloat(rate.value)).toFixed(6)
        dispatch({ type: types.CHANGE_AMOUNT, party: 'b', newValue: newB.toString() })
      } else if (((unfilledInputs.length === 0 && (party === 'a' || party === 'b')) ||
                  (unfilledInputs.length === 1 && unfilledInputs[0].type === 'rate')) &&
                  party !== 'rate') {
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
