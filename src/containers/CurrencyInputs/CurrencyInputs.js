import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCurrencyInputErrors } from '../../utils/validation'
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput'
import Rate from '../../components/Rate/Rate'
import './CurrencyInputs.css'

class CurrencyInputs extends Component {
  render () {
    const { a: assetA, b: assetB, rate: assetRate } = this.props.assets
    const errors = this.props.showErrors ? getCurrencyInputErrors(this.props.assets, this.props.agent) : {}
    return <div className='CurrencyInputs'>
      <div className='row justify-content-between no-gutters'>
        <div className='col CurrencyInputs_left'>
          { this.props.showInputs && <CurrencyInput
            currency={assetA.currency}
            value={assetA.value}
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
            currency={assetB.currency}
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
  leftInputDisabled: PropTypes.bool,
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
  showRightFiatValue: PropTypes.bool
}

export default CurrencyInputs
