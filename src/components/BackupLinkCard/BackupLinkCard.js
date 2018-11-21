import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import CompletedIcon from '../../icons/completed.svg'
import CopyIcon from '../../icons/copy.svg'
import './BackupLinkCard.css'

class BackupLinkCard extends Component {
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
    return <BrandCard className='BackupLinkCard' title='Backup'>
      <img class='BackupLinkCard_icon' src={CompletedIcon} />
      <p class='BackupLinkCard_description'>You need this link to claim your funds if your browser closes.</p>
      <p><Button wide secondary onClick={this.handleCopyClick} icon={CopyIcon}>Backup Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Next</Button></p>
    </BrandCard>
  }
}

export default BackupLinkCard
