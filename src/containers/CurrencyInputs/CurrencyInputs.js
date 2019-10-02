import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCurrencyInputErrors } from '../../utils/validation'
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput'
import Rate from '../../components/Rate/Rate'
import './CurrencyInputs.css'

class CurrencyInputs extends Component {
  render () {
    const { a: assetA, b: assetB, rate: assetRate } = this.props.assets
    const errors = this.props.showErrors ? getCurrencyInputErrors(this.props.assets) : {}
    return <div className='CurrencyInputs'>
      <div className='row justify-content-between no-gutters'>
        <div className='col CurrencyInputs_left'>
          { this.props.showInputs && <CurrencyInput
            currency={assetA.currency}
            value={assetA.value}
            disabled={this.props.inputsDisabled}
            error={errors.assetA}
            onChange={newValue => this.props.onAmountChange('a', newValue)}
            tabIndex={1} />
          }
        </div>
        <div className='col CurrencyInputs_right'>
          { this.props.showInputs && <CurrencyInput
            currency={assetB.currency}
            value={assetB.value}
            disabled={this.props.inputsDisabled}
            error={errors.assetB}
            onChange={newValue => this.props.onAmountChange('b', newValue)}
            tabIndex={3} />
          }
        </div>
        { this.props.showRate &&
          <div className='CurrencyInputs_centre'>
            <Rate
              currencyA={assetA.currency}
              currencyB={assetB.currency}
              value={assetRate}
              disabled={this.props.rateDisabled}
              error={errors.rate}
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
  inputsDisabled: PropTypes.bool,
  rateDisabled: PropTypes.bool,
  showRate: PropTypes.bool,
  showInputs: PropTypes.bool
}

export default CurrencyInputs
