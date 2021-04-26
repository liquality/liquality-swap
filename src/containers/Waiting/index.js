import { connect } from 'react-redux'
import Waiting from './Waiting'

const mapStateToProps = (state) => {
  return {
    step: state.swap.step,
    quote: state.swap.agent.quote,
    assets: state.swap.assets,
    transactions: state.swap.transactions,
    secretParams: state.swap.secretParams,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {}
)(Waiting)
