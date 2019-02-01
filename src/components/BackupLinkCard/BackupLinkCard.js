import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import withCopyButton from '../withCopyButton'
import CompletedIcon from '../../icons/completed.svg'
import CopyIcon from '../../icons/copy.svg'
import './BackupLinkCard.css'

class BackupLinkCard extends Component {
  render () {
    return <BrandCard className='BackupLinkCard' title='Backup'>
      <img className='BackupLinkCard_icon' src={CompletedIcon} alt='Completed' />
      <p className='BackupLinkCard_description'>You need this link to claim your funds if your browser closes.</p>
      <p>Please copy this link by clicking the button below. Save it in a safe place.</p>
      <p><Button wide secondary onClick={() => this.props.onCopyClick()} icon={CopyIcon}>Backup Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Next</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(BackupLinkCard)
