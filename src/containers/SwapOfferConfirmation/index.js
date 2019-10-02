import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import { actions as walletActions } from '../../actions/wallets'

import SwapOfferConfirmation from './SwapOfferConfirmation'

const mapStateToProps = state => {
  return {
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB,
    wallets: state.swap.wallets,
    assets: state.swap.assets,
    counterParty: state.swap.counterParty,
    transactions: state.swap.transactions,
    isVerified: state.swap.isVerified,
    loadingMessage: state.swap.loadingMessage
  }
}

export default connect(
  mapStateToProps,
  {
    initiateSwap: actions.initiateSwap,
    confirmSwap: actions.confirmSwap,
    switchSides: actions.switchSides,
    toggleWalletConnect: walletActions.toggleWalletConnect
  }
)(SwapOfferConfirmation)
