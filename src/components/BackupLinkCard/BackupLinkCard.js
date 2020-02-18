import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import withCopyButton from '../withCopyButton'
import CopyIcon from '../../icons/copy.svg'
import './BackupLinkCard.css'

class BackupLinkCard extends Component {
  render () {
    return <BrandCard className='BackupLinkCard' title='Copy Backup Link'>
      <h3>Important!<br />Copy This Link!</h3>
      <p className='BackupLinkCard_description'>Before continuing, please use the button below to copy this swap’s link and paste it in a place where you can retrieve it if this page closes before you receive your assets.</p>
      <p><Button wide secondary onClick={() => this.props.onCopyClick()} icon={CopyIcon}>Backup Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Continue</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(BackupLinkCard)
