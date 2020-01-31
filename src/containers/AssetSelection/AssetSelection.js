import React, { Component } from 'react'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import AssetSelector from '../../components/AssetSelector/AssetSelector'
import Button from '../../components/Button/Button'
import SwapIcon from '../../icons/switch.svg'
import config from '../../config'

import './AssetSelection.css'

class AssetSelection extends Component {
  handleSelectAsset (asset) {
    this.props.setAsset(this.props.assetSelector.party, asset)
    this.props.closeAssetSelector()
  }

  handlePairPanelAssetClick (party) {
    if (this.props.assetSelector.open) {
      this.props.closeAssetSelector(party)
    } else {
      this.props.openAssetSelector(party)
    }
  }

  handleNextClick () {
    this.props.history.replace('/walletB')
  }

  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const selectedAsset = this.props.assetSelector.party === 'a' ? assetA.currency : assetB.currency
    const configuredAssets = Object.keys(config.assets)
    const assets = configuredAssets.filter(asset => asset !== selectedAsset)
    return <div className='AssetSelection'>
      <SwapPairPanel
        haveCurrency={assetA.currency}
        wantCurrency={assetB.currency}
        showCurrencyLabels
        focusSide={this.props.assetSelector.party && (this.props.assetSelector.party === 'a' ? 'have' : 'want')}
        onHaveClick={() => this.handlePairPanelAssetClick('a')}
        onWantClick={() => this.handlePairPanelAssetClick('b')}
        icon={!this.props.assetSelector.open && SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='AssetSelection_wrapper'>
        { this.props.assetSelector.open &&
          <AssetSelector
            search={this.props.assetSelector.search}
            assets={assets}
            onSelectAsset={asset => this.handleSelectAsset(asset)}
            onSearchChange={value => this.props.setAssetSelectorSearch(value)}
            onClose={() => this.props.closeAssetSelector()} /> }
        { !this.props.assetSelector.open && <div className='AssetSelection_bottom'>
          <Button wide primary onClick={() => this.handleNextClick()}>Next</Button>
        </div> }
      </div>
    </div>
  }
}

export default AssetSelection
