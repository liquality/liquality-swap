const types = {
  CHANGE_COUNTER_PARTY_ADDRESS: 'CHANGE_COUNTER_PARTY_ADDRESS'
}

function changeCounterPartyAddress (party, newValue) {
  return { type: types.CHANGE_COUNTER_PARTY_ADDRESS, party, newValue }
}

const actions = {
  changeCounterPartyAddress
}

export { types, actions }
