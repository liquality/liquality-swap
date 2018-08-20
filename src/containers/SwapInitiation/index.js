import { connect } from 'react-redux'
import { actionTypes as assetActions } from '../../reducers/assets'
import { actionTypes as walletActions } from '../../reducers/wallets'
import { actionTypes as counterPartyActions } from '../../reducers/counterparty'
import { actionTypes as swapActions } from '../../reducers/swap'
import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets,
    counterParty: state.swap.counterParty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchSides: () => dispatch({ type: swapActions.SWITCH_SIDES }),
    onAmountChange: (party, newValue) => dispatch({ type: assetActions.CHANGE_AMOUNT, party, newValue }),
    onCounterPartyAddressChange: (currency, newValue) => dispatch({ type: counterPartyActions.CHANGE_COUNTER_PARTY_ADDRESS, currency, newValue }),
    onToggleWalletConnect: (party, target) => dispatch({ type: walletActions.TOGGLE_WALLET_CONNECT, party, target }),
    onChooseWallet: (party, wallet) => dispatch({ type: walletActions.CHOOSE_WALLET, party, wallet }),
    onWalletConnected: (party, addresses) => dispatch({ type: walletActions.CONNECT_WALLET, party, addresses }),
    onWalletDisconnected: (party) => dispatch({ type: walletActions.DISCONNECT_WALLET, party })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwapInitiation)
