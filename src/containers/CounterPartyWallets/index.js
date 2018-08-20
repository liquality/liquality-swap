import { connect } from 'react-redux'
import actions from '../../actions'
import CounterPartyWallets from './CounterPartyWallets'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    counterParty: state.swap.counterParty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCounterPartyAddressChange: (currency, newValue) => dispatch({ type: actions.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPartyWallets)
