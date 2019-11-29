import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import cryptoassets from '@liquality/cryptoassets'
import './CurrencyInput.css'
import BigNumber from 'bignumber.js'

const CurrencyInput = (props) => {
  const asset = cryptoassets[props.currency]

  const preventNegative = (e) => {
    if (e.key === '-' || e.key === 'e') e.preventDefault()
  }

  const restrictNumber = (num) => {
    return BigNumber(BigNumber(num).toFixed(asset.decimals)).toString()
  }

  return <div className='CurrencyInput'>
    <h3 className='CurrencyInput_heading'>{asset.code}</h3>
    <div className={classNames('CurrencyInput_inputWrapper', { 'disabled': props.disabled })}>
      <input type='number' min='0' readOnly={props.disabled} value={restrictNumber(props.value)}
        className={classNames('CurrencyInput_input', { 'error': props.error })} placeholder='0.00'
        onChange={e => props.onChange(e.target.value)} onKeyDown={preventNegative} tabIndex={props.tabIndex} />
    </div>
    <div className={classNames('CurrencyInput_label', { 'CurrencyInput_errorMessage': props.error })}>
      { props.error && props.error }
      { props.helpText && !props.error && props.helpText }
    </div>
  </div>
}

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(cryptoassets)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  helpText: PropTypes.string
}

CurrencyInput.defaultProps = {
  tabIndex: -1
}

export default CurrencyInput
