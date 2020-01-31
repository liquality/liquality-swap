import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as agentActions } from '../../actions/agent'
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
    connectAgent: agentActions.connectAgent
  }
)(CounterPartySelection))
