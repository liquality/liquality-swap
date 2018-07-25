const getEthHTLCData = (recipientAddress, refundAddress, secretHash, expiration) => {
  const dataSizeBase = 112
  const redeemDestinationBase = 66
  const refundDestinationBase = 89
  const expirationHex = expiration.toString(16)
  const expirationEncoded = expirationHex.length % 2 ? '0' + expirationHex : expirationHex // Pad with 0
  const expirationSize = expirationEncoded.length / 2
  const redeemDestinationEncoded = (redeemDestinationBase + expirationSize).toString(16)
  const refundDestinationEncoded = (refundDestinationBase + expirationSize).toString(16)
  const expirationPushOpcode = (0x5f + expirationSize).toString(16)
  const dataSizeEncoded = (dataSizeBase + expirationSize).toString(16)
  const recipientAddressEncoded = recipientAddress.replace('0x', '') // Remove 0x if exists
  const refundAddressEncoded = refundAddress.replace('0x', '') // Remove 0x if exists
  const secretHashEncoded = secretHash.replace('0x', '') // Remove 0x if exists
  return `60${dataSizeEncoded}80600b6000396000f36020806000803760218160008060026048f17f\
${secretHashEncoded}602151141660${redeemDestinationEncoded}57\
${expirationPushOpcode}${expirationEncoded}421160${refundDestinationEncoded}\
57005b73${recipientAddressEncoded}ff5b73${refundAddressEncoded}ff`
}

const getBtcHTLCScript = (recipientAddress, refundAddress, secretHash, timeLock) => {
  //         # Prep inputed PK for PKH check
  // [2]     OP_DUP OP_HASH160
  //         # Swap for boolean
  // [3]     OP_2SWAP
  // [4]     OP_IF
  //             # Check secret
  // [5]         OP_HASH160
  // [26]        (20)(0x14) secretHash[20]
  // [27]        OP_EQUALVERIFY
  //             # Prep PKH check
  // [48]        (20)(0x14) redeemPKH[20]
  // [49]    OP_ELSE
  //             # Check timelock
  // [51]        (2)(0x02) timeLock[2]
  // [52]        OP_CHECKSEQUENCEVERIFY
  // [53]        OP_2DROP
  //             # Prep PKH check
  // [74]        (20)(0x14) refundPKH[20]
  // [75]    OP_ENDIF
  //         # Check PKH and sig
  // [77]    OP_EQUALVERIFY OP_CHECKSIG

  return `76a97263a9${push(secretHash)}88${push(to)}67${push('9000')}b26d${push(from)}6888ac`
}

const push = (num) => {
  let len = num.length
  len += len % 2
  len /= 2

  let prefix = ''
  if (len < 0x4b) {
  } else if (len <= 0xff) {
    prefix = '4c'
  } else if (len <= 0xffff) {
    prefix = '4d'
  } else {
    prefix = '4e'
  }

  return prefix + toHex(len) + num
}

export {getEthHTLCData, getBtcHTLCScript}
