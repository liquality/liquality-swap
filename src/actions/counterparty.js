const types = {
  CHANGE_COUNTER_PARTY_ADDRESS: 'CHANGE_COUNTER_PARTY_ADDRESS'
}

function changeCounterPartyAddress (currency, newValue) {
  return { type: types.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue }
}

const actions = {
  changeCounterPartyAddress
}

export { types, actions }
