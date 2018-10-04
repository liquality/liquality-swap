const types = {
  SET_SECRET_PARAMS: 'SET_SECRET_PARAMS'
}

function setSecretParams (secretParams) {
  return { type: types.SET_SECRET_PARAMS, secretParams }
}

const actions = {
  setSecretParams
}

export { types, actions }
