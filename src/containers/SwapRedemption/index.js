import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import SwapRedemption from './SwapRedemption'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

export default connect(
  mapStateToProps,
  {
    redeemSwap: actions.redeemSwap
  }
)(SwapRedemption)
