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
      <img class='BackupLinkCard_icon' src={CompletedIcon} />
      <p class='BackupLinkCard_description'>You need this link to claim your funds if your browser closes.</p>
      <p><Button wide secondary onClick={() => this.props.onCopyClick()} icon={CopyIcon}>Backup Link</Button></p>
      <p><Button wide primary onClick={this.props.onNextClick}>Next</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(BackupLinkCard)
