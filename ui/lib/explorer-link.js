const prefixForNetwork = require('./etherscan-prefix-for-network')

module.exports = function (hash, network) {
  const prefix = prefixForNetwork(network)
  if (network === 61) {
    return `https://gastracker.io/tx/${hash}`
  } else if (network === 820) {
    return `https://explorer.callisto.network/tx/${hash}`
  } else if (network === 28) {
    return `https://explorer.ethereumsocial.kr/tx/${hash}`
  }
  return `https://scan.atheios.com/tx/${hash}`
}
