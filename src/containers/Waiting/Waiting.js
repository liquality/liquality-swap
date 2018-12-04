import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails'
import LiqualityLogo from '../../logo.png'
import CompletedIcon from '../../icons/completed.svg'
import Cat from '../../icons/cat.svg'
import Chamaleon from '../../icons/chamaleon.svg'
import './Waiting.css'

class Waiting extends Component {
  render () {
    const assetA = this.props.assets.a.currency
    const step = this.props.state

    const showChameleon = (step === 'agreement' && assetA === 'eth') || (step === 'claiming' && assetA === 'btc')

    return <div>
      <div className='Waiting'>
        <h3>Waiting for {step === 'agreement' ? 'Counterparty' : 'Sign-off'}</h3>
        <img src={step === 'claiming' ? CompletedIcon : ''} className="Waiting_icon" />
        <h1>{step === 'agreement' ? 'The counterparty will sign the swap terms' : 'Everyone Agreed'}</h1>
        <h4>{step === 'agreement' ? 'Monitor the timer' : 'Next the initiator will claim their funds'}</h4>
        <img src={showChameleon ? Chamaleon : Cat} className={showChameleon ? 'Waiting_chamaleonIcon' : 'Waiting_catIcon'} />
      </div>
      <ExpirationDetails isClaim />
    </div>
  }
}

export default Waiting
