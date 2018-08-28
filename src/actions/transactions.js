const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

function setTransaction (party, kind, tx) {
  return { type: types.SET_TRANSACTION, party, kind, tx }
}

const actions = {
  setTransaction
}

export { types, actions }
