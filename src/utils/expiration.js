import moment from 'moment'

const expirationDurations = {
  a: moment.duration(12, 'h'),
  b: moment.duration(6, 'h')
}

function getPartyExpiration (expiration, party) {
  return party === 'b' ? moment(expiration).subtract(expirationDurations.b) : expiration
}

function generateExpiration () {
  return moment().add(expirationDurations.a)
}

export { expirationDurations, getPartyExpiration, generateExpiration }
