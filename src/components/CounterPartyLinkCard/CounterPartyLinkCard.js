import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import CompletedIcon from '../../icons/completed.svg'
import CopyIcon from '../../icons/copy.svg'
import './CounterPartyLinkCard.css'

class CounterPartyLinkCard extends Component {
  constructor (props) {
    super(props)
    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.textArea = React.createRef()
  }

  handleCopyClick () {
    const tempInput = document.createElement('input')
    tempInput.value = this.props.link
    tempInput.style = 'position: absolute; top: -2000px;'
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
  }

  render () {
    return <BrandCard className='CounterPartyLinkCard' title='Swap Initiated'>
      <img class='CounterPartyLinkCard_icon' src={CompletedIcon} />
      <p class='CounterPartyLinkCard_description'>To continue, share this link with your counterparty</p>
      <p><Button secondary onClick={this.handleCopyClick} icon={CopyIcon}>Counterparty Link</Button></p>
      <p><Button primary onClick={this.props.onNextClick}>Link Sent</Button></p>
    </BrandCard>
  }
}

export default CounterPartyLinkCard
