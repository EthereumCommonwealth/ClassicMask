const prefixForNetwork = require('./etherscan-prefix-for-network')

module.exports = function (hash, network) {
  const prefix = prefixForNetwork(network)
  if (network === 61) {
    return `https://gastracker.io/tx/${hash}`
  }
  return `http://${prefix}etherscan.io/tx/${hash}`
}
