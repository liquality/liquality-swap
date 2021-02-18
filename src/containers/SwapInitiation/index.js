import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import { actions as walletActions } from '../../actions/wallets'
import { actions as agentActions } from '../../actions/agent'
import { actions as assetSelectorActions } from '../../actions/assetSelector'
import { actions as assetActions } from '../../actions/assets'

import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    agent: state.swap.agent,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB,
    wallets: state.swap.wallets,
    assets: state.swap.assets,
    assetSelector: state.swap.assetSelector,
    counterParty: state.swap.counterParty,
    transactions: state.swap.transactions,
    isVerified: state.swap.transactions.isVerified,
    loadingMessage: state.swap.loadingMessage
  }
}

export default connect(
  mapStateToProps,
  {
    createSwap: actions.createSwap,
    confirmSwap: actions.confirmSwap,
    setMarket: agentActions.setMarket,
    retrieveAgentQuote: agentActions.retrieveAgentQuote,
    clearQuote: agentActions.clearQuote,
    switchSides: actions.switchSides,
    toggleWalletConnect: walletActions.toggleWalletConnect,
    openAssetSelector: assetSelectorActions.openAssetSelector,
    closeAssetSelector: assetSelectorActions.closeAssetSelector,
    setAssetSelectorSearch: assetSelectorActions.setAssetSelectorSearch,
    setAsset: assetActions.setAsset,
    changeRate: assetActions.changeRate
  }
)(SwapInitiation)
