import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import SwapRedemption from './SwapRedemption'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    transactions: state.swap.transactions,
    wallets: state.swap.wallets,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB,
    loadingMessage: state.swap.loadingMessage
  }
}

export default connect(
  mapStateToProps,
  {
    redeemSwap: actions.redeemSwap
  }
)(SwapRedemption)
