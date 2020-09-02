const types = {
  CHANGE_COUNTER_PARTY_ADDRESS: 'CHANGE_COUNTER_PARTY_ADDRESS',
  SET_COUNTER_PARTY_VISIBLE: 'SET_COUNTER_PARTY_VISIBLE'
}

function changeCounterPartyAddress (party, newValue) {
  return { type: types.CHANGE_COUNTER_PARTY_ADDRESS, party, newValue }
}

function setCounterPartyVisible (visible) {
  return { type: types.SET_COUNTER_PARTY_VISIBLE, visible }
}

const actions = {
  changeCounterPartyAddress,
  setCounterPartyVisible
}

export { types, actions }
