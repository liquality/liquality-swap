import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import liqualityUI from 'liquality-ui'

import './WalletConnectPopup.css'

const { WalletChoose, WalletConnecting, WalletConnected } = liqualityUI

class WalletConnectPopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const props = this.props
    let walletConnectBody
    let addressView
    if (props.addresses) {
      if (props.addresses.length > 1) {
        addressView = props.addresses.map((address) => <p>{ address }</p> )
      } else if (props.addresses.length === 1) {
        addressView = props.addresses[0]
      }
    }

    if (props.walletConnected) {
      walletConnectBody = (
        <WalletConnected />
      )
    } else if (props.walletChosen) {
      walletConnectBody = (
        <WalletConnecting />
      )
    } else {
      walletConnectBody = (
        <WalletChoose />
      )
    }

    return (
      <div>
        <Popper id={props.id} open={props.open} anchorEl={props.anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                { walletConnectBody }
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    )
  }
}

export default WalletConnectPopup
