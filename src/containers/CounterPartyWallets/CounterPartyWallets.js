import React, { Component } from 'react'
import AddressInput from '../../components/AddressInput/AddressInput'
import { getCounterPartyErrors } from '../../utils/validation'

import './CounterPartyWallets.css'

class CounterPartyWallets extends Component {
  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const counterParty = this.props.counterParty
    const errors = this.props.showErrors ? getCounterPartyErrors(this.props.assets, this.props.counterParty) : {}

    return <div className='CounterPartyWallets'>
      <div className='row'>
        <div className='col CounterPartyWallet_send'>
          <h5 className='CounterPartyWallets_heading'>Send To</h5>
          <AddressInput currency={assetA.currency}
            value={counterParty.a.address}
            error={errors.counterPartyA}
            onChange={newValue => this.props.onCounterPartyAddressChange('a', newValue)}
            tabIndex={5}
          />
        </div>
        <div className='col CounterPartyWallet_receive'>
          <h5 className='CounterPartyWallets_heading'>Receive From</h5>
          <AddressInput currency={assetB.currency}
            value={counterParty.b.address}
            error={errors.counterPartyB}
            onChange={newValue => this.props.onCounterPartyAddressChange('b', newValue)}
            tabIndex={4}
          />
        </div>
      </div>
    </div>
  }
}

export default CounterPartyWallets
