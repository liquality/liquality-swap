import { connect } from 'react-redux'
import actions from '../../actions'
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
    onSwitchSides: () => dispatch({ type: actions.SWITCH_SIDES }),
    onAmountChange: (party, newValue) => dispatch({ type: actions.CHANGE_AMOUNT, party, newValue }),
    onCounterPartyAddressChange: (currency, newValue) => dispatch({ type: actions.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwapInitiation)
