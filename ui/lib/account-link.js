module.exports = function (address, network) {
  const net = parseInt(network)
  let link
  switch (net) {
    case 83: // ropsten test net
      link = `http://gastracker.io/address/${address}`
      break

    default:
      link = ''
      break
  }

  return link
}
