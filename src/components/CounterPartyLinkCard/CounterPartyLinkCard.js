import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import withCopyButton from '../withCopyButton'
import CompletedIcon from '../../icons/completed.svg'
import CopyIcon from '../../icons/copy.svg'
import './CounterPartyLinkCard.css'

class CounterPartyLinkCard extends Component {
  constructor (props) {
    super(props)
    this.textArea = React.createRef()
  }

  render () {
    return <BrandCard className='CounterPartyLinkCard' title='Swap Initiated'>
      <img class='CounterPartyLinkCard_icon' src={CompletedIcon} />
      <p class='CounterPartyLinkCard_description'>To continue, share this link with your counterparty</p>
      <p><Button wide secondary onClick={this.props.onCopyClick} icon={CopyIcon}>Counterparty Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Link Sent</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(CounterPartyLinkCard)
