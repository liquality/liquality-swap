import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { assets as cryptoassets } from '@liquality/cryptoassets'
import { getCurrencyInputErrors } from '../../utils/validation'
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput'
import BigNumber from 'bignumber.js'
import SwapIcon from '../../icons/switch.svg'
import Rate from '../../components/Rate/Rate'
import './CurrencyInputs.css'

class CurrencyInputs extends Component {
  handleSelectAssetA (asset, e) {
    if (asset === this.props.assets.b.currency) {
      this.props.onIconClick(e)
    } else {
      this.props.setAsset('a', asset)
    }
  }

  handleSelectAssetB (asset, e) {
    if (asset === this.props.assets.a.currency) {
      this.props.onIconClick(e)
    } else {
      this.props.setAsset('b', asset)
    }
  }

  getFiatValue () {
    const total = this.props.value.times(BigNumber(this.props.fiatRate)).toFixed(2)
    return total
  }

  render () {
    const { a: assetA, b: assetB, rate: assetRate } = this.props.assets

    const errors = this.props.showErrors ? getCurrencyInputErrors(this.props.assets, this.props.agent) : {}
    return <div className='CurrencyInputs'>
      <div className='CurrencyInputs_switch'>
        <img src={SwapIcon} alt='switch icon for swapping' onClick={e => this.props.onIconClick(e)} />
      </div>
      <div className='row justify-content-between no-gutters'>
        <div className='col CurrencyInputs_left'>
          { this.props.showInputs && <CurrencyInput
            currency={assetA.currency}
            onSelectAsset={asset => this.handleSelectAssetA(asset)}
            value={assetA.value}
            {...{showInputLine: true}}
            {...(this.props.showLeftFiatValue ? {fiatRate: this.props.fiatRates[assetA.currency]} : {})}
            disabled={this.props.leftInputDisabled}
            error={errors.assetA}
            limits={this.props.leftInputLimits && {
              min: this.props.leftInputLimits.min,
              max: this.props.leftInputLimits.max,
              onClick: value => this.props.onAmountChange('a', value)
            }}
            onChange={newValue => this.props.onAmountChange('a', newValue)}
            tabIndex={1} />
          }
        </div>
        <div className='col CurrencyInputs_right'>
          { this.props.showInputs && <CurrencyInput
            {...{isReceive: true}}
            currency={assetB.currency}
            onSelectAsset={asset => this.handleSelectAssetB(asset)}
            value={assetB.value}
            {...(this.props.showRightFiatValue ? {fiatRate: this.props.fiatRates[assetB.currency]} : {})}
            disabled={this.props.rightInputDisabled}
            error={errors.assetB}
            limits={this.props.rightInputLimits && {
              min: this.props.rightInputLimits.min,
              max: this.props.rightInputLimits.max,
              onClick: value => this.props.onAmountChange('b', value)
            }}
            onChange={newValue => this.props.onAmountChange('b', newValue)}
            tabIndex={3} />
          }
        </div>
        { this.props.showRate &&
          <div className='CurrencyInputs_centre'>
            <Rate
              title={this.props.rateTitle}
              currencyA={assetA.currency}
              currencyB={assetB.currency}
              value={assetRate}
              disabled={this.props.rateDisabled}
              error={errors.rate}
              strong={this.props.rateStrong}
              timer={this.props.rateTimer}
              onChange={newValueA => this.props.onRateChange(newValueA)}
              tabIndex={2}
            />
          </div>
        }
      </div>
    </div>
  }
}

CurrencyInputs.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(cryptoassets))),
  leftInputDisabled: PropTypes.bool,
  onSelectAsset: PropTypes.func,
  rightInputDisabled: PropTypes.bool,
  leftInputLimits: CurrencyInput.propTypes.limits,
  rightInputLimits: CurrencyInput.propTypes.limits,
  rateDisabled: PropTypes.bool,
  rateTitle: PropTypes.string,
  rateStrong: PropTypes.bool,
  rateTimer: Rate.propTypes.timer,
  showRate: PropTypes.bool,
  showInputs: PropTypes.bool,
  showLeftFiatValue: PropTypes.bool,
  showRightFiatValue: PropTypes.bool,
  haveCurrency: PropTypes.string,
  haveLabel: PropTypes.string,
  onHaveClick: PropTypes.func,
  wantCurrency: PropTypes.string,
  wantLabel: PropTypes.string,
  onWantClick: PropTypes.func,
  icon: PropTypes.any,
  iconDisabled: PropTypes.bool,
  onIconClick: PropTypes.func,
  showCurrencyLabels: PropTypes.bool
}

export default CurrencyInputs
