import moment from 'moment'

const expirationDurations = {
  a: moment.duration(12, 'h'),
  b: moment.duration(6, 'h')
}

function getFundExpiration (expiration, party) {
  let start, duration, time

  if (party === 'b') {
    time = moment(expiration).subtract(expirationDurations.b)
    duration = expirationDurations.b
    start = moment(expiration).subtract(expirationDurations.a)
  } else {
    time = expiration
    duration = expirationDurations.a
    start = moment(expiration).subtract(expirationDurations.a)
  }

  return {
    start,
    duration,
    time
  }
}

function getClaimExpiration (expiration, party) {
  return party === 'a'
    ? getFundExpiration(expiration, 'b')
    : getFundExpiration(expiration, 'a')
}

function generateExpiration () {
  return moment().add(expirationDurations.a)
}

export { expirationDurations, getFundExpiration, getClaimExpiration, generateExpiration }
