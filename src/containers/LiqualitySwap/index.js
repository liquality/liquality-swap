import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as swapActions } from '../../actions/swap'
import { actions as walletsActions } from '../../actions/wallets'
import { actions as errorActions } from '../../actions/errors'
import { actions as agentActions } from '../../actions/agent'
import LiqualitySwap from './LiqualitySwap'

const mapStateToProps = (state, ownProps) => ({
  swap: state.swap,
  error: state.error,
  duration: state.swap.duration,
  expiration: state.swap.expiration,
  assets: state.swap.assets,
  transactions: state.swap.transactions,
  step: state.swap.step,
  ...ownProps
})

export default withRouter(connect(
  mapStateToProps,
  {
    waitForSwapClaim: swapActions.waitForSwapClaim,
    waitForSwapRefund: swapActions.waitForSwapRefund,
    setStep: swapActions.setStep,
    clearError: errorActions.clearError,
    resetSwap: swapActions.reset,
    waitForWallet: walletsActions.waitForWallet,
    waitForWalletInitialization: walletsActions.waitForWalletInitialization,
    onWalletDisconnected: walletsActions.disconnectWallet,
    onToggleWalletConnect: walletsActions.toggleWalletConnect,
    connectAgents: agentActions.connectAgents
  }
)(LiqualitySwap))
