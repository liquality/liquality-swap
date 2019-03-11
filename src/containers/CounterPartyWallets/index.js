import { connect } from 'react-redux'
import { actions } from '../../actions/counterparty'
import CounterPartyWallets from './CounterPartyWallets'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    counterParty: state.swap.counterParty,
    showErrors: state.swap.showErrors
  }
}

export default connect(
  mapStateToProps,
  {
    onCounterPartyAddressChange: actions.changeCounterPartyAddress
  }
)(CounterPartyWallets)
