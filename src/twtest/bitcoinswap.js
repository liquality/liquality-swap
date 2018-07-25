function toHex(str, len) {
  if (typeof str !== 'string') {
    str = str.toString(16)
  } if (!len) {
    len = str.length
    len += len % 2
  }

  return str
    .padStart(len, '0') // Pad the Hex
    .match(/.{2}/g) // Split by bytes
    .reverse() // Little endian
    .join('')
}

function pushT(num) {
  let len = num.length
  len += len % 2
  len /= 2

  let prefix = ''
  if (len < 0xfd) {
  } else if (len <= 0xffff) {
    prefix = 'fd'
  } else if (len <= 0xffffffff) {
    prefix = 'fe'
  } else {
    prefix = 'ff'
  }

  return prefix + toHex(len) + num
}

export function bitcoinTransaction(to, from) {
  let buffer = ''
  buffer += toHex(2, 8) // Version

  if (!Array.isArray(from)) {
    from = [from]
  }
  buffer += pushT(from.length) // tx_in count

  // tx_in
  from.every(({txId, index, scriptSig}) => {
    let txIn = ''

    // OutPoint
    txIn += toHex(txId, 64) // Hash
    txIn += toHex(index, 8) // Index

    txIn += pushT(toHex(scriptSig)) // Script signature
    txIn += "ffffffff" // Sequence

    buffer += txIn
    return true
  })

  if (!Array.isArray(to)) {
    to = [to]
  }
  buffer += pushT(to.length) // tx_out count

  // tx_out
  to.every(({amount, script}) => {
    let txOut = ''

    txOut += toHex(amount, 16) // value
    txOut += pushT(toHex(script)) // Script

    buffer += txOut
    return true
  })

  buffer += toHex(0, 8) // Locktime
  return buffer
}

function push(num) {
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

export function bitcoinSwap(to, from, secretHash, amount) {
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
