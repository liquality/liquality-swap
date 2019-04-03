import React, { Component } from 'react'
import PropTypes from 'prop-types'
import currencies from '../../utils/currencies'
import AssetsBG from './assets-bg.svg'
import './SwapPairPanel.css'

class SwapPairPanel extends Component {
  render () {
    return <div className='SwapPairPanel'>
      <div className='SwapPairPanel_assetContainer'>
        <img
          src={currencies[this.props.haveCurrency].icon}
          className='SwapPairPanel_asset SwapPairPanel_asset_left'
          alt={this.props.haveCurrency}
          onClick={this.props.onHaveClick} />
        <img
          src={currencies[this.props.wantCurrency].icon}
          className='SwapPairPanel_asset SwapPairPanel_asset_right'
          alt={this.props.wantCurrency}
          onClick={this.props.onWantClick} />
        <img src={AssetsBG} className='SwapPairPanel_assetsBG' alt='' />
        {this.props.icon && <img src={this.props.icon} className='SwapPairPanel_icon' onClick={(e) => this.props.onIconClick(e)} alt='' />}
      </div>
      <div className='SwapPairPanel_labels'>
        <h1 className='SwapPairPanel_labels_have'>{this.props.haveLabel}</h1>
        <h1 className='SwapPairPanel_labels_want'>{this.props.wantLabel}</h1>
      </div>
    </div>
  }
}

SwapPairPanel.propTypes = {
  haveCurrency: PropTypes.string.isRequired,
  haveLabel: PropTypes.string.isRequired,
  onHaveClick: PropTypes.func,
  wantCurrency: PropTypes.string.isRequired,
  wantLabel: PropTypes.string.isRequired,
  onWantClick: PropTypes.func,
  icon: PropTypes.any,
  onIconClick: PropTypes.func
}

SwapPairPanel.defaultProps = {
  haveLabel: 'Have',
  wantLabel: 'Want'
}

export default SwapPairPanel
