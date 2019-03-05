import React, { Component } from 'react'
import AddressInput from '../../components/AddressInput/AddressInput'

import './CounterPartyWallets.css'

class CounterPartyWallets extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const counterParty = this.props.counterParty

    return <div className='CounterPartyWallets'>
      <div className='row'>
        <div className='col'>
          <h5 className='CounterPartyWallets_heading'>Send To</h5>
          <AddressInput currency={assetA.currency}
            value={counterParty[assetA.currency].address}
            onChange={(newValue, valid) => this.props.onCounterPartyAddressChange(assetA.currency, newValue, valid)}
            tabIndex={5}
          />
        </div>
        <div className='col'>
          <h5 className='CounterPartyWallets_heading'>Receive From</h5>
          <AddressInput currency={assetB.currency}
            value={counterParty[assetB.currency].address}
            onChange={(newValue, valid) => this.props.onCounterPartyAddressChange(assetB.currency, newValue, valid)}
            tabIndex={4}
          />
        </div>
      </div>
    </div>
  }
}

export default CounterPartyWallets
