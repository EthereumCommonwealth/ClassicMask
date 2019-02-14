cleanContextForImports()
require('web3/dist/web3.min.js')
const log=require('loglevel')
const LocalMessageDuplexStream=require('post-message-stream')
const setupDappAutoReload=require('./lib/auto-reload.js')
const MetamaskInpageProvider=require('./lib/inpage-provider.js')
restoreContextAfterImports()
const METAMASK_DEBUG='GULP_METAMASK_DEBUG'
window.log=log
log.setDefaultLevel(METAMASK_DEBUG?'debug':'warn')
var metamaskStream=new LocalMessageDuplexStream({name:'inpage',target:'contentscript',})
var inpageProvider=new MetamaskInpageProvider(metamaskStream)
if(typeof window.web3!=='undefined'){throw new Error(`MetaMask detected another web3.
     MetaMask will not work reliably with another web3 extension.
     This usually happens if you have two MetaMasks installed,
     or MetaMask and another web3 extension. Please remove one
     and try again.`)}
var web3=new Web3(inpageProvider)
web3.setProvider=function(){log.debug('MetaMask - overrode web3.setProvider')}
log.debug('MetaMask - injected web3')
setupDappAutoReload(web3,inpageProvider.publicConfigStore)
inpageProvider.publicConfigStore.subscribe(function(state){web3.eth.defaultAccount=state.selectedAddress})
var __define
function cleanContextForImports(){__define=global.define
try{global.define=undefined}catch(_){console.warn('MetaMask - global.define could not be deleted.')}}
function restoreContextAfterImports(){try{global.define=__define}catch(_){console.warn('MetaMask - global.define could not be overwritten.')}}