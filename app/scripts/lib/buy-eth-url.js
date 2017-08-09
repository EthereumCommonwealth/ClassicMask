module.exports = getBuyEthUrl

function getBuyEthUrl ({ network, amount, address }) {
  let url
  switch (network) {
    case '83':
      url = `http://changelly.com/`
      break
  }
  return url
}
