import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as assetSelectorActions } from '../../actions/assetSelector'
import { actions as assetActions } from '../../actions/assets'
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
    openAssetSelector: assetSelectorActions.openAssetSelector,
    closeAssetSelector: assetSelectorActions.closeAssetSelector,
    setAsset: assetActions.setAsset
  }
)(AssetSelection))
