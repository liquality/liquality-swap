import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    isPartyB: state.swap.isPartyB,
    wallets: state.swap.wallets
  }
}

export default connect(
  mapStateToProps,
  {
    initiateSwap: actions.initiateSwap,
    confirmSwap: actions.confirmSwap
  }
)(SwapInitiation)
