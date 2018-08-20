import { connect } from 'react-redux'
import actions from '../../actions'
import WalletPanel from './WalletPanel'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleWalletConnect: (party, target) => dispatch({ type: actions.TOGGLE_WALLET_CONNECT, party, target }),
    onChooseWallet: (party, wallet) => dispatch({ type: actions.CHOOSE_WALLET, party, wallet }),
    onWalletConnected: (party, addresses) => dispatch({ type: actions.CONNECT_WALLET, party, addresses }),
    onWalletDisconnected: (party) => dispatch({ type: actions.DISCONNECT_WALLET, party })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletPanel)
