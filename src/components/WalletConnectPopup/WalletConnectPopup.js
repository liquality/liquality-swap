import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import WalletChoose from '../WalletChoose/WalletChoose'
import WalletConnecting from '../WalletConnecting/WalletConnecting'
import WalletConnected from '../WalletConnected/WalletConnected'
import { getAssetWallets } from '../../utils/wallets'

import './WalletConnectPopup.css'

class WalletConnectPopup extends Component {
  constructor (props) {
    super(props)

    this.chooseWallet = this.chooseWallet.bind(this)
    this.connectWallet = this.connectWallet.bind(this)
    this.disconnectWallet = this.disconnectWallet.bind(this)
  }

  chooseWallet (wallet) {
    const { id, currency } = this.props
    this.props.chooseWallet(id, currency, wallet)
    this.connectWallet(wallet)
  }

  connectWallet (wallet) {
    const { id, currency } = this.props
    this.props.connectWallet(id, currency, wallet)
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
          disconnectText='Cancel'
          receive={props.id === 'b'}
          disconnectWallet={this.disconnectWallet}
          onOk={this.props.handleClose}
          wallet={props.wallet}
        />

      )
    } else if (props.walletConnecting) {
      walletConnectBody = (
        <WalletConnecting
          cancelText='Cancel'
          cancelWallet={this.disconnectWallet}
          onRetryClick={() => this.chooseWallet(props.wallet)}
          error={props.walletConnectingError}
          currency={props.currency}
          wallet={props.wallet} />
      )
    } else {
      walletConnectBody = (
        <WalletChoose
          title='Liquality'
          subTitle=''
          wallets={getAssetWallets(this.props.currency)}
          receive={props.id === 'b'}
          chooseWallet={this.chooseWallet}
          onCancel={this.props.handleClose}
          currency={props.currency} />
      )
    }

    return (
      <div>
        <Modal id={props.id} open={props.open} onClose={props.handleClose}>
          <div className='WalletConnectPopup'>
            <div className='WalletConnectPopup_body'>
              { walletConnectBody }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

WalletConnectPopup.propTypes = {
  open: PropTypes.bool
}

WalletConnectPopup.defaultProps = {
  open: false
}

export default WalletConnectPopup
