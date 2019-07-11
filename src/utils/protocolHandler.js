import queryString from 'qs'
import { APP_BASE_URL } from './app-links'

function registerProtocolHandler () {
  navigator.registerProtocolHandler('web+swap', `${APP_BASE_URL}#uri=%s`, 'Swap')
}

function handleProtocolURI () {
  if (window.location.hash.includes('uri=')) {
    const protocolUri = decodeURIComponent(window.location.hash.replace('#uri=', ''))
    const uri = protocolUri.replace('web+swap://', '')
    const urlParams = queryString.parse(uri)
    const swapState = {
      ccy1: urlParams.from,
      ccy2: urlParams.to,
      rate: urlParams.rate,
      ccy1CounterPartyAddr: urlParams.fromCounterPartyAddress,
      ccy2CounterPartyAddr: urlParams.toCounterPartyAddress
    }
    window.history.replaceState(null, null, `#${queryString.stringify(swapState)}`)
  }
}

export {
  registerProtocolHandler,
  handleProtocolURI
}
