import storage from '../utils/storage'

const types = {
  SET_SECRET: 'SET_SECRET',
  SET_SECRET_HASH: 'SET_SECRET_HASH'
}

function setSecret (secret) {
  return async (dispatch) => {
    dispatch({ type: types.SET_SECRET, secret })
    // TODO: this is somehow not working/ overriden
    storage.update({ secret })
  }
}

function setSecretHash (secretHash) {
  return { type: types.SET_SECRET_HASH, secretHash }
}

function loadSecret () {
  return async (dispatch) => {
    const data = storage.get()
    if (data && data.secret) {
      dispatch(setSecret(data.secret))
    }
  }
}

const actions = {
  setSecret,
  setSecretHash,
  loadSecret
}

export { types, actions }
