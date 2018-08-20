import { connect } from 'react-redux'
import { actionTypes as assetActions } from '../../reducers/assets'
import { actionTypes as counterPartyActions } from '../../reducers/counterparty'
import { actionTypes as swapActions } from '../../reducers/swap'
import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets,
    counterParty: state.swap.counterParty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchSides: () => dispatch({ type: swapActions.SWITCH_SIDES }),
    onAmountChange: (party, newValue) => dispatch({ type: assetActions.CHANGE_AMOUNT, party, newValue }),
    onCounterPartyAddressChange: (currency, newValue) => dispatch({ type: counterPartyActions.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwapInitiation)
