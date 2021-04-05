import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import withCopyButton from '../withCopyButton'
import CopyIcon from '../../icons/copy.svg'
import WarningIcon from '../../icons/warningRed.svg'
import './BackupLinkCard.css'

class BackupLinkCard extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      copied: false
    }
  }
  render () {
    return <BrandCard className='BackupLinkCard' title='Copy Backup Link'>
      <h3><img className="pt-2 mr-2" src={WarningIcon} alt='warning' />Save Swap Link!</h3>
      <p className='BackupLinkCard_description mb-5 mt-3'>If your browser closes you will need this link to claim your funds.<br />Save it where you can retrieve it should the browser close. Additionally, you can bookmark this page.</p>
      {this.state.copied === true ? <p><Button wide secondary icon={CopyIcon}>Copied!</Button></p> : <p><Button wide secondary onClick={() => this.props.onCopyClick(), this.setState({copied: true})} icon={CopyIcon}>Copy Link</Button></p>}
      <p><Button wide primary onClick={this.props.onNextClick}>Continue</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(BackupLinkCard)
