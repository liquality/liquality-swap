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

function pickMarket (markets, from, to, amount) {
  const matchingMarkets = markets.filter(market =>
    market.from === from &&
    market.to === to &&
    !amount.gt(market.max) &&
    !amount.lt(market.min))
  const bestRateMarket = matchingMarkets.sort((a, b) => b.rate.minus(a.rate).toNumber())[0]
  return bestRateMarket
}

export { calculateLimits, pickMarket }
