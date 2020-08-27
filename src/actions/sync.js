import cryptoassets from '@liquality/cryptoassets'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'
import { actions as transactionActions } from './transactions'
import { getFundExpiration, getExpirationForParty, getClaimExpiration } from '../utils/expiration'
import config from '../config'

const types = {
  SET_CURRENT_BLOCK: 'SET_CURRENT_BLOCK',
  SET_SYNCED: 'SET_SYNCED'
}

const DEFAULT_SYNC_INTERVAL = 5000

function setCurrentBlock (party, blockNumber) {
  return { type: types.SET_CURRENT_BLOCK, party, blockNumber }
}

function setSynced (party, synced) {
  return { type: types.SET_SYNCED, party, synced }
}

async function catchSwapCallError (func, dispatch) {
  try {
    const result = await func()
    return result
  } catch (e) {
    console.error(e)
  }
}

async function findInitiateSwapTransaction (party, blockNumber, dispatch, getState) {
  const {
    assets: { [party]: { currency, value } },
    wallets: { [party]: { addresses, type } },
    counterParty,
    secretParams,
    expiration
  } = getState().swap
  const client = getClient(currency, type)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value).toNumber() // TODO: This should be passed as BigNumber
  const swapExpiration = getFundExpiration(expiration, party).time
  const initiateTransaction = await catchSwapCallError(async () =>
    client.swap.findInitiateSwapTransaction(valueInUnit, addresses[0], counterParty[party].address, secretParams.secretHash, swapExpiration.unix(), blockNumber),
  dispatch)
  if (initiateTransaction) {
    dispatch(transactionActions.setTransaction(party, 'fund', initiateTransaction))
  }
}

async function findClaimSwapTransaction (party, blockNumber, dispatch, getState) {
  const {
    assets,
    wallets,
    transactions,
    counterParty,
    secretParams,
    expiration,
    isPartyB
  } = getState().swap
  const oppositeParty = party === 'a' ? 'b' : 'a'
  const client = getClient(assets[oppositeParty].currency, wallets[oppositeParty].type)
  const swapExpiration = getExpirationForParty(expiration, oppositeParty, isPartyB).time
  const recipientAddress = oppositeParty === 'a' ? counterParty[oppositeParty].address : wallets[oppositeParty].addresses[0]
  const refundAddress = oppositeParty === 'a' ? wallets[oppositeParty].addresses[0] : counterParty[oppositeParty].address
  const claimTransaction = await catchSwapCallError(async () =>
    client.swap.findClaimSwapTransaction(transactions[oppositeParty].fund.hash, recipientAddress, refundAddress, secretParams.secretHash, swapExpiration.unix(), blockNumber),
  dispatch)
  if (claimTransaction) {
    dispatch(transactionActions.setTransaction(party, 'claim', claimTransaction))
  }
}

async function findRefundSwapTransaction (party, blockNumber, dispatch, getState) {
  const {
    assets,
    wallets,
    transactions,
    counterParty,
    secretParams,
    expiration,
    isPartyB
  } = getState().swap
  const client = getClient(assets[party].currency, wallets[party].type)
  let swapExpiration
  if (party === 'a') {
    swapExpiration = isPartyB ? getFundExpiration(expiration, 'b').time : expiration
  } else {
    swapExpiration = isPartyB ? expiration : getFundExpiration(expiration, 'b').time
  }
  const refundTransaction = await catchSwapCallError(async () =>
    client.swap.findRefundSwapTransaction(transactions[party].fund.hash, counterParty[party].address, wallets[party].addresses[0], secretParams.secretHash, swapExpiration.unix(), blockNumber),
  dispatch)
  if (refundTransaction) {
    dispatch(transactionActions.setTransaction(party, 'refund', refundTransaction))
  }
}

async function verifyInitiateSwapTransaction (dispatch, getState) {
  const {
    assets: { b: { currency, value } },
    wallets: { b: { addresses, type } },
    counterParty,
    secretParams,
    transactions,
    isPartyB,
    expiration
  } = getState().swap
  const client = getClient(currency, type)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value).toNumber() // TODO: This should be passed as BigNumber
  const swapExpiration = isPartyB ? expiration : getClaimExpiration(expiration, 'a').time
  const swapVerified = await catchSwapCallError(async () =>
    client.swap.verifyInitiateSwapTransaction(transactions.b.fund.hash, valueInUnit, addresses[0], counterParty.b.address, secretParams.secretHash, swapExpiration.unix()),
  dispatch)
  if (swapVerified) {
    dispatch(transactionActions.setIsVerified(true))
  }
}

function sync (party) {
  return async (dispatch, getState) => {
    const { transactions, assets, wallets } = getState().swap
    const startBlock = transactions[party].startBlock
    const client = getClient(assets[party].currency, wallets[party].type)
    const assetConfig = config.assets[assets[party].currency]
    dispatch(setCurrentBlock(party, startBlock))

    let blockNumber = startBlock
    do {
      let swap = getState().swap
      if (!swap.sync[party].synced) {
        if (!swap.transactions[party].fund.hash) {
          await findInitiateSwapTransaction(party, blockNumber, dispatch, getState)
        }
        swap = getState().swap
        if (swap.transactions[party].fund.hash) {
          if (party === 'b' && !swap.transactions.isVerified) {
            await verifyInitiateSwapTransaction(dispatch, getState)
          }
          const oppositeParty = party === 'a' ? 'b' : 'a'
          if (!swap.transactions[oppositeParty].claim.hash) {
            await findClaimSwapTransaction(oppositeParty, blockNumber, dispatch, getState)
          }
          if (!swap.transactions[party].refund.hash) {
            await findRefundSwapTransaction(party, blockNumber, dispatch, getState)
          }
        }
      }

      const assetClient = getClient(assets[party].currency, wallets[party].type)

      if (assetClient.swap.doesBlockScan) {
        const currentBlock = await client.chain.getBlockHeight()
        if (currentBlock > blockNumber) {
          blockNumber++
          dispatch(setCurrentBlock(party, blockNumber))
          dispatch(setSynced(party, false))
          if (config.syncDelay > 0) {
            await sleep(config.syncDelay)
          }
        } else {
          dispatch(setSynced(party, true))
          await sleep(assetConfig.syncInterval || DEFAULT_SYNC_INTERVAL)
        }
      } else {
        await sleep(assetConfig.syncInterval || DEFAULT_SYNC_INTERVAL)
      }
    }
    while (true)
  }
}

const actions = {
  sync
}

export { types, actions }
