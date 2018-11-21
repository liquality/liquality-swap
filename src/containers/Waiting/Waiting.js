import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails/ExpirationDetails'
import LiqualityLogo from '../../logo.png'
import './Waiting.css'

class Waiting extends Component {
  render () {
    return <BrandCard className='Waiting' title='Awaiting Counterparty'>
      <p>Thanks to the Atomic Swap you don't need to trust the counterparty and avoid the middlemen.</p>
      <p><img className='LiqualitySwap_logo' src={LiqualityLogo} /></p>
      <ExpirationDetails expiration={this.props.expiration} isPartyB={this.props.isPartyB} isClaim />
    </BrandCard>
  }
}

export default Waiting
