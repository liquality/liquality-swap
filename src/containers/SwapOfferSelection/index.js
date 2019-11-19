import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as agentActions } from '../../actions/agent'
import { actions as assetSelectorActions } from '../../actions/assetSelector'
import { actions as assetActions } from '../../actions/assets'
import { actions as swapActions } from '../../actions/swap'
import SwapOfferSelection from './SwapOfferSelection'

const mapStateToProps = state => {
  return {
    markets: state.swap.agent.markets,
    market: state.swap.agent.market,
    assets: state.swap.assets,
    assetSelector: state.swap.assetSelector
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    setMarket: agentActions.setMarket,
    retrieveAgentQuote: agentActions.retrieveAgentQuote,
    switchSides: swapActions.switchSides,
    openAssetSelector: assetSelectorActions.openAssetSelector,
    closeAssetSelector: assetSelectorActions.closeAssetSelector,
    setAssetSelectorSearch: assetSelectorActions.setAssetSelectorSearch,
    changeRate: assetActions.changeRate,
    setAsset: assetActions.setAsset
  }
)(SwapOfferSelection))
