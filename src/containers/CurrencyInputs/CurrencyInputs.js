import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput'
import Rate from '../../components/Rate/Rate'
import './CurrencyInputs.css'

class CurrencyInputs extends Component {
  render () {
    const { a: assetA, b: assetB, rate: assetRate } = this.props.assets
    return <div className='CurrencyInputs'>
      <div className='row justify-content-between no-gutters'>
        <div className='col CurrencyInputs_left'>
          <CurrencyInput
            currency={assetA.currency}
            value={assetA.value}
            disabled={this.props.disabled}
            onChange={newValue => this.props.onAmountChange('a', newValue)}
            tabindex={1} />
        </div>
        <div class='col CurrencyInputs_right'>
          <CurrencyInput
            currency={assetB.currency}
            value={assetB.value}
            disabled={this.props.disabled}
            onChange={newValue => this.props.onAmountChange('b', newValue)}
            tabindex={3} />
        </div>
        {!this.props.disabled &&
          <div className='CurrencyInputs_centre'>
            <Rate
              currencyA={assetA.currency}
              currencyB={assetB.currency}
              value={assetRate.value}
              disabled={this.props.disabled}
              onChange={newValueA => this.props.onAmountChange('rate', newValueA)}
              tabindex={2}
            />
          </div>
        }
      </div>
    </div>
  }
}

CurrencyInputs.propTypes = {
  disabled: PropTypes.bool
}

export default CurrencyInputs
