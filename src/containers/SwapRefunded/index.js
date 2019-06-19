import { connect } from 'react-redux'
import SwapRefunded from './SwapRefunded'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB,
    refundTransaction: state.swap.transactions.a.refund
  }
}

export default connect(
  mapStateToProps
)(SwapRefunded)
