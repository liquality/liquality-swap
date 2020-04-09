import moment from 'moment'

const expirationDurations = {
  a: moment.duration(6, 'h'),
  b: moment.duration(3, 'h')
}

function getExpirationForParty (expiration, party, isPartyB) {
  const oppositeParty = party === 'a' ? 'b' : 'a'
  return isPartyB ? getFundExpiration(expiration, oppositeParty) : getFundExpiration(expiration, party)
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

export { expirationDurations, getExpirationForParty, getFundExpiration, getClaimExpiration, generateExpiration }
