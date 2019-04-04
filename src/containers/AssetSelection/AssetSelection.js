import React, { Component } from 'react'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import AssetSelector from '../../components/AssetSelector/AssetSelector'
import Button from '../../components/Button/Button'
import SwapIcon from '../../icons/switch.svg'

import './AssetSelection.css'

class AssetSelection extends Component {
  handleSelectAsset (asset) {
    this.props.setAsset(this.props.assetSelector.party, asset)
    this.props.closeAssetSelector()
  }

  render () {
    const { a: assetA, b: assetB } = this.props.assets
    return <div className='AssetSelection'>
      <SwapPairPanel
        haveCurrency={assetA.currency}
        wantCurrency={assetB.currency}
        onHaveClick={() => this.props.openAssetSelector('a')}
        onWantClick={() => this.props.openAssetSelector('b')}
        icon={SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='AssetSelection_wrapper'>
        { this.props.assetSelector.open &&
          <AssetSelector
            excludeAsset={this.props.assetSelector.party === 'a' ? assetA.currency : assetB.currency}
            onSelectAsset={asset => this.handleSelectAsset(asset)} /> }
        <div className='AssetSelection_bottom'>
          <Button wide primary onClick={() => this.props.history.replace('/initiation')}>Next</Button>
        </div>
      </div>
    </div>
  }
}

export default AssetSelection
