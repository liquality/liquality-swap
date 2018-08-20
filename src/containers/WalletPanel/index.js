import { connect } from 'react-redux'
import { actionTypes as walletActions } from '../../reducers/wallets'
import WalletPanel from './WalletPanel'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleWalletConnect: (party, target) => dispatch({ type: walletActions.TOGGLE_WALLET_CONNECT, party, target }),
    onChooseWallet: (party, wallet) => dispatch({ type: walletActions.CHOOSE_WALLET, party, wallet }),
    onWalletConnected: (party, addresses) => dispatch({ type: walletActions.CONNECT_WALLET, party, addresses }),
    onWalletDisconnected: (party) => dispatch({ type: walletActions.DISCONNECT_WALLET, party })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletPanel)
