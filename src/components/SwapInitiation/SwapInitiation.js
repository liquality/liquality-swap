import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import liqualityUi from 'liquality-ui'

import './SwapInitiation.css'

import wallets from '../../Wallets'

const { WalletConnect } = liqualityUi

class SwapInitiation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetA: {
        amount: 30,
        type: 'ethereum'
      },
      assetB: {
        amount: 2.2,
        type: 'bitcoin'
      },
      partyA: {
        amount: 30,
        balance: 100,
        walletType: null,
        currencyType: 'eth',
        anchorEl: null,
        addresses: [],
        walletConnectOpen: false,
        walletConnected: false,
        walletChosen: false,
        cal: null
      },
      partyB: {
        balance: 2,
        type: 'ledger'
      },
      counterPartyWalletA: '6d486d8a3e880c6b8a9478b3c78d68e731b87156',
      counterPartyWalletB: '1BFFoqyFUdAsCFQsgCHvzkPbbKBvUUMfj6',
      expiration: 12, // hours
      secret: 'this is a secret',
      secretHash: 'EDC64C6523778961FE9BA03AB7D624B27CA1DD5B01E7734CC6C891D50DB04269',
    }

    this.toggleWalletConnect = this.toggleWalletConnect.bind(this)
    this.chooseWallet = this.chooseWallet.bind(this)
    this.checkWalletConnected = this.checkWalletConnected.bind(this)
    this.disconnectWallet = this.disconnectWallet.bind(this)
  }

  toggleWalletConnect (e, party) {
    const { currentTarget } = e;
    this.setState(prevState => ({
      [party]: {
        ...prevState[party],
        walletConnectOpen: !prevState[party].walletConnectOpen,
        anchorEl: currentTarget
      }
    }))
  }

  async chooseWallet (party, currency, wallet) {
    const cal = await wallets[currency][wallet].initialize()
    this.setState(prevState => ({
      [party]: {
        ...prevState[party],
        walletType: wallet,
        cal: cal
      }
    }))
    setTimeout(() => { this.checkWalletConnected(party, currency, wallet) }, 3000) // TODO
    // let intervalId = setInterval(this.checkWalletConnected(party, currency, wallet), 1000)
    // this.setState(prevState => ({
    //   [party]: {
    //     ...prevState[party],
    //     walletType: wallet,
    //     timer: intervalId,
    //     cal: cal
    //   }
    // }))
  }

  async checkWalletConnected (party, currency, wallet) {
    if (this.state[party].cal) {
      debugger
      let addresses = await this.state[party].cal.getAddresses()
      debugger
      if (addresses.length > 0) {
        debugger
        this.setState(prevState => ({
          [party]: {
            ...prevState[party],
            walletConnected: true,
            addresses: addresses
          }
        }))
      }
    }
  }

  disconnectWallet (party) {
    this.setState(prevState => ({
      [party]: {
        ...prevState[party],
        walletType: null,
        walletConnected: false,
        walletChosen: false
      }
    }))
  }

  render (props) {
    const { partyA, partyB } = this.state

    return <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <Button onClick={(e) => this.toggleWalletConnect(e, 'partyA')}>test</Button>
        <Button onClick={() => console.log(this.state)}>test2</Button>
        <div className='placeholder'>Wallet 1</div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='placeholder'>Wallet 2</div>
      </Grid>
      <Grid container className='main'>
        <Grid container xs={12} sm={6} justify='space-evenly' id='swapMain'>
          <div className='placeholder walletContainer'>ETH</div>
        </Grid>
        <Grid container xs={12} sm={6} justify='space-evenly'>
          <div className='placeholder walletContainer'>BTC</div>
        </Grid>
        <Grid container xs={12} className='counterparty'>
          <Typography variant='title' gutterBottom>COUNTER PARTY WALLETS</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='title' gutterBottom>Receive From</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className='placeholder'>Address 1</div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='title' gutterBottom>Send To</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className='placeholder'>Address 2</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={12} justify='center'>
        <Button variant='contained' color='primary'>Initiate Swap</Button>
      </Grid>
      <WalletConnect
        open={partyA.walletConnectOpen}
        currency={partyA.currencyType}
        wallets={[{name: 'ledger', multiAddress: true}, {name: 'metamask', multiAddress: false}]}
        id='partyA'
        walletChosen={partyA.walletType}
        chooseWallet={this.chooseWallet}
        disconnectWallet={this.disconnectWallet}
        anchorEl={partyA.anchorEl}
        addresses={partyA.addresses}
        walletConnected={partyA.walletConnected}
      >
        <div>
          <p>Liquality</p>
        </div>
        <div>
          <div currency='btc' wallet='ledger'>
            <p>Plug in & enter pin</p>
          </div>
          <div currency='eth' wallet='metamask'>
            <p>Login to Metamask</p>
          </div>
          <div currency='eth' wallet='ledger'>
            <p>Plug in & enter pin</p>
            <p>choose ethereum app and enable contract data</p>
          </div>
        </div>
      </WalletConnect>
    </Grid>
  }
}

export default SwapInitiation

