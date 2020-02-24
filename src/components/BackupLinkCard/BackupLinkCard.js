import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import withCopyButton from '../withCopyButton'
import CopyIcon from '../../icons/copy.svg'
import WarningIcon from '../../icons/warning.png'
import './BackupLinkCard.css'

class BackupLinkCard extends Component {
  render () {
    return <BrandCard className='BackupLinkCard' title='Copy Backup Link'>
      <h3><img src={WarningIcon} /><br />Copy This Link!</h3>
      <p className='BackupLinkCard_description'>If your browser closes you will need this link to claim your funds.<br />Save it where you can retrieve it should the browser close. Additionally, you can bookmark this page.</p>
      <p><Button wide secondary onClick={() => this.props.onCopyClick()} icon={CopyIcon}>Copy Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Continue</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(BackupLinkCard)
