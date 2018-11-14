import React, { Component } from 'react'
import currencies from '../../utils/currencies'
import AssetsBG from './assets-bg.svg'
import SwapIcon from './swap-icon.svg'
import './SwapPairPanel.css'

class SwapPairPanel extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    return <div className='SwapPairPanel'>
      <div className='SwapPairPanel_assetContainer'>
        <img src={currencies[assetA.currency].icon} className='SwapPairPanel_asset SwapPairPanel_asset_left' />
        <img src={currencies[assetB.currency].icon} className='SwapPairPanel_asset SwapPairPanel_asset_right' />
        <img src={AssetsBG} className='SwapPairPanel_assetsBG' />
        {this.props.isPartyB || <img src={SwapIcon} className='SwapPairPanel_swapIcon' onClick={() => this.props.onSwitchSides()} />}
      </div>
      <div className='SwapPairPanel_labels'>
        <h1 className='SwapPairPanel_labels_have'>HAVE</h1>
        <h1 className='SwapPairPanel_labels_want'>WANT</h1>
      </div>
    </div>
  }
}

export default SwapPairPanel
