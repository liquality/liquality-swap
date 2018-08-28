const types = {
  SET_STEP: 'SET_STEP'
}

function setStep (step) {
  return { type: types.SET_STEP, step }
}

const actions = {
  setStep
}

export { types, actions }
