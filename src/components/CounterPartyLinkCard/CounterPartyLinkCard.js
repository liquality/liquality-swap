import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import withCopyButton from '../withCopyButton'
import TickIcon from '../../icons/tick.svg'
import CopyIcon from '../../icons/copy.svg'
import './CounterPartyLinkCard.css'

class CounterPartyLinkCard extends Component {
  render () {
    return <BrandCard className='CounterPartyLinkCard' title='Swap Initiated'>
      <img className='CounterPartyLinkCard_icon' src={TickIcon} alt='Completed' />
      <p className='CounterPartyLinkCard_description'>To continue, share this link with your counterparty</p>
      <p><Button wide secondary onClick={this.props.onCopyClick} icon={CopyIcon}>Counterparty Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Link Sent</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(CounterPartyLinkCard)
