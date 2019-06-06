import React, { Component } from 'react'
import { shortenAddress } from '../../utils/address'

import './HexaDisplay.css'

class HexaDisplay extends Component {
  onCopyLink () {
    const tempInput = document.createElement('input')
    tempInput.value = this.props.address
    tempInput.style = 'position: absolute; top: -2000px;'
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
  }

  render () {
    return <span onClick={() => this.onCopyLink.bind(this)()} className='HexaDisplay'>
      {shortenAddress(this.props.address)}
    </span>
  }
}

export default HexaDisplay
