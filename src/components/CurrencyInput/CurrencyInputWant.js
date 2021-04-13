import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import DropDownTick from '../../icons/dropdownTick.svg'
import * as assetUtils from '../../utils/assets'
import config from '../../config'

import Dropdown from 'react-bootstrap/Dropdown'

import cryptoassets from '@liquality/cryptoassets'
import './CurrencyInputWant.css'

class CurrencyInputWant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueString: props.value.toFixed(),
      show: false
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
        ? <>{minString}</>
        : <a href='javascript:void(0)' onClick={() => this.props.limits.onClick(this.props.limits.min)}>{minString}</a> }
      &nbsp;
      Max:&nbsp;
      { this.props.disabled
        ? <>{minString}</>
        : <a href='javascript:void(0)' onClick={() => this.props.limits.onClick(this.props.limits.max)}>{maxString}</a> }
    </span>
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

    //DROPDOWN
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <h1
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        <img src={DropDownTick} alt="drop down tick" className="ml-2" />
      </h1>
    ));

    return <div className='CurrencyInputWant'>
      <div className='CurrencyInputWant_receive'>Receive</div>
      <div className="CurrencyInputWant_inputBigWrap">
      <div className="CurrencyInputWant_DropdownWrap">
      <Dropdown className="CurrencyInputWant_drop">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" className="CurrencyInputWant_toggler">
          <img src={assetUtils.getIcon(asset.code)} alt='asset icon' /> <h2>{asset.code}</h2>
        </Dropdown.Toggle>
      
        <Dropdown.Menu>
          {displayedAssets.map(([id, currency]) =>
          <div key={id} onClick={() => this.props.onSelectAsset(id)}> 
            <Dropdown.Item><img src={assetUtils.getIcon(currency.code)} alt="currency icon/logo" style={{height: "25px", width: "25px", marginRight: "5%"}} /><strong>{currency.code}</strong></Dropdown.Item>
          </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
      </div>
      </div>
      <div className={classNames('CurrencyInputWant_inputWrapper', { 'disabled': this.props.disabled })}>
        <input type='number' min='0' readOnly={this.props.disabled} value={this.restrictNumber(this.state.valueString)}
          className={classNames('CurrencyInputWant_input', { 'error': this.props.error })} placeholder='0.00'
          onChange={e => this.onChange(e)} onKeyDown={e => this.preventNegative(e)} tabIndex={this.props.tabIndex} />
      </div>
      { this.props.error && <div className={classNames('CurrencyInputWant_label', { 'CurrencyInputWant_errorMessage': this.props.error })}>
        { this.props.error }
      </div> }
      <div className='CurrencyInputWant_label'>
        { this.props.limits && this.getLimits() }
      </div>
    </div>
  }
}

CurrencyInputWant.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  currency: PropTypes.oneOf(Object.keys(cryptoassets)),
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
  }),
  wantCurrency: PropTypes.string.isRequired,
  onWantClick: PropTypes.func,
}

CurrencyInputWant.defaultProps = {
  tabIndex: -1
}

export default CurrencyInputWant
