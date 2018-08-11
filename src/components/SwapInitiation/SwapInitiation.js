/* global web3 */

import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import update from 'immutability-helper'
import _ from 'lodash'

import { Client, providers } from 'chainabstractionlayer'

import './SwapInitiation.css'

class SwapInitiation extends Component {
  constructor (props) {
    super(props)

    this.clients = {}

    this.config = {
      eth: {
        name: 'Ethereum',
        Providers: {
          DataProviders: {
            RPC: {
              EthereumRPCProvider: {
                args: [ 'http://localhost:8545' ] // or infura node
              }
            }
          },
          AccountProviders: {
            MetaMask: {
              EthereumMetaMaskProvider: {
                args: [ web3.currentProvider ]
              }
            },
            Ledger: {
              EthereumLedgerProvider: {
                args: []
              }
            }
          },
          SwapProviders: {
            LiqualityAtomicSwap: {
              EthereumSwapProvider: {
                args: []
              }
            }
          }
        }
      },
      btc: {
        name: 'Bitcoin',
        Providers: {
          DataProviders: {
            RPC: {
              BitcoinRPCProvider: {
                args: [ 'http://localhost:8080', 'bitcoin', 'local321' ] // or infura node
              }
            }
          },
          AccountProviders: {
            Ledger: {
              BitcoinLedgerProvider: {
                args: []
              }
            }
          },
          SwapProviders: {
            LiqualityAtomicSwap: {
              BitcoinSwapProvider: {
                args: []
              }
            }
          }
        }
      }
    }

    this.state = {
      assetA: {
        code: 'eth',
        addr: '...',
        DataProvider: 'RPC',
        DataProviderClass: 'EthereumRPCProvider',
        AccountProvider: 'MetaMask',
        AccountProviderClass: 'EthereumMetaMaskProvider',
        SwapProvider: 'LiqualityAtomicSwap',
        SwapProviderClass: 'EthereumSwapProvider'
      },
      assetB: {
        code: 'btc',
        addr: '...',
        DataProvider: 'RPC',
        DataProviderClass: 'BitcoinRPCProvider',
        AccountProvider: 'Ledger',
        AccountProviderClass: 'BitcoinLedgerProvider',
        SwapProvider: 'LiqualityAtomicSwap',
        SwapProviderClass: 'BitcoinSwapProvider'
      },
      counterPartyWalletA: '6d486d8a3e880c6b8a9478b3c78d68e731b87156',
      counterPartyWalletB: '994aBCE56EE8Dc94AE8438543c7BD1Dd2B802b06',
      expiration: 12, // hours
      secret: 'this is a secret',
      secretHash: 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269'
    }

    this.initiateSwap = this.initiateSwap.bind(this)
    this.switchAssets = this.switchAssets.bind(this)
    this.handleWalletChange = this.handleWalletChange.bind(this)
  }

  createProviderInstance (code, providerType, providerName, providerClassName) {
    providerType = `${providerType}s`

    const assetConfig = this.config[code]
    const assetName = assetConfig.name.toLowerCase()

    const { args } = assetConfig.Providers[providerType][providerName][providerClassName]
    return new providers[assetName][providerClassName](...args)
  }

  handleWalletChange ({ target: { name, value } }) {
    const { code } = this.state[name]
    const { AccountProviders } = this.config[code].Providers
    const className = Object.keys(AccountProviders[value])[0]

    const newState = update(this.state, {
      [name]: {
        AccountProvider: {
          $set: value
        },
        AccountProviderClass: {
          $set: className
        }
      }
    })

    this.setState(newState)
  }

  switchAssets () {
    const refA = this.state.assetA
    const refB = this.state.assetB

    const newState = update(this.state, {
      assetA: {
        $set: refB
      },
      assetB: {
        $set: refA
      }
    })

    this.setState(newState)
  }

  getClientByCode (code, recreate = false) {
    let assetKey

    _.forEach(this.state, (obj, asset) => {
      if (obj.code === code) {
        assetKey = asset
        return false
      }
    })

    return this.getClientByAssetKey(assetKey, recreate)
  }

  getClientByAssetKey (assetKey, recreate = false) {
    const assetState = this.state[assetKey]
    const {
      code,
      DataProvider,
      DataProviderClass,
      AccountProvider,
      AccountProviderClass,
      SwapProvider,
      SwapProviderClass
    } = assetState

    if (!recreate && this.clients[code]) return this.clients[code]

    const client = new Client()
    client.addProvider(this.createProviderInstance(code, 'DataProvider', DataProvider, DataProviderClass))
    client.addProvider(this.createProviderInstance(code, 'AccountProvider', AccountProvider, AccountProviderClass))
    client.addProvider(this.createProviderInstance(code, 'SwapProvider', SwapProvider, SwapProviderClass))

    this.clients[code] = client

    return client
  }

  initiateSwap () {
    this.clientA.generateSwap(
      this.state.counterPartyWalletB,
      this.state.assetA.wallet.addr,
      this.state.secretHash,
      this.state.expiration
    ).then(bytecode => console.log(bytecode))
  }

  updateAddresses () {
    _.forEach(this.state, (obj, asset) => {
      if (!obj.code) return

      this
        .getClientByAssetKey(asset)
        .getAddresses().then(([ addr ]) => {
          const newState = update(this.state, {
            [ asset ]: {
              addr: {
                $set: addr
              }
            }
          })

          this.setState(newState)
        }).catch(e => console.error(e))
    })
  }

  componentDidMount () {
    this.updateAddresses()
  }

  render (props) {
    const codeA = this.state.assetA.code
    const codeB = this.state.assetB.code

    const assetAWallets = Object
      .keys(this.config[codeA].Providers.AccountProviders)
      .map(name => {
        const className = Object.keys(this.config[codeA].Providers.AccountProviders[name])[0]
        return (<MenuItem key={className} value={name}>{name}</MenuItem>)
      })

    const assetBWallets = Object
      .keys(this.config[codeB].Providers.AccountProviders)
      .map(name => {
        const className = Object.keys(this.config[codeB].Providers.AccountProviders[name])[0]
        return (<MenuItem key={className} value={name}>{name}</MenuItem>)
      })

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>{this.state.assetA.AccountProvider}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>{this.state.assetB.AccountProvider}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>
            <Select
              value={this.state.assetA.AccountProvider}
              onChange={this.handleWalletChange}
              name='assetA'>
              {assetAWallets}
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='placeholder'>
            <Select
              value={this.state.assetB.AccountProvider}
              onChange={this.handleWalletChange}
              name='assetB'>
              {assetBWallets}
            </Select>
          </div>
        </Grid>
        <Grid container className='main'>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetA.code.toUpperCase()}</div>
          </Grid>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetB.code.toUpperCase()}</div>
          </Grid>
        </Grid>
        <Grid container xs={12} justify='center'>
          <Button variant='contained' color='primary' onClick={this.switchAssets}>Switch Assets</Button>
        </Grid>
        <Grid container className='main'>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetA.addr}</div>
          </Grid>
          <Grid container xs={12} sm={6} justify='space-evenly'>
            <div className='placeholder walletContainer'>{this.state.assetB.addr}</div>
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
