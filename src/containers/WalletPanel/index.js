import { connect } from 'react-redux'
import { actions } from '../../actions/wallets'
import WalletPanel from './WalletPanel'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {
    onToggleWalletConnect: actions.toggleWalletConnect,
    waitForWallet: actions.waitForWallet,
    onWalletConnected: actions.connectWallet,
    onWalletDisconnected: actions.disconnectWallet
  }
)(WalletPanel)
