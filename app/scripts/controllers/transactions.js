const EventEmitter=require('events')
const ObservableStore=require('obs-store')
const ethUtil=require('ethereumjs-util')
const Transaction=require('ethereumjs-tx')
const EthQuery=require('ethjs-query')
const TransactionStateManger=require('../lib/tx-state-manager')
const TxGasUtil=require('../lib/tx-gas-utils')
const PendingTransactionTracker=require('../lib/pending-tx-tracker')
const createId=require('../lib/random-id')
const NonceTracker=require('../lib/nonce-tracker')
module.exports=class TransactionController extends EventEmitter{constructor(opts){super()
this.networkStore=opts.networkStore||new ObservableStore({})
this.preferencesStore=opts.preferencesStore||new ObservableStore({})
this.provider=opts.provider
this.blockTracker=opts.blockTracker
this.signEthTx=opts.signTransaction
this.getGasPrice=opts.getGasPrice
this.memStore=new ObservableStore({})
this.query=new EthQuery(this.provider)
this.txGasUtil=new TxGasUtil(this.provider)
this.txStateManager=new TransactionStateManger({initState:opts.initState,txHistoryLimit:opts.txHistoryLimit,getNetwork:this.getNetwork.bind(this),})
this.store=this.txStateManager.store
this.txStateManager.on('tx:status-update',this.emit.bind(this,'tx:status-update'))
this.nonceTracker=new NonceTracker({provider:this.provider,getPendingTransactions:this.txStateManager.getPendingTransactions.bind(this.txStateManager),getConfirmedTransactions:(address)=>{return this.txStateManager.getFilteredTxList({from:address,status:'confirmed',err:undefined,})},})
this.pendingTxTracker=new PendingTransactionTracker({provider:this.provider,nonceTracker:this.nonceTracker,publishTransaction:(rawTx)=>this.query.sendRawTransaction(rawTx),getPendingTransactions:this.txStateManager.getPendingTransactions.bind(this.txStateManager),getCompletedTransactions:this.txStateManager.getConfirmedTransactions.bind(this.txStateManager),})
this.txStateManager.store.subscribe(()=>this.emit('update:badge'))
this.pendingTxTracker.on('tx:warning',(txMeta)=>{this.txStateManager.updateTx(txMeta,'transactions/pending-tx-tracker#event: tx:warning')})
this.pendingTxTracker.on('tx:failed',this.txStateManager.setTxStatusFailed.bind(this.txStateManager))
this.pendingTxTracker.on('tx:confirmed',this.txStateManager.setTxStatusConfirmed.bind(this.txStateManager))
this.pendingTxTracker.on('tx:block-update',(txMeta,latestBlockNumber)=>{if(!txMeta.firstRetryBlockNumber){txMeta.firstRetryBlockNumber=latestBlockNumber
this.txStateManager.updateTx(txMeta,'transactions/pending-tx-tracker#event: tx:block-update')}})
this.pendingTxTracker.on('tx:retry',(txMeta)=>{if(!('retryCount' in txMeta))txMeta.retryCount=0
txMeta.retryCount++
this.txStateManager.updateTx(txMeta,'transactions/pending-tx-tracker#event: tx:retry')})
this.blockTracker.on('block',this.pendingTxTracker.checkForTxInBlock.bind(this.pendingTxTracker))
this.blockTracker.on('latest',this.pendingTxTracker.resubmitPendingTxs.bind(this.pendingTxTracker))
this.blockTracker.on('sync',this.pendingTxTracker.queryPendingTxs.bind(this.pendingTxTracker))
this._updateMemstore()
this.txStateManager.store.subscribe(()=>this._updateMemstore())
this.networkStore.subscribe(()=>this._updateMemstore())
this.preferencesStore.subscribe(()=>this._updateMemstore())}
getState(){return this.memStore.getState()}
getNetwork(){return this.networkStore.getState()}
getSelectedAddress(){return this.preferencesStore.getState().selectedAddress}
getUnapprovedTxCount(){return Object.keys(this.txStateManager.getUnapprovedTxList()).length}
getPendingTxCount(account){return this.txStateManager.getPendingTransactions(account).length}
getFilteredTxList(opts){return this.txStateManager.getFilteredTxList(opts)}
getChainId(){const networkState=this.networkStore.getState()
const getChainId=parseInt(networkState)
if(Number.isNaN(getChainId)){return 0}else{return getChainId}}
addTx(txMeta){this.txStateManager.addTx(txMeta)
this.emit(`${txMeta.id}:unapproved`,txMeta)}
async newUnapprovedTransaction(txParams){log.debug(`MetaMaskController newUnapprovedTransaction ${JSON.stringify(txParams)}`)
const initialTxMeta=await this.addUnapprovedTransaction(txParams)
return new Promise((resolve,reject)=>{this.txStateManager.once(`${initialTxMeta.id}:finished`,(finishedTxMeta)=>{switch(finishedTxMeta.status){case 'submitted':return resolve(finishedTxMeta.hash)
case 'rejected':return reject(new Error('MetaMask Tx Signature: User denied transaction signature.'))
case 'failed':return reject(new Error(finishedTxMeta.err.message))
default:return reject(new Error(`MetaMask Tx Signature: Unknown problem: ${JSON.stringify(finishedTxMeta.txParams)}`))}})})}
async addUnapprovedTransaction(txParams){await this.txGasUtil.validateTxParams(txParams)
const txMeta={id:createId(),time:(new Date()).getTime(),status:'unapproved',metamaskNetworkId:this.getNetwork(),txParams:txParams,loadingDefaults:!0,}
this.addTx(txMeta)
this.emit('newUnapprovedTx',txMeta)
await this.addTxDefaults(txMeta)
txMeta.loadingDefaults=!1
this.txStateManager.updateTx(txMeta)
return txMeta}
async addTxDefaults(txMeta){const txParams=txMeta.txParams
txMeta.gasPriceSpecified=Boolean(txParams.gasPrice)
txMeta.nonceSpecified=Boolean(txParams.nonce)
let gasPrice=txParams.gasPrice
if(!gasPrice){gasPrice=this.getGasPrice?this.getGasPrice():await this.query.gasPrice()}
txParams.gasPrice=ethUtil.addHexPrefix('4E3B29200')
txParams.value=txParams.value||'0x0'
return await this.txGasUtil.analyzeGasUsage(txMeta)}
async retryTransaction(txId){this.txStateManager.setTxStatusUnapproved(txId)
const txMeta=this.txStateManager.getTx(txId)
txMeta.lastGasPrice=txMeta.txParams.gasPrice
this.txStateManager.updateTx(txMeta,'retryTransaction: manual retry')}
async updateAndApproveTransaction(txMeta){this.txStateManager.updateTx(txMeta,'confTx: user approved transaction')
await this.approveTransaction(txMeta.id)}
async approveTransaction(txId){let nonceLock
try{this.txStateManager.setTxStatusApproved(txId)
const txMeta=this.txStateManager.getTx(txId)
const fromAddress=txMeta.txParams.from
nonceLock=await this.nonceTracker.getNonceLock(fromAddress)
const nonce=txMeta.nonceSpecified?txMeta.txParams.nonce:nonceLock.nextNonce
if(nonce>nonceLock.nextNonce){const message=`Specified nonce may not be larger than account's next valid nonce.`
throw new Error(message)}
txMeta.txParams.nonce=ethUtil.addHexPrefix(nonce.toString(16))
txMeta.nonceDetails=nonceLock.nonceDetails
this.txStateManager.updateTx(txMeta,'transactions#approveTransaction')
const rawTx=await this.signTransaction(txId)
await this.publishTransaction(txId,rawTx)
nonceLock.releaseLock()}catch(err){this.txStateManager.setTxStatusFailed(txId,err)
if(nonceLock)nonceLock.releaseLock()
throw err}}
async signTransaction(txId){const txMeta=this.txStateManager.getTx(txId)
const txParams=txMeta.txParams
const fromAddress=txParams.from
txParams.chainId=ethUtil.addHexPrefix(this.getChainId().toString(16))
const ethTx=new Transaction(txParams)
await this.signEthTx(ethTx,fromAddress)
this.txStateManager.setTxStatusSigned(txMeta.id)
const rawTx=ethUtil.bufferToHex(ethTx.serialize())
return rawTx}
async publishTransaction(txId,rawTx){const txMeta=this.txStateManager.getTx(txId)
txMeta.rawTx=rawTx
this.txStateManager.updateTx(txMeta,'transactions#publishTransaction')
const txHash=await this.query.sendRawTransaction(rawTx)
this.setTxHash(txId,txHash)
this.txStateManager.setTxStatusSubmitted(txId)}
async cancelTransaction(txId){this.txStateManager.setTxStatusRejected(txId)}
setTxHash(txId,txHash){const txMeta=this.txStateManager.getTx(txId)
txMeta.hash=txHash
this.txStateManager.updateTx(txMeta,'transactions#setTxHash')}
_updateMemstore(){const unapprovedTxs=this.txStateManager.getUnapprovedTxList()
const selectedAddressTxList=this.txStateManager.getFilteredTxList({from:this.getSelectedAddress(),metamaskNetworkId:this.getNetwork(),})
this.memStore.updateState({unapprovedTxs,selectedAddressTxList})}}