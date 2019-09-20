import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as counterPartyActions } from '../../actions/counterparty'
import CounterPartySelection from './CounterPartySelection'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    assetSelector: state.swap.assetSelector
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    setAgent: counterPartyActions.setAgent
  }
)(CounterPartySelection))
