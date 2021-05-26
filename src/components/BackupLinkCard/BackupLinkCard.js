import React, { Component } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import Button from '../Button/Button'
import { assets as cryptoassets } from '@liquality/cryptoassets'
import withCopyButton from '../withCopyButton'
import CopyIcon from '../../icons/copy.svg'
import CheckIcon from '../../icons/checkCopy.svg'
import WarningIcon from '../../icons/warningRed.svg'
import './BackupLinkCard.css'

class BackupLinkCard extends Component {
  constructor (props) {
    super(props)
    this.state = { copied: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onCopyClick()
    this.setState({
      copied: true
    })
    setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 2000)
  }

  render () {
    return <BrandCard className='BackupLinkCard' title='Swap Initiation'>
      <div className='BackupLinkCard_whiteBar'>
        <p>Swap {this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code} for {this.props.assets.b.value.toFixed()} {cryptoassets[this.props.assets.b.currency].code}</p>
      </div>
      <h3><img className='pt-2 mr-2' src={WarningIcon} alt='warning' />Save Swap Link!</h3>
      <p className='BackupLinkCard_description mb-5 mt-3'>If your browser closes you will need this link to claim your funds.<br />Save it where you can retrieve it should the browser close. Additionally, you can bookmark this page.</p>
      <p><Button wide secondary onClick={(e) => this.handleClick(e)} icon={this.state.copied ? CheckIcon : CopyIcon}>{this.state.copied === false ? 'Copy Link' : 'Copied!'}</Button></p>
      <p><Button wide primary className='mb-3' onClick={this.props.onNextClick}>Continue</Button></p>
    </BrandCard>
  }
}

export default withCopyButton(BackupLinkCard)
