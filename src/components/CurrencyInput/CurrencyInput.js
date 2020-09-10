import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

import cryptoassets from '@liquality/cryptoassets'
import './CurrencyInput.css'

class CurrencyInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueString: props.value.toFixed()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.value.eq(this.props.value) && !this.props.value.isNaN()) {
      const keepValueString = BigNumber(this.state.valueString).eq(this.props.value)
      if (!keepValueString) {
        const valueString = this.props.value.isNaN() ? '' : this.props.value.toFixed()
        this.setState({valueString})
      }
    }
  }

  preventNegative (e) {
    if (e.key === '-' || e.key === 'e') e.preventDefault()
  }

  restrictNumber (num) {
    const asset = cryptoassets[this.props.currency]
    if (typeof num === 'string' && num.includes('.') && num.split('.')[1].length > asset.decimals) {
      return BigNumber(BigNumber(num).toFixed(asset.decimals, BigNumber.ROUND_DOWN)).toFixed()
    }

    return num
  }

  onChange (e) {
    const result = this.restrictNumber(e.target.value)
    this.setState({
      valueString: result
    }, () => {
      this.props.onChange(BigNumber(result))
    })
  }

  getLimits () {
    const minString = this.props.limits.min.toFixed()
    const maxString = this.props.limits.max.toFixed()
    return <span>
      Min: <a href='javascript:void(0)' onClick={() => this.props.limits.onClick(this.props.limits.min)}>{minString}</a>&nbsp;
      Max: <a href='javascript:void(0)' onClick={() => this.props.limits.onClick(this.props.limits.max)}>{maxString}</a>
    </span>
  }

  getFiatValue () {
    const total = this.props.value.times(BigNumber(this.props.fiatRate)).toFixed(2)
    return total
  }

  render () {
    const asset = cryptoassets[this.props.currency]
    return <div className='CurrencyInput'>
      <h3 className='CurrencyInput_heading'>{asset.code}</h3>
      <div className={classNames('CurrencyInput_inputWrapper', { 'disabled': this.props.disabled })}>
        <input type='number' min='0' readOnly={this.props.disabled} value={this.restrictNumber(this.state.valueString)}
          className={classNames('CurrencyInput_input', { 'error': this.props.error })} placeholder='0.00'
          onChange={e => this.onChange(e)} onKeyDown={e => this.preventNegative(e)} tabIndex={this.props.tabIndex} />
      </div>
      { this.props.error && <div className={classNames('CurrencyInput_label', { 'CurrencyInput_errorMessage': this.props.error })}>
        { this.props.error }
      </div> }
      <div className='CurrencyInput_label'>
        { this.props.limits && this.getLimits() }
      </div>
      { this.props.fiatRate && !this.props.value.isNaN() && <div className='CurrencyInput_price'>
        ${ this.getFiatValue() } USD
      </div> }
    </div>
  }
}

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(cryptoassets)).isRequired,
  value: PropTypes.instanceOf(BigNumber),
  fiatRate: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  limits: PropTypes.shape({
    min: PropTypes.instanceOf(BigNumber),
    max: PropTypes.instanceOf(BigNumber),
    onClick: PropTypes.func
  })
}

CurrencyInput.defaultProps = {
  tabIndex: -1
}

export default CurrencyInput
