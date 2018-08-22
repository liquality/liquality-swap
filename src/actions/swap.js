const types = {
  SWITCH_SIDES: 'SWITCH_SIDES'
}

function switchSides () {
  return { type: types.SWITCH_SIDES }
}

const actions = {
  switchSides
}

export { types, actions }
