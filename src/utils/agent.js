import BigNumber from 'bignumber.js'

function calculateLimits (markets, from, to) {
  const matchingMarkets = markets.filter(market => market.from === from && market.to === to)
  if (matchingMarkets.length === 0) {
    return null
  }
  return {
    min: BigNumber.min(...matchingMarkets.map(m => m.min)),
    max: BigNumber.max(...matchingMarkets.map(m => m.max))
  }
}

function bestRateComparator (a, b) {
  return b.rate.minus(a.rate).toNumber()
}

function pickMarket (markets, from, to, amount) {
  const matchingMarkets = markets.filter(market => market.from === from && market.to === to)
  const amountLimitedMarkets = matchingMarkets.filter(market => !amount.gt(market.max) && !amount.lt(market.min))
  if (amountLimitedMarkets.length) {
    return amountLimitedMarkets.sort(bestRateComparator)[0]
  } else {
    return matchingMarkets.sort(bestRateComparator)[0]
  }
}

export { calculateLimits, pickMarket }
