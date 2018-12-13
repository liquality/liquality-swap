const types = {
  CHANGE_COUNTER_PARTY_ADDRESS: 'CHANGE_COUNTER_PARTY_ADDRESS'
}

function changeCounterPartyAddress (currency, newValue, valid) {
  if (currency === 'eth') {
    newValue = newValue.replace('0x', '')
    newValue = newValue.toLowerCase()
  }
  return { type: types.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue, valid }
}

const actions = {
  changeCounterPartyAddress
}

export { types, actions }
