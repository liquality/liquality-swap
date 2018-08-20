/* global web3 */

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import liqualityUI from 'liquality-ui'

import { Client, providers } from 'chainabstractionlayer'

import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'

import './SwapInitiation.css'

const SWAP_EXPIRATION = 12
const SECRET = 'this is a secret'
const SECRET_HASH = 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'

const { CurrencyInput, AddressInput, WalletDisplay } = liqualityUI

class SwapInitiation extends Component {
  constructor (props) {
    super(props)

    this.initiateSwap = this.initiateSwap.bind(this)
    this.chooseWallet = this.chooseWallet.bind(this)
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
      this.props.counterParty.eth,
      this.props.wallets.a.addresses[0],
      SECRET_HASH,
      SWAP_EXPIRATION
    ).then(bytecode => {
      console.log(bytecode)

      // TODO: this should be based on which asset is asset A
      this.getClient('eth').sendTransaction(this.props.wallets.a.addresses[0], null, String(this.assets.a.value), bytecode).then(console.log)
    })
  }

  componentDidMount () {
    this.initiateClients()
  }

  async chooseWallet (party, currency, wallet) {
    this.props.onChooseWallet(party, wallet)
    this.checkWalletConnected(party)
  }

  async checkWalletConnected (party) {
    const currency = this.props.assets[party].currency
    this.getClient(currency).getAddresses().then((addresses) => {
      if (addresses.length > 0) {
        this.props.onWalletConnected(party, addresses)
      } else {
        if (this.props.assets[party].wallet.chosen) {
          setTimeout(this.checkWalletConnected(party), 1000)
        }
      }
    })
  }

  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const { a: walletA, b: walletB } = this.props.wallets
    const counterParty = this.props.counterParty
    return <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <div className='placeholder' onClick={(e) => this.props.onToggleWalletConnect('a', e.currentTarget)}>
          <WalletDisplay
            currency={assetA.currency}
            type={walletA.type}
            balance={walletA.balance}
            title={walletA.connected ? walletA.addresses[0] : 'Wallet Not Connected'} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='placeholder' onClick={(e) => this.props.onToggleWalletConnect('b', e.currentTarget)}>
          <WalletDisplay
            currency={assetB.currency}
            type={walletB.type}
            balance={walletB.balance}
            title={walletB.connected ? walletB.addresses[0] : 'Wallet Not Connected'} />
        </div>
      </Grid>
      <Grid container className='main'>
        <Grid container xs={12} sm={5} justify='flex-end'>
          <div className='placeholder walletContainer'>
            <Typography variant='display1' gutterBottom>HAVE</Typography>
            <CurrencyInput currency={assetA.currency}
              value={assetA.value}
              onChange={newValue => this.props.onAmountChange('a', newValue)} />
          </div>
        </Grid>
        <Grid container xs={12} sm={2} justify='space-around' alignItems='center'>
          <SwapIcon onClick={() => this.props.onSwitchSides()} color='primary' style={{ fontSize: 50 }} />
        </Grid>
        <Grid container xs={12} sm={5} justify='flex-start'>
          <div className='placeholder walletContainer'>
            <Typography variant='display1' gutterBottom>WANT</Typography>
            <CurrencyInput currency={assetB.currency}
              value={assetB.value}
              onChange={newValue => this.props.onAmountChange('b', newValue)} />
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
                  onChange={newValue => this.props.onCounterPartyAddressChange(assetB.currency, newValue)}
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
                  onChange={newValue => this.props.onCounterPartyAddressChange(assetA.currency, newValue)}
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
        open={walletA.connectOpen}
        currency={assetA.currency}
        id='a'
        walletChosen={walletA.chosen}
        wallet={walletA.type}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.props.onWalletDisconnected}
        anchorEl={walletA.anchorEl}
        addresses={walletA.addresses}
        walletConnected={walletA.connected}
      />

      <WalletConnectPopup
        open={walletB.connectOpen}
        currency={assetB.currency}
        id='b'
        walletChosen={walletB.chosen}
        wallet={walletB.type}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.props.onWalletDisconnected}
        anchorEl={walletB.anchorEl}
        addresses={walletB.addresses}
        walletConnected={walletB.connected}
      />
    </Grid>
  }
}

export default SwapInitiation
