const types = {
  SET_TRANSACTION: 'SET_TRANSACTION'
}

function setTransaction (side, kind, tx) {
  return { type: types.SET_TRANSACTION, side, kind, tx }
}

const actions = {
  setTransaction
}

export { types, actions }
