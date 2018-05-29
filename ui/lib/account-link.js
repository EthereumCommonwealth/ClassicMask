module.exports = function (address, network) {
  const net = parseInt(network)
  let link
  switch (net) {
    case 1: // main net
      link = `https://etherscan.io/address/${address}`
      break
    case 2: // morden test net
      link = `https://morden.etherscan.io/address/${address}`
      break
    case 3: // ropsten test net
      link = `https://ropsten.etherscan.io/address/${address}`
      break
    case 4: // rinkeby test net
      link = `https://rinkeby.etherscan.io/address/${address}`
      break
    case 42: // kovan test net
      link = `https://kovan.etherscan.io/address/${address}`
      break
    case 61: // ethereum classic net
      link = `https://gastracker.io/addr/${address}`
      break
    case 820: // callisto net
      link = `https://explorer.callisto.network/account/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
