const MAINET_RPC_URL = 'https://mainnet.infura.io/metamask'
const CLASSIC_RPC_URL = 'https://etc-geth.0xinfra.com'
const CALLISTO_RPC_URL = 'https://clo-geth.0xinfra.com'
const EXPANSE_RPC_URL = 'https://node.expanse.tech'
const UBIQ_RPC_URL = 'https://rpc1.ubiqscan.io'
const ROPSTEN_RPC_URL = 'https://ropsten.infura.io/metamask'
const KOVAN_RPC_URL = 'https://kovan.infura.io/metamask'
const RINKEBY_RPC_URL = 'https://rinkeby.infura.io/metamask'
const LOCALHOST_RPC_URL = 'http://localhost:8545'

global.METAMASK_DEBUG = 'GULP_METAMASK_DEBUG'

module.exports = {
  network: {
    localhost: LOCALHOST_RPC_URL,
    mainnet: MAINET_RPC_URL,
    ropsten: ROPSTEN_RPC_URL,
    kovan: KOVAN_RPC_URL,
    rinkeby: RINKEBY_RPC_URL,
    classic: CLASSIC_RPC_URL,
    callisto: CALLISTO_RPC_URL,
    expanse: EXPANSE_RPC_URL,
    ubiq: UBIQ_RPC_URL,
  },
  networkNames: {
    2: 'Expanse',
    3: 'Ropsten',
    4: 'Rinkeby',
    42: 'Kovan',
  },
  networkIdAlterantiveChains: {
   classic: 61,
   callisto: 820,
   expanse: 2,
 },
}
