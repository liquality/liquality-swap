export function shortenAddress (address) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
}
