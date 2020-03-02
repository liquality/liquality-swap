import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

import cryptoassets from '@liquality/cryptoassets'
import './CurrencyInput.css'

const CurrencyInput = (props) => {
  const asset = cryptoassets[props.currency]

  const preventNegative = (e) => {
    if (e.key === '-' || e.key === 'e') e.preventDefault()
  }

  const restrictNumber = (num) => {
    if (typeof num === 'string' && num.includes('.') && num.split('.')[1].length > asset.decimals) {
      return BigNumber(BigNumber(num).toFixed(asset.decimals, BigNumber.ROUND_DOWN)).toString()
    }

    return num
  }

  const onChange = (e) => {
    props.onChange(restrictNumber(e.target.value))
  }

  const getLimits = () => {
    const minString = BigNumber(props.limits.min).toFixed()
    const maxString = BigNumber(props.limits.max).toFixed()
    return <span>
      Min: <a href='javascript:void(0)' onClick={() => props.limits.onClick(props.limits.min)}>{minString}</a>&nbsp;
      Max: <a href='javascript:void(0)' onClick={() => props.limits.onClick(props.limits.max)}>{maxString}</a>
    </span>
  }

  return <div className='CurrencyInput'>
    <h3 className='CurrencyInput_heading'>{asset.code}</h3>
    <div className={classNames('CurrencyInput_inputWrapper', { 'disabled': props.disabled })}>
      <input type='number' min='0' readOnly={props.disabled} value={restrictNumber(props.value)}
        className={classNames('CurrencyInput_input', { 'error': props.error })} placeholder='0.00'
        onChange={onChange} onKeyDown={preventNegative} tabIndex={props.tabIndex} />
    </div>
    { props.error && <div className={classNames('CurrencyInput_label', { 'CurrencyInput_errorMessage': props.error })}>
      { props.error }
    </div> }
    <div className='CurrencyInput_label'>
      { props.limits && getLimits() }
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
  limits: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    onClick: PropTypes.func
  })
}

CurrencyInput.defaultProps = {
  tabIndex: -1
}

export default CurrencyInput
