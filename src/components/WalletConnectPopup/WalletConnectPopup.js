import React, {Component} from 'react'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import liqualityUI from 'liquality-ui'

import './WalletConnectPopup.css'

import wallets from '../../Wallets'

const { WalletChoose, WalletConnecting, WalletConnected } = liqualityUI

class WalletConnectPopup extends Component {
  constructor (props) {
    super(props)

    this.chooseWallet = this.chooseWallet.bind(this)
    this.disconnectWallet = this.disconnectWallet.bind(this)
  }

  chooseWallet (wallet) {
    const { id, currency } = this.props
    this.props.chooseWallet(id, currency, wallet)
  }

  disconnectWallet () {
    const { id } = this.props
    this.props.disconnectWallet(id)
  }

  render () {
    const props = this.props
    let walletConnectBody

    if (props.walletConnected) {
      walletConnectBody = (
        <WalletConnected
          addresses={props.addresses}
          currency={props.currency}
          disconnectText='Disconnect'
          disconnectWallet={this.disconnectWallet}
          wallet={props.wallet}
        />

      )
    } else if (props.walletChosen) {
      walletConnectBody = (
        <WalletConnecting
          title={wallets[props.currency][props.wallet].connectTitle}
          subtitle={wallets[props.currency][props.wallet].connectSubtitle}
          cancelText='Cancel'
          cancelWallet={this.disconnectWallet}
          currency={props.currency}
          wallet={props.wallet} />
      )
    } else {
      walletConnectBody = (
        <WalletChoose
          title='Liquality'
          subTitle='By connecting you understand that you are on your own trust a cutting-edge technology without need to trust your trading partner'
          wallets={props.currency === 'eth' ? ['ledger', 'metamask'] : ['ledger']}
          chooseWallet={this.chooseWallet}
          currency={props.currency} />
      )
    }

    return (
      <div>
        <Popper id={props.id} open={props.open} anchorEl={props.anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{width: 350}}>
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
