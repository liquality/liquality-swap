import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput'
import './CurrencyInputs.css'

class CurrencyInputs extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    return <div class='CurrencyInputs'>
      <div class='row justify-content-between no-gutters'>
        <div class='col CurrencyInputs_left'>
          <CurrencyInput
            currency={assetA.currency}
            value={assetA.value}
            disabled={this.props.disabled}
            onChange={newValue => this.props.onAmountChange('a', newValue)} />
        </div>
        <div class='col CurrencyInputs_right'>
          <CurrencyInput
            currency={assetB.currency}
            value={assetB.value}
            disabled={this.props.disabled}
            onChange={newValue => this.props.onAmountChange('b', newValue)} />
        </div>
      </div>
    </div>
  }
}

CurrencyInputs.propTypes = {
  disabled: PropTypes.bool
}

export default CurrencyInputs
