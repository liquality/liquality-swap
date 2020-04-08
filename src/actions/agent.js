import { replace } from 'connected-react-router'
import { actions as swapActions } from './swap'
import { actions as assetActions } from './assets'
import { actions as counterPartyActions } from './counterparty'
import cryptoassets from '@liquality/cryptoassets'
import config from '../config'
import agent from '../services/agentClient'
import { isAgentRequestValid } from '../utils/validation'
import { sleep } from '../utils/async'

const types = {
  SET_QUOTE: 'SET_QUOTE',
  SET_MARKETS: 'SET_MARKETS',
  SET_MARKET: 'SET_MARKET'
}

function setMarket (market) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_MARKET, market: market })
    dispatch(assetActions.setAsset('a', market.from))
    dispatch(assetActions.setAsset('b', market.to))
    dispatch(assetActions.changeRate(market.rate))
  }
}

async function getMarkets () {
  const marketInfo = await agent.getMarketInfo()
  const formattedMarkets = marketInfo.map(m => {
    const convertedMin = cryptoassets[m.from.toLowerCase()].unitToCurrency(m.min)
    const convertedMax = cryptoassets[m.from.toLowerCase()].unitToCurrency(m.max)
    return {
      ...m,
      min: convertedMin,
      max: convertedMax,
      from: m.from.toLowerCase(),
      to: m.to.toLowerCase()
    }
  })
  return formattedMarkets
}

async function setMarkets (dispatch, getState) {
  const markets = await getMarkets()
  const configuredAssets = Object.keys(config.assets)
  const validMarkets = markets.filter(market => configuredAssets.includes(market.to) && configuredAssets.includes(market.from))
  dispatch({ type: types.SET_MARKETS, markets: validMarkets })
  const state = getState()
  const selectedMarket = state.swap.agent.market
  let marketToSet
  if (selectedMarket) {
    marketToSet = state.swap.agent.markets.find(market => selectedMarket.from === market.from && selectedMarket.to === market.to)
  } else {
    marketToSet = state.swap.agent.markets[0] // Default market
  }
  dispatch(setMarket(marketToSet))
}

function connectAgent () {
  return async (dispatch, getState) => {
    while (!(getState().swap.agent.quote)) {
      await setMarkets(dispatch, getState)
      await sleep(3000)
    }
  }
}

function setQuote (quote) {
  return { type: types.SET_QUOTE, quote }
}

function retrieveAgentQuote () {
  return async (dispatch, getState) => {
    dispatch(swapActions.showErrors())
    if (isAgentRequestValid(getState().swap)) {
      const { assets: { a: assetA, b: assetB } } = getState().swap
      const amount = cryptoassets[assetA.currency].currencyToUnit(assetA.value)
      const quote = await agent.getQuote(assetA.currency, assetB.currency, amount)
      dispatch(setQuote(quote))

      dispatch(assetActions.changeAmount('a', cryptoassets[assetA.currency].unitToCurrency(quote.fromAmount)))
      dispatch(assetActions.changeAmount('b', cryptoassets[assetB.currency].unitToCurrency(quote.toAmount)))
      dispatch(assetActions.changeAmount('b', cryptoassets[assetB.currency].unitToCurrency(quote.toAmount)))

      dispatch(assetActions.lockRate())
      dispatch(counterPartyActions.changeCounterPartyAddress('a', quote.fromCounterPartyAddress))
      dispatch(counterPartyActions.changeCounterPartyAddress('b', quote.toCounterPartyAddress))
      dispatch(counterPartyActions.setCounterPartyVisible(false))
      dispatch(replace('/offerConfirmation'))
      dispatch(swapActions.hideErrors())
    }
  }
}

const actions = {
  connectAgent,
  setMarket,
  setQuote,
  retrieveAgentQuote
}

export { types, actions }
