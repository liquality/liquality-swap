import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import cryptoassets from '@liquality/cryptoassets'
import * as assetUtils from '../../utils/assets'
import AssetsBG from './assets-bg.svg'
import './SwapPairPanel.css'

class SwapPairPanel extends Component {
  render () {
    const haveCurrency = cryptoassets[this.props.haveCurrency]
    const wantCurrency = cryptoassets[this.props.wantCurrency]
    const showHave = (!this.props.focusSide || this.props.focusSide === 'have')
    const showWant = (!this.props.focusSide || this.props.focusSide === 'want')
    return <div className='SwapPairPanel'>
      <div className='SwapPairPanel_assetContainer'>
        <div className='SwapPairPanel_assetContainer_main'>
          {showHave && <img
            src={assetUtils.getIcon(haveCurrency.code)}
            className={classNames(
              'SwapPairPanel_asset',
              'SwapPairPanel_asset_left',
              {'SwapPairPanel_asset_interactive': this.props.onHaveClick}
            )}
            alt={haveCurrency.code}
            onClick={this.props.onHaveClick} />}
          {showWant && <img
            src={assetUtils.getIcon(wantCurrency.code)}
            className={classNames(
              'SwapPairPanel_asset',
              'SwapPairPanel_asset_right',
              {'SwapPairPanel_asset_interactive': this.props.onHaveClick}
            )}
            alt={wantCurrency.code}
            onClick={this.props.onWantClick} />}
          <img src={AssetsBG} className='SwapPairPanel_assetsBG' alt='' />
          {this.props.icon && <img
            src={this.props.icon} alt=''
            className={classNames('SwapPairPanel_icon', { 'disabled': this.props.iconDisabled })}
            onClick={e => !this.props.iconDisabled && this.props.onIconClick(e)} />}
        </div>
        <div className='SwapPairPanel_filler' />
      </div>
      <div className='SwapPairPanel_labels'>
        <h1 className={classNames(
          'SwapPairPanel_labels_have',
          {'SwapPairPanel_labels_have_faded': !showHave}
        )}>{this.props.haveLabel}</h1>
        <h1 className={classNames(
          'SwapPairPanel_labels_want',
          {'SwapPairPanel_labels_want_faded': !showWant}
        )}>{this.props.wantLabel}</h1>
      </div>
      { this.props.showCurrencyLabels && <div className='SwapPairPanel_currency_labels'>
        {showHave &&
          <h4
            className={classNames('SwapPairPanel_currency_labels_have', {'SwapPairPanel_currency_labels_interactive': this.props.onHaveClick})}
            onClick={this.props.onHaveClick} >
            {haveCurrency.name} ({haveCurrency.code})
          </h4>}
        {showWant &&
          <h4
            className={classNames('SwapPairPanel_currency_labels_want', {'SwapPairPanel_currency_labels_interactive': this.props.onWantClick})}
            onClick={this.props.onWantClick}>
            {wantCurrency.name} ({wantCurrency.code})
          </h4>}
      </div> }
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
  iconDisabled: PropTypes.bool,
  onIconClick: PropTypes.func,
  showCurrencyLabels: PropTypes.bool,
  focusSide: PropTypes.oneOf(['have', 'want'])
}

SwapPairPanel.defaultProps = {
  haveLabel: 'Have',
  wantLabel: 'Want'
}

export default SwapPairPanel
