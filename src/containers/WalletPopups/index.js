import { connect } from 'react-redux'
import { actions } from '../../actions/wallets'
import WalletPopups from './WalletPopups'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets
  }
}

export default connect(
  mapStateToProps,
  {
    onToggleWalletConnect: actions.toggleWalletConnect,
    waitForWallet: actions.waitForWallet,
    waitForWalletInitialization: actions.waitForWalletInitialization,
    onWalletConnected: actions.connectWallet,
    onWalletDisconnected: actions.disconnectWallet
  }
)(WalletPopups)
