/* global web3 */

import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import _ from 'lodash'

import { Client, providers } from 'chainabstractionlayer'

import './SwapInitiation.css'

class SwapInitiation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      eth: {
        name: 'ethereum',
        addr: '...',
        value: 1e18
      },
      btc: {
        name: 'Bitcoin',
        addr: '...'
      },
      counterParty: {
        eth: '994aBCE56EE8Dc94AE8438543c7BD1Dd2B802b06',
        btc: '14QHd4qpUTmMHx5BchEREySsqxtnUHcX6a'
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

      this.getClient('eth').sendTransaction(this.state.eth.addr, null, String(this.state.eth.value), bytecode).then(console.log)
    })
  }

  updateAddresses () {
    this.getClient('eth').getAddresses().then(([ addr ]) => {
      console.log(addr)
      this.setState({
        eth: {
          ...this.state.eth,
          addr
        }
      })
    }).catch(e => {
      console.error(e)
      window.alert(`Error connecting to MetaMask`)
    })

    this.getClient('btc').getAddresses().then(([ addr ]) => {
      this.setState({
        btc: {
          ...this.state.btc,
          addr
        }
      })
    }).catch(e => {
      console.error(e)
      window.alert(`Error connecting to Ledger`)
    })
  }

  componentDidMount () {
    this.initiateClients()
    this.updateAddresses()
  }

  render (props) {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>MetaMask</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>Ledger</div>
        </Grid>
        <Grid container className='main'>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>ETH</div>
          </Grid>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>BTC</div>
          </Grid>
        </Grid>
        <Grid container className='main'>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.eth.addr}</div>
          </Grid>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.btc.addr}</div>
          </Grid>
        </Grid>
        <Grid container xs={12} justify='center'>
          <Button variant='contained' color='primary' onClick={this.initiateSwap}>Initiate Swap</Button>
        </Grid>
      </Grid>
    )
  }
}

export default SwapInitiation
