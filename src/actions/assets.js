const types = {
  CHANGE_AMOUNT: 'CHANGE_AMOUNT'
}

function changeAmount (party, newValue) {
  return { type: types.CHANGE_AMOUNT, party, newValue }
}

const actions = {
  changeAmount
}

export { types, actions }
