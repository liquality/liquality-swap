/* global web3 */

import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
import _ from 'lodash'

import { Client, providers } from 'chainabstractionlayer'

import './SwapInitiation.css'

class SwapInitiation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      assetA: {
        type: 'ethereum',
        symbol: 'ETH',
        rpc: [ 'http://localhost:8545' ],
        wallet: {
          type: 'MetaMask',
          args: [ web3.currentProvider ],
          addr: '...'
        }
      },
      assetB: {
        type: 'bitcoin',
        symbol: 'BTC',
        rpc: [ 'http://localhost:8080', 'bitcoin', 'local321' ],
        wallet: {
          type: 'Ledger',
          args: [],
          addr: '...'
        }
      },
      counterPartyWalletA: '6d486d8a3e880c6b8a9478b3c78d68e731b87156',
      counterPartyWalletB: '1BFFoqyFUdAsCFQsgCHvzkPbbKBvUUMfj6',
      expiration: 12, // hours
      secret: 'this is a secret',
      secretHash: 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'
    }

    const assetA = this.state.assetA
    const assetAName = _.upperFirst(assetA.type)
    const AssetARpcProvider = providers[assetA.type][`${assetAName}RPCProvider`]
    const AssetAWalletProvider = providers[assetA.type][`${assetAName}${assetA.wallet.type}Provider`]

    const assetB = this.state.assetB
    const assetBName = _.upperFirst(assetB.type)
    const AssetBRpcProvider = providers[assetB.type][`${assetBName}RPCProvider`]
    const AssetBWalletProvider = providers[assetB.type][`${assetBName}${assetB.wallet.type}Provider`]

    this.clientA = new Client()
    this.clientA.addProvider(new AssetARpcProvider(...assetA.rpc))
    this.clientA.addProvider(new AssetAWalletProvider(...assetA.wallet.args))

    this.clientB = new Client()
    this.clientB.addProvider(new AssetBRpcProvider(...assetB.rpc))
    this.clientB.addProvider(new AssetBWalletProvider(...assetA.wallet.args))

    this.initiateSwap = this.initiateSwap.bind(this)
  }

  initiateSwap () {
    window.alert('Initiating the swap')
  }

  async componentDidMount () {
    this.clientA.getAddresses().then(([ addr ]) => {
      const { assetA } = this.state

      this.setState((prevState, props) => {
        assetA.wallet.addr = addr
        return assetA
      })
    }).catch(e => {
      console.error(e)
      window.alert(`Error connecting to ${this.assetA.wallet.type}`)
    })

    this.clientB.getAddresses().then(([ addr ]) => {
      const { assetB } = this.state

      this.setState((prevState, props) => {
        assetB.wallet.addr = addr
        return assetB
      })
    }).catch(e => {
      console.error(e)
      window.alert(`Error connecting to ${this.assetB.wallet.type}`)
    })
  }

  render (props) {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>{this.state.assetA.wallet.type}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>{this.state.assetB.wallet.type}</div>
        </Grid>
        <Grid container className='main'>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetA.symbol}</div>
          </Grid>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetB.symbol}</div>
          </Grid>
        </Grid>
        <Grid container className='main'>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetA.wallet.addr}</div>
          </Grid>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetB.wallet.addr}</div>
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
