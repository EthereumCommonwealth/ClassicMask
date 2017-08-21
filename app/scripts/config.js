const MAINET_RPC_URL = 'https://mainnet.infura.io/metamask'
const CLASSIC_RPC_URL = 'https://mewapi.epool.io'
const EXPANSE_RPC_URL = 'https://node.expanse.tech'
const ROPSTEN_RPC_URL = 'https://ropsten.infura.io/metamask'
const KOVAN_RPC_URL = 'https://kovan.infura.io/metamask'
const RINKEBY_RPC_URL = 'https://rinkeby.infura.io/metamask'

global.METAMASK_DEBUG = 'GULP_METAMASK_DEBUG'

module.exports = {
  network: {
    mainnet: MAINET_RPC_URL,
    ropsten: ROPSTEN_RPC_URL,
    kovan: KOVAN_RPC_URL,
    rinkeby: RINKEBY_RPC_URL,
    classic: CLASSIC_RPC_URL,
    expanse: EXPANSE_RPC_URL,
  },
  networkNames: {
    2: 'Expanse',
    3: 'Ropsten',
    4: 'Rinkeby',
    42: 'Kovan',
  },
  networkIdAlterantiveChains: {
   classic: 61,
 },
}
