import coinGecko from '../services/coinGeckoClient'
import { sleep } from '../utils/async'
import config from '../config'

const types = {
  SET_RATES: 'SET_RATES'
}

const TO_CURRENCY = 'usd' // TODO: Make this configurable
const CHECK_INTERVAL = 30000

function setRates (rates) {
  return { type: types.SET_RATES, rates }
}

function syncFiatRates () {
  return async (dispatch, getState) => {
    do {
      const baseCurrencies = Object.keys(config.assets)
      const rates = await coinGecko.getPrices(baseCurrencies, TO_CURRENCY)
      dispatch(setRates(rates))
      await sleep(CHECK_INTERVAL)
    }
    while (true)
  }
}

const actions = {
  setRates,
  syncFiatRates
}

export { types, actions }
