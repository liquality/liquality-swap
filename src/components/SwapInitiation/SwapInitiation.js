/* global web3 */

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle'
import liqualityUI from 'liquality-ui'
import update from 'immutability-helper'

import { Client, providers } from 'chainabstractionlayer'

import './SwapInitiation.css'

const { CurrencyInput, AddressInput } = liqualityUI

class SwapInitiation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      assetA: {
        currency: 'eth',
        name: 'ethereum',
        addr: '...',
        value: 50
      },
      assetB: {
        currency: 'btc',
        name: 'Bitcoin',
        addr: '...',
        value: 10
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
      this.state.eth.addr,
      this.state.secretHash,
      this.state.expiration
    ).then(bytecode => {
      console.log(bytecode)

      // TODO: this should be based on which asset is asset A
      this.getClient('eth').sendTransaction(this.state.assetA.addr, null, String(this.state.assetA.value), bytecode).then(console.log)
    })
  }

  // TODO: This should be done for each side based on the currency of that side
  updateAddresses () {
    this.getClient('eth').getAddresses().then(([addr]) => {
      console.log(addr)
      this.setState(update(this.state, {
        assetA: { addr: { $set: addr } }
      }))
    }).catch(e => {
      console.error('Error connecting to MetaMask', e)
    })

    this.getClient('btc').getAddresses().then(([addr]) => {
      this.setState(update(this.state, {
        assetB: { addr: { $set: addr } }
      }))
    }).catch(e => {
      console.error('Error connecting to Ledger', e)
    })
  }

  componentDidMount () {
    this.initiateClients()
    this.updateAddresses()
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

  render (props) {
    const { assetA, assetB, counterParty } = this.state
    return <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <div className='placeholder'>MetaMask</div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='placeholder'>Ledger</div>
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
    </Grid>
  }
}

export default SwapInitiation
