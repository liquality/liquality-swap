/* global web3 */

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import liqualityUI from 'liquality-ui'
import update from 'immutability-helper'

import { Client, providers } from 'chainabstractionlayer'

import WalletConnectPopup from '../WalletConnectPopup/WalletConnectPopup'

import './SwapInitiation.css'

const { CurrencyInput, AddressInput, WalletDisplay } = liqualityUI

class SwapInitiation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      assetA: {
        currency: 'eth',
        name: 'Ethereum',
        value: 50,
        wallet: {
          addresses: null,
          balance: 1000,
          connectOpen: false,
          connected: false,
          chosen: false,
          type: ''
        }
      },
      assetB: {
        currency: 'btc',
        name: 'Bitcoin',
        value: 10,
        wallet: {
          addresses: null,
          balance: 5,
          connectOpen: false,
          connected: false,
          chosen: false,
          type: ''
        }
      },
      counterParty: {
        eth: '',
        btc: ''
      },
      expiration: 12,
      secret: 'this is a secret',
      secretHash: 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'
    }

    this.initiateSwap = this.initiateSwap.bind(this)
    this.toggleWalletConnect = this.toggleWalletConnect.bind(this)
    this.chooseWallet = this.chooseWallet.bind(this)
    this.disconnectWallet = this.disconnectWallet.bind(this)
  }

  initiateClients () {
    this.ethClient = new Client()
    this.ethClient.addProvider(new providers.ethereum.EthereumRPCProvider('http://localhost:8545'))
    this.ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider))
    this.ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())

    this.btcClient = new Client()
    this.btcClient.addProvider(new providers.bitcoin.BitcoinRPCProvider('http://localhost:8545'))
    this.btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider())
    this.btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider())
  }

  getClient (code) {
    return this[`${code}Client`]
  }

  initiateSwap () {
    this.getClient('eth').generateSwap(
      this.state.counterParty.eth,
      this.state.eth.addresses[0],
      this.state.secretHash,
      this.state.expiration
    ).then(bytecode => {
      console.log(bytecode)

      // TODO: this should be based on which asset is asset A
      this.getClient('eth').sendTransaction(this.state.assetA.wallet.addresses[0], null, String(this.state.assetA.value), bytecode).then(console.log)
    })
  }

  componentDidMount () {
    this.initiateClients()
  }

  handleAmountChange (party, newValue) {
    this.setState(update(this.state, {
      ['asset' + party]: { value: { $set: newValue } }
    }))
  }

  switchSide () {
    this.setState(update(this.state, {
      assetA: { $set: this.state.assetB },
      assetB: { $set: this.state.assetA }
    }))
  }

  handleCounterPartyAddressChange (currency, newValue) {
    this.setState(update(this.state, {
      counterParty: { [currency]: { $set: newValue } }
    }))
  }

  toggleWalletConnect (e, party) {
    const { currentTarget } = e
    this.setState(update(this.state, {
      [party]: {
        wallet: { connectOpen: { $set: !this.state[party].wallet.connectOpen } },
        anchorEl: { $set: currentTarget }
      }
    }))
  }

  async chooseWallet (party, currency, wallet) {
    this.setState(update(this.state, {
      [party]: {
        wallet: {
          chosen: { $set: true },
          type: { $set: wallet }
        }
      }
    }))
    this.checkWalletConnected(party)
  }

  async checkWalletConnected (party) {
    const currency = this.state[party].currency
    this.getClient(currency).getAddresses().then((addresses) => {
      if (addresses.length > 0) {
        this.setState(update(this.state, {
          [party]: {
            wallet: {
              addresses: { $set: addresses },
              connected: { $set: true }
            }
          }
        }))
      } else {
        if (this.state[party].wallet.chosen) {
          setTimeout(this.checkWalletConnected(party), 1000)
        }
      }
    })
  }

  disconnectWallet (party) {
    this.setState(update(this.state, {
      [party]: {
        wallet: {
          connected: { $set: false },
          chosen: { $set: false },
          type: { $set: '' }
        }
      }
    }))
  }

  render (props) {
    const { assetA, assetB, counterParty } = this.state
    return <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <div className='placeholder' onClick={(e) => this.toggleWalletConnect(e, 'assetA')}>
          <WalletDisplay
            currency={assetA.currency}
            type={assetA.wallet.type}
            balance={assetA.wallet.balance}
            title={assetA.wallet.connected ? assetA.wallet.addresses[0] : 'Wallet Not Connected'} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='placeholder' onClick={(e) => this.toggleWalletConnect(e, 'assetB')}>
          <WalletDisplay
            currency={assetB.currency}
            type={assetB.wallet.type}
            balance={assetB.wallet.balance}
            title={assetB.wallet.connected ? assetB.wallet.addresses[0] : 'Wallet Not Connected'} />
        </div>
      </Grid>
      <Grid container className='main'>
        <Grid container xs={12} sm={5} justify='flex-end'>
          <div className='placeholder walletContainer'>
            <Typography variant='display1' gutterBottom>HAVE</Typography>
            <CurrencyInput currency={assetA.currency}
              value={assetA.value}
              onChange={newValue => this.handleAmountChange('A', newValue)} />
          </div>
        </Grid>
        <Grid container xs={12} sm={2} justify='space-around' alignItems='center'>
          <SwapIcon onClick={() => this.switchSide()} color='primary' style={{ fontSize: 50 }} />
        </Grid>
        <Grid container xs={12} sm={5} justify='flex-start'>
          <div className='placeholder walletContainer'>
            <Typography variant='display1' gutterBottom>WANT</Typography>
            <CurrencyInput currency={assetB.currency}
              value={assetB.value}
              onChange={newValue => this.handleAmountChange('B', newValue)} />
          </div>
        </Grid>
        <Grid container xs={12} className='counterparty'>
          <Typography variant='title' gutterBottom>COUNTER PARTY WALLETS</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='title' gutterBottom>Receive From</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className='placeholder'>
                <AddressInput
                  currency={assetB.currency}
                  value={counterParty[assetB.currency]}
                  onChange={newValue => this.handleCounterPartyAddressChange(assetB.currency, newValue)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='title' gutterBottom>Send To</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className='placeholder'>
                <AddressInput
                  currency={assetA.currency}
                  value={counterParty[assetA.currency]}
                  onChange={newValue => this.handleCounterPartyAddressChange(assetA.currency, newValue)}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={12} justify='center'>
        <Button variant='contained' color='primary' onClick={this.initiateSwap}>Initiate Swap</Button>
      </Grid>
      <WalletConnectPopup
        open={assetA.wallet.connectOpen}
        currency={assetA.currency}
        id='assetA'
        walletChosen={assetA.wallet.chosen}
        wallet={assetA.wallet.type}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.disconnectWallet}
        anchorEl={assetA.anchorEl}
        addresses={assetA.wallet.addresses}
        walletConnected={assetA.wallet.connected}
      />

      <WalletConnectPopup
        open={assetB.wallet.connectOpen}
        currency={assetB.currency}
        id='assetB'
        walletChosen={assetB.wallet.chosen}
        wallet={assetB.wallet.type}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.disconnectWallet}
        anchorEl={assetB.anchorEl}
        addresses={assetB.wallet.addresses}
        walletConnected={assetB.wallet.connected}
      />
    </Grid>
  }
}

export default SwapInitiation
