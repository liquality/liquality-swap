import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import SwapRefund from './SwapRefund'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {
    refundSwap: actions.refundSwap
  }
)(SwapRefund)
