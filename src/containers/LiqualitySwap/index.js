import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as swapActions } from '../../actions/swap'
import { actions as walletsActions } from '../../actions/wallets'
import { actions as errorActions } from '../../actions/errors'
import LiqualitySwap from './LiqualitySwap'

const mapStateToProps = state => ({
  swap: state.swap,
  error: state.error
})

export default withRouter(connect(
  mapStateToProps,
  {
    waitForSwapClaim: swapActions.waitForSwapClaim,
    waitForSwapRefund: swapActions.waitForSwapRefund,
    clearError: errorActions.clearError,
    waitForWallet: walletsActions.waitForWallet,
    waitForWalletInitialization: walletsActions.waitForWalletInitialization,
    onWalletDisconnected: walletsActions.disconnectWallet,
    onToggleWalletConnect: walletsActions.toggleWalletConnect
  }
)(LiqualitySwap))
