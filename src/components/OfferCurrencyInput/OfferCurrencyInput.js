import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { assets as cryptoassets } from '@liquality/cryptoassets'
import './OfferCurrencyInput.css'
import OfferAssetSelector from '../OfferAssetSelector/OfferAssetSelector'

const OfferCurrencyInput = (props) => {
  return <div className='OfferCurrencyInput'>
    <h3 className='OfferCurrencyInput_heading'>{cryptoassets[props.currency].code}</h3>
    <div className='OfferCurrencyInput_inputWrapper'>
      <input type='number' readOnly={props.disabled} value={props.value}
        className={classNames('OfferCurrencyInput_input', { 'error': props.error })} placeholder='0.00'
        onChange={e => props.onChange(e.target.value)} tabIndex={props.tabIndex} />
    </div>
    <OfferAssetSelector />
    <div className='OfferCurrencyInput_errorMessage'>{ props.error && props.error }</div>
  </div>
}

OfferCurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(cryptoassets)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string
}

OfferCurrencyInput.defaultProps = {
  tabIndex: -1
}

export default OfferCurrencyInput
