import moment from 'moment'

const expirationDurations = {
  a: moment.duration(12, 'h'),
  b: moment.duration(6, 'h')
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
