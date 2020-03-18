const types = {
  SET_ERROR: 'SET_ERROR'
}

let timeout

function clearError () {
  return { type: types.SET_ERROR, error: null }
}

function setError (error) {
  return async (dispatch) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      dispatch(clearError())
    }, 20000)
    dispatch({ type: types.SET_ERROR, error })
  }
}

const actions = {
  setError,
  clearError
}

export { types, actions }
