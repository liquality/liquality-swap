import React, {Component} from 'react'
import Popper from '@material-ui/core/Popper'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import WalletChoose from '../WalletChoose/WalletChoose'
import WalletConnecting from '../WalletConnecting/WalletConnecting'
import WalletConnected from '../WalletConnected/WalletConnected'
import wallets from '../../Wallets'

import './WalletConnectPopup.css'

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
          wallets={props.currency === 'eth' ? ['metamask'] : ['ledger']}
          chooseWallet={this.chooseWallet}
          currency={props.currency} />
      )
    }

    return (
      <div>
        <Modal id={props.id} open={props.open} onClose={props.handleClose}>
          <div className="WalletConnectModal">
            <div className="WalletConnectModal_body">
              { walletConnectBody }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default WalletConnectPopup
