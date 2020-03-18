import moment from 'moment'

const expirationDurations = {
  a: moment.duration(6, 'm'),
  b: moment.duration(3, 'm')
}

function getQuoteExpiration (quote) {
  return { a: quote.swapExpiration, b: quote.nodeSwapExpiration }
}

function generateExpiration () {
  const a = moment().add(expirationDurations.a)
  const b = moment(a).subtract(expirationDurations.b)
  return { a, b }
}

export { expirationDurations, generateExpiration, getQuoteExpiration }
