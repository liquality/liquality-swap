import { actions as assetActions } from './assets'

const types = {
  CHANGE_COUNTER_PARTY_ADDRESS: 'CHANGE_COUNTER_PARTY_ADDRESS',
  SET_AGENT: 'SET_AGENT',
  SET_COUNTER_PARTY_VISIBLE: 'SET_COUNTER_PARTY_VISIBLE'
}

function changeCounterPartyAddress (party, newValue) {
  return { type: types.CHANGE_COUNTER_PARTY_ADDRESS, party, newValue }
}

function setAgent (agent) {
  return { type: types.SET_AGENT, agent }
}

function setCounterPartyVisible (visible) {
  return { type: types.SET_COUNTER_PARTY_VISIBLE, visible }
}

function retrieveAgentQuote () {
  return async (dispatch, getState) => {
    dispatch(assetActions.changeRate(0.111))
    dispatch(assetActions.lockRate())
    dispatch(assetActions.changeAmount('a', 0.25))
    dispatch(changeCounterPartyAddress('a', '0x000'))
    dispatch(changeCounterPartyAddress('b', 'bc1344242432423424'))
    dispatch(setCounterPartyVisible(false))
  }
}

const actions = {
  changeCounterPartyAddress,
  setAgent,
  setCounterPartyVisible,
  retrieveAgentQuote
}

export { types, actions }
