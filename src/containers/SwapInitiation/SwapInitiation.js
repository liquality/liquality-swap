import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import ExpirationDetails from '../../components/ExpirationDetails'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'
import HandshakeIcon from '../../icons/handshake.png'
import SwapIcon from '../../icons/switch.svg'
import CounterPartyWallets from '../CounterPartyWallets'
import CurrencyInputs from '../CurrencyInputs'
import InitiatorExpirationInfo from '../InitiatorExpirationInfo'
import WalletPanel from '../WalletPanel'
import './SwapInitiation.css'
import { getInitiationErrors } from '../../utils/validation'
import { APP_BASE_URL } from '../../utils/app-links'

class SwapInitiation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      remaining: QUOTE_REFRESH_INTERVAL
    }
    this.updateQuoteTimer = _.debounce(this.updateQuoteTimer.bind(this), 800)
  }

  clearCountdown () {
    if (!this.state.interval) return
    clearInterval(this.state.interval)
    this.setState({
      remaining: QUOTE_REFRESH_INTERVAL,
      interval: undefined
    })
  }

  startCountdown () {
    const interval = setInterval(() => {
      if (!isAgentRequestValid({assets: this.props.assets, agent: this.props.agent})) {
        this.clearCountdown()
        return
      }
      const remaining = this.state.remaining - 1
      const isReset = remaining === 0
      if (isReset) this.props.retrieveAgentQuote()
      this.setState({
        remaining: isReset ? QUOTE_REFRESH_INTERVAL : remaining
      })
    }, 1000)
    this.setState({
      remaining: QUOTE_REFRESH_INTERVAL,
      interval
    })
  }

  updateQuoteTimer () {
    this.props.retrieveAgentQuote()
    this.clearCountdown()
    this.startCountdown()
  }

  resetQuote () {
    if (this.props.agent.quote) this.props.clearQuote()
    if (this.props.agent.market) this.props.changeRate(this.props.agent.market.rate)
  }

  componentDidUpdate (prevProps) {
    if (!this.props.agent.markets.length) return

    if (!this.props.assets.a.value.eq(prevProps.assets.a.value) ||
      this.props.assets.a.currency !== prevProps.assets.a.currency ||
      this.props.assets.b.currency !== prevProps.assets.b.currency) {
      if (!isAgentRequestValid({assets: this.props.assets, agent: this.props.agent})) {
        this.resetQuote()
        this.clearCountdown()
        return
      }

      this.updateQuoteTimer()
    }

    if (this.props.agent.quoteLocked !== prevProps.agent.quoteLocked) {
      if (this.props.agent.quoteLocked) this.clearCountdown()
      else this.updateQuoteTimer()
    }
  }

  componentWillUnmount () {
    this.clearCountdown()
  }

  handleAgentSelectAsset (asset) {
    this.props.setAsset(this.props.assetSelector.party, asset)
    const assetA = this.props.assetSelector.party === 'a' ? asset : this.props.assets.a.currency
    const assetB = this.props.assetSelector.party === 'b' ? asset : this.props.assets.b.currency
    let market = this.props.agent.markets.find(market => market.from === assetA && market.to === assetB)
    if (!market) {
      market = this.props.agent.markets.find(market => market.from === assetA)
    }
    this.props.setMarket(market.from, market.to)
  }

  handleSelectAsset (asset) {
    if (this.props.agent.markets.length) this.handleAgentSelectAsset(asset)
    else this.props.setAsset(this.props.assetSelector.party, asset)

    this.props.closeAssetSelector()
  }

  getAgentSelectorAssets () {
    const { a: assetA, b: assetB } = this.props.assets
    let assets = []
    if (this.props.assetSelector.party === 'a') {
      assets = this.props.agent.markets.map(market => market.from)
    } else if (this.props.assetSelector.party === 'b') {
      assets = this.props.agent.markets
        .filter(market => market.from === assetA.currency)
        .map(market => market.to)
    }
    const currentSelectedAsset = this.props.assetSelector.party === 'a' ? assetA.currency : assetB.currency
    assets = assets.filter(asset => asset !== currentSelectedAsset)
    return assets
  }

  getConfigSelectorAssets () {
    const { a: assetA, b: assetB } = this.props.assets
    const selectedAsset = this.props.assetSelector.party === 'a' ? assetA.currency : assetB.currency
    const configuredAssets = Object.keys(config.assets)
    return configuredAssets.filter(asset => asset !== selectedAsset)
  }

  getSelectorAssets () {
    return this.props.agent.markets.length ? this.getAgentSelectorAssets() : this.getConfigSelectorAssets()
  }

  handlePairPanelAssetClick (party) {
    this.props.assetSelector.open ? this.props.closeAssetSelector(party) : this.props.openAssetSelector(party)
  }

  render () {
    const { a: assetA, b: assetB } = this.props.assets
    const errors = getInitiationErrors(this.props.transactions, this.props.expiration, this.props.isVerified, this.props.isPartyB, this.props.agent.quote)
    const showRate = assetA.value.gt(0) && this.props.assets.rate && this.props.assets.rate.gt(0)
    const counterPartyLocked = !!(this.props.agent.markets.length || this.props.isPartyB)
    const termsImmutable = this.props.isPartyB
    const limits = calculateLimits(this.props.agent.markets, assetA.currency, assetB.currency)
    const selectorAssets = this.getSelectorAssets()
    const switchSidesAvailable = this.props.agent.markets.find(market => market.from === assetB.currency && market.to === assetA.currency)
    const showCountdown = this.state.interval

    return <div className='SwapInitiation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        icon={inputsDisabled ? undefined : SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='SwapInitiation_top'>
        {this.props.quote && <div className='SwapInitiation_quoteTimer'><TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} /></div>}
        <CurrencyInputs showInputs leftInputDisabled={inputsDisabled} rightInputDisabled={inputsDisabled} rateDisabled={this.props.assets.rateLocked} showRate showLeftFiatValue showRightFiatValue={!this.props.quote} />
      </div>
      <WalletPanel />
      <div className='SwapInitiation_bottom'>
        { this.props.isPartyB
          ? <span className='SwapInitiation_handshake'><img src={HandshakeIcon} alt='Agree' /></span>
          : this.props.counterParty.visible && <h5 className='SwapInitiation_counterPartyLabel'>Counter party wallets</h5> }
        { this.props.counterParty.visible && <CounterPartyWallets /> }
        { this.props.isPartyB
          ? <ExpirationDetails />
          : <InitiatorExpirationInfo /> }
        {!errors.initiation && !this.props.isPartyB && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.initiateSwap}>Initiate Swap</Button>}
        {!errors.initiation && this.props.isPartyB && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.confirmSwap}>Confirm Terms</Button>}
        {errors.initiation && <Button primary disabled>{ errors.initiation }</Button>}<br />
        {/* TODO: Do actual resetting of app state instead of refresh. */}
        <Button wide link onClick={() => window.location.replace(APP_BASE_URL)}>{ this.props.isPartyB ? 'Abandon Swap' : 'Cancel' }</Button>
      </div>
    </div>
  }
}

export default SwapInitiation
