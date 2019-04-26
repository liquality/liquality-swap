import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import cryptoassets from '@liquality/cryptoassets'
import './CurrencyInput.css'

const CurrencyInput = (props) => {
  return <div className='CurrencyInput'>
    <h3 className='CurrencyInput_heading'>{cryptoassets[props.currency].code}</h3>
    <div className='CurrencyInput_inputWrapper'>
      <input type='number' readOnly={props.disabled} value={props.value}
        className={classNames('CurrencyInput_input', { 'error': props.error })} placeholder='0.00'
        onChange={e => props.onChange(e.target.value)} tabIndex={props.tabIndex} />
    </div>
    <div className='CurrencyInput_errorMessage'>{ props.error && props.error }</div>
  </div>
}

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(cryptoassets)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string
}

CurrencyInput.defaultProps = {
  tabIndex: -1
}

export default CurrencyInput
