import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as assetSelectorActions } from '../../actions/assetSelector'
import { actions as assetActions } from '../../actions/assets'
import { actions as swapActions } from '../../actions/swap'
import AssetSelection from './AssetSelection'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    assetSelector: state.swap.assetSelector
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    switchSides: swapActions.switchSides,
    openAssetSelector: assetSelectorActions.openAssetSelector,
    closeAssetSelector: assetSelectorActions.closeAssetSelector,
    setAsset: assetActions.setAsset
  }
)(AssetSelection))
