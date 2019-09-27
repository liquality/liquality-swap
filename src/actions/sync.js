import cryptoassets from '@liquality/cryptoassets'
import { getClient } from '../services/chainClient'
import { sleep } from '../utils/async'
import { actions as transactionActions } from './transactions'
import { actions as swapActions } from './swap'
import { getFundExpiration } from '../utils/expiration'

const types = {
  SET_CURRENT_BLOCK: 'SET_CURRENT_BLOCK',
  SET_SYNCED: 'SET_SYNCED'
}

const CHECK_INTERVAL = 5000 // TODO: config per chain?

function setCurrentBlock (party, blockNumber) {
  return { type: types.SET_CURRENT_BLOCK, party, blockNumber }
}

function setSynced (party, synced) {
  return { type: types.SET_SYNCED, party, synced }
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
  const valueInUnit = cryptoassets[currency].currencyToUnit(value)
  const swapExpiration = getFundExpiration(expiration, party).time
  const initiateTransaction = await client.swap.findInitiateSwapTransaction(valueInUnit, addresses[0], counterParty[party].address, secretParams.secretHash, swapExpiration.unix(), blockNumber)
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
    expiration
  } = getState().swap
  const client = getClient(assets[party].currency, wallets[party].type)
  const swapExpiration = getFundExpiration(expiration, party).time
  console.log('finding claim', transactions[party].fund.hash, counterParty[party].address, wallets[party].addresses[0], secretParams.secretHash, swapExpiration.unix(), blockNumber)
  const claimTransaction = await client.swap.findClaimSwapTransaction(transactions[party].fund.hash, counterParty[party].address, wallets[party].addresses[0], secretParams.secretHash, swapExpiration.unix(), blockNumber)
  if (claimTransaction) {
    const oppositeParty = party === 'a' ? 'b' : 'a'
    dispatch(transactionActions.setTransaction(oppositeParty, 'claim', claimTransaction))
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
  const refundTransaction = await client.swap.findRefundSwapTransaction(transactions[party].fund.hash, counterParty[party].address, wallets[party].addresses[0], secretParams.secretHash, swapExpiration.unix(), blockNumber)
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
    expiration
  } = getState().swap
  const client = getClient(currency, type)
  const valueInUnit = cryptoassets[currency].currencyToUnit(value)
  const swapVerified = await client.swap.verifyInitiateSwapTransaction(transactions.b.fund.hash, valueInUnit, addresses[0], counterParty.b.address, secretParams.secretHash, expiration.unix())
  if (swapVerified) {
    dispatch(swapActions.setIsVerified(true))
  }
}

function sync (party) {
  return async (dispatch, getState) => {
    const { transactions, assets, wallets } = getState().swap
    const startBlock = transactions[party].startBlock
    const client = getClient(assets[party].currency, wallets[party].type)
    dispatch(setCurrentBlock(startBlock))

    let blockNumber = startBlock
    do {
      const swap = getState().swap
      if (!swap.sync[party].synced) {
        if (!swap.transactions[party].fund.hash) {
          await findInitiateSwapTransaction(party, blockNumber, dispatch, getState)
        } else {
          if (!swap.isVerified) {
            await verifyInitiateSwapTransaction(dispatch, getState)
          }
          const oppositeParty = party === 'a' ? 'b' : 'a'
          if (!swap.transactions[oppositeParty].claim.hash) {
            await findClaimSwapTransaction(party, blockNumber, dispatch, getState)
          }
          if (!swap.transactions[party].refund.hash) {
            await findRefundSwapTransaction(party, blockNumber, dispatch, getState)
          }
        }
      }
      const currentBlock = await client.chain.getBlockHeight()
      if (currentBlock > blockNumber) {
        blockNumber++
        dispatch(setCurrentBlock(party, blockNumber))
        dispatch(setSynced(party, false))
      } else {
        dispatch(setSynced(party, true))
        await sleep(CHECK_INTERVAL)
      }
    }
    while (true)
  }
}

const actions = {
  sync
}

export { types, actions }
