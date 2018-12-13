import { connect } from 'react-redux'
import Waiting from './Waiting'

const mapStateToProps = state => {
  return {
    step: state.swap.step,
    assets: state.swap.assets,
    transactions: state.swap.transactions,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {}
)(Waiting)
