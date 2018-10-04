const types = {
  SET_SECRET: 'SET_SECRET',
  SET_SECRET_HASH: 'SET_SECRET_HASH'
}

function setSecret (secret) {
  return { type: types.SET_SECRET, secret }
}

function setSecretHash (secretHash) {
  return { type: types.SET_SECRET_HASH, secretHash }
}

const actions = {
  setSecret,
  setSecretHash
}

export { types, actions }
