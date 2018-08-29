const types = {
  CHANGE_COUNTER_PARTY_ADDRESS: 'CHANGE_COUNTER_PARTY_ADDRESS'
}

function changeCounterPartyAddress (currency, newValue, valid) {
  return { type: types.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue, valid }
}

const actions = {
  changeCounterPartyAddress
}

export { types, actions }
