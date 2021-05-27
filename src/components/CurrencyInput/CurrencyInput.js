import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import DropDownTick from '../../icons/dropdownTick.svg'
import * as assetUtils from '../../utils/assets'
import config from '../../config'

import { assets as cryptoassets } from '@liquality/cryptoassets'
import './CurrencyInput.css'

class CurrencyInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueString: props.value.toFixed(),
      dropdown: false
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
      Min:&nbsp;
      { this.props.disabled
        ? <span>{minString}</span>
        : <a href='javascript:void(0)' onClick={() => this.props.limits.onClick(this.props.limits.min)}>{minString}</a> }
      &nbsp;
      Max:&nbsp;
      { this.props.disabled
        ? <span>{minString}</span>
        : <a href='javascript:void(0)' onClick={() => this.props.limits.onClick(this.props.limits.max)}>{maxString}</a> }
    </span>
  }

  toggleDropdown () {
    this.setState(prevState => ({dropdown: !prevState.dropdown}))
  }

  getFiatValue () {
    const total = this.props.value.times(BigNumber(this.props.fiatRate)).toFixed(2)
    return total
  }

  render () {
    const asset = cryptoassets[this.props.currency]
    const userDefinedAssets = Object.keys(config.assets)
    const displayedAssets = Object.entries(cryptoassets)
      .filter(([id]) => userDefinedAssets.includes(id))

    return <div className='CurrencyInput'>
      { this.props.fiatRate && !this.props.value.isNaN() && <div className='CurrencyInput_price'>
        <div className='CurrencyInput_labelSwap'>SEND</div><div className='CurrencyInput_priceFiat'>${ this.getFiatValue() } USD</div>
      </div> }
      {this.props.isReceive && <div className='CurrencyInput_labelSwap'>RECEIVE</div>}
      <div className='CurrencyInput_dropdownWrap'>
        <div className='CurrencyInput_drop'>
          <div className='CurrencyInput_toggler' onClick={() => this.toggleDropdown()}>
            <img className='CurrencyInput_dropItem' src={assetUtils.getIcon(asset.code)} alt='asset icon' /> <h2 className='CurrencyInput_dropdownCode'>{asset.code}<img src={DropDownTick} alt='dropdowntick' className='pl-2' /></h2>
          </div>

          {this.state.dropdown && <div className='CurrencyInput_dropMenu'>
            {displayedAssets.map(([id, currency]) =>
              <div className='CurrencyInput_dropdownKey' key={id} onClick={() => this.props.onSelectAsset(id)}>
                <div className='CurrencyInput_listItem py-1' onClick={() => this.toggleDropdown()}><img src={assetUtils.getIcon(currency.code)} alt='currency icon/logo' className='CurrencyInput_dropdownIcon' /><strong><span className='CurrencyInput_dropdownCurrencyText pt-1'>{currency.code}</span></strong></div>
              </div>
            )}
          </div>}
        </div>
      </div>
      <div className={classNames('CurrencyInput_inputWrapper', { 'disabled': this.props.disabled })}>
        <input type='number' min='0' readOnly={this.props.disabled} value={this.restrictNumber(this.state.valueString)}
          className={classNames('CurrencyInput_input', { 'error': this.props.error })} placeholder='0.00'
          onChange={e => this.onChange(e)} onKeyDown={e => this.preventNegative(e)} tabIndex={this.props.tabIndex} />
        {this.props.showInputLine && <div className='CurrencyInput_inputBar' />}
      </div>
      { this.props.error && <div className={classNames('CurrencyInput_label', { 'CurrencyInput_errorMessage': this.props.error })}>
        { this.props.error }
      </div> }
      <div className='CurrencyInput_label'>
        { this.props.limits && this.getLimits() }
      </div>
    </div>
  }
}

CurrencyInput.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  assets: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(cryptoassets))),
  value: PropTypes.instanceOf(BigNumber),
  fiatRate: PropTypes.number,
  disabled: PropTypes.bool,
  showInputLine: PropTypes.bool,
  onChange: PropTypes.func,
  onSelectAsset: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  limits: PropTypes.shape({
    min: PropTypes.instanceOf(BigNumber),
    max: PropTypes.instanceOf(BigNumber),
    onClick: PropTypes.func
  })
}

CurrencyInput.defaultProps = {
  tabIndex: -1,
  assets: [Object.keys(cryptoassets)]
}

export default CurrencyInput
