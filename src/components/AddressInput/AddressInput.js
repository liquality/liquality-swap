import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { assets as cryptoassets, chains } from '@liquality/cryptoassets'
import * as assetUtils from '../../utils/assets'
import './AddressInput.css'
import TickIcon from './tick.svg'
import ErrorIcon from './error.svg'

const AddressInput = (props) => {
  const currency = cryptoassets[props.currency]
  const chain = chains[currency.chain]
  const valid = chain.isValidAddress(props.value)
  const formattedAddress = props.value && chain.isValidAddress(props.value) ? chain.formatAddress(props.value) : props.value
  return <div className={classNames('AddressInput', { error: props.error })}>
    <div className='AddressInput_wrapper'>
      <div className='AddressInput_box'>
        <img className='AddressInput_icon' src={assetUtils.getIcon(currency.code)} alt={currency.name} />
        <input className='AddressInput_input'
          tabIndex={props.tabIndex}
          value={formattedAddress}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
      { valid && <img className='AddressInput_status' src={TickIcon} alt='Valid' /> }
      { props.error && <img className='AddressInput_status' src={ErrorIcon} alt='Invalid' />}
    </div>
    <div className='AddressInput_errorMessage'>{props.error && props.error}</div>
  </div>
}

AddressInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(cryptoassets)).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string
}

AddressInput.defaultProps = {
  tabIndex: -1
}

export default AddressInput
