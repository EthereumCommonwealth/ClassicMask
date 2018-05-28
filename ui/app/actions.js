const getBuyEthUrl = require('../../app/scripts/lib/buy-eth-url')

var actions = {
  _setBackgroundConnection: _setBackgroundConnection,

  GO_HOME: 'GO_HOME',
  goHome: goHome,
  // menu state
  getNetworkStatus: 'getNetworkStatus',
  // transition state
  TRANSITION_FORWARD: 'TRANSITION_FORWARD',
  TRANSITION_BACKWARD: 'TRANSITION_BACKWARD',
  transitionForward,
  transitionBackward,
  // remote state
  UPDATE_METAMASK_STATE: 'UPDATE_METAMASK_STATE',
  updateMetamaskState: updateMetamaskState,
  // notices
  MARK_NOTICE_READ: 'MARK_NOTICE_READ',
  markNoticeRead: markNoticeRead,
  SHOW_NOTICE: 'SHOW_NOTICE',
  showNotice: showNotice,
  CLEAR_NOTICES: 'CLEAR_NOTICES',
  clearNotices: clearNotices,
  markAccountsFound,
  // intialize screen
  CREATE_NEW_VAULT_IN_PROGRESS: 'CREATE_NEW_VAULT_IN_PROGRESS',
  SHOW_CREATE_VAULT: 'SHOW_CREATE_VAULT',
  SHOW_RESTORE_VAULT: 'SHOW_RESTORE_VAULT',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  forgotPassword: forgotPassword,
  SHOW_INIT_MENU: 'SHOW_INIT_MENU',
  SHOW_NEW_VAULT_SEED: 'SHOW_NEW_VAULT_SEED',
  SHOW_INFO_PAGE: 'SHOW_INFO_PAGE',
  SHOW_IMPORT_PAGE: 'SHOW_IMPORT_PAGE',
  unlockMetamask: unlockMetamask,
  unlockFailed: unlockFailed,
  showCreateVault: showCreateVault,
  showRestoreVault: showRestoreVault,
  showInitializeMenu: showInitializeMenu,
  showImportPage,
  createNewVaultAndKeychain: createNewVaultAndKeychain,
  createNewVaultAndRestore: createNewVaultAndRestore,
  createNewVaultInProgress: createNewVaultInProgress,
  addNewKeyring,
  importNewAccount,
  addNewAccount,
  NEW_ACCOUNT_SCREEN: 'NEW_ACCOUNT_SCREEN',
  navigateToNewAccountScreen,
  showNewVaultSeed: showNewVaultSeed,
  showInfoPage: showInfoPage,
  // seed recovery actions
  REVEAL_SEED_CONFIRMATION: 'REVEAL_SEED_CONFIRMATION',
  revealSeedConfirmation: revealSeedConfirmation,
  requestRevealSeed: requestRevealSeed,
  // unlock screen
  UNLOCK_IN_PROGRESS: 'UNLOCK_IN_PROGRESS',
  UNLOCK_FAILED: 'UNLOCK_FAILED',
  UNLOCK_METAMASK: 'UNLOCK_METAMASK',
  LOCK_METAMASK: 'LOCK_METAMASK',
  tryUnlockMetamask: tryUnlockMetamask,
  lockMetamask: lockMetamask,
  unlockInProgress: unlockInProgress,
  // error handling
  displayWarning: displayWarning,
  DISPLAY_WARNING: 'DISPLAY_WARNING',
  HIDE_WARNING: 'HIDE_WARNING',
  hideWarning: hideWarning,
  // accounts screen
  SET_SELECTED_ACCOUNT: 'SET_SELECTED_ACCOUNT',
  SHOW_ACCOUNT_DETAIL: 'SHOW_ACCOUNT_DETAIL',
  SHOW_ACCOUNTS_PAGE: 'SHOW_ACCOUNTS_PAGE',
  SHOW_CONF_TX_PAGE: 'SHOW_CONF_TX_PAGE',
  SHOW_CONF_MSG_PAGE: 'SHOW_CONF_MSG_PAGE',
  SET_CURRENT_FIAT: 'SET_CURRENT_FIAT',
  setCurrentCurrency: setCurrentCurrency,
  setCurrentAccountTab,
  // account detail screen
  SHOW_SEND_PAGE: 'SHOW_SEND_PAGE',
  showSendPage: showSendPage,
  ADD_TO_ADDRESS_BOOK: 'ADD_TO_ADDRESS_BOOK',
  addToAddressBook: addToAddressBook,
  REQUEST_ACCOUNT_EXPORT: 'REQUEST_ACCOUNT_EXPORT',
  requestExportAccount: requestExportAccount,
  EXPORT_ACCOUNT: 'EXPORT_ACCOUNT',
  exportAccount: exportAccount,
  SHOW_PRIVATE_KEY: 'SHOW_PRIVATE_KEY',
  showPrivateKey: showPrivateKey,
  SAVE_ACCOUNT_LABEL: 'SAVE_ACCOUNT_LABEL',
  saveAccountLabel: saveAccountLabel,
  // tx conf screen
  COMPLETED_TX: 'COMPLETED_TX',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
  NEXT_TX: 'NEXT_TX',
  PREVIOUS_TX: 'PREV_TX',
  signMsg: signMsg,
  cancelMsg: cancelMsg,
  signPersonalMsg,
  cancelPersonalMsg,
  signTypedMsg,
  cancelTypedMsg,
  signTx: signTx,
  updateAndApproveTx,
  cancelTx: cancelTx,
  completedTx: completedTx,
  txError: txError,
  nextTx: nextTx,
  previousTx: previousTx,
  cancelAllTx: cancelAllTx,
  viewPendingTx: viewPendingTx,
  VIEW_PENDING_TX: 'VIEW_PENDING_TX',
  // app messages
  confirmSeedWords: confirmSeedWords,
  showAccountDetail: showAccountDetail,
  BACK_TO_ACCOUNT_DETAIL: 'BACK_TO_ACCOUNT_DETAIL',
  backToAccountDetail: backToAccountDetail,
  showAccountsPage: showAccountsPage,
  showConfTxPage: showConfTxPage,
  // config screen
  SHOW_CONFIG_PAGE: 'SHOW_CONFIG_PAGE',
  SET_RPC_TARGET: 'SET_RPC_TARGET',
  SET_DEFAULT_RPC_TARGET: 'SET_DEFAULT_RPC_TARGET',
  SET_PROVIDER_TYPE: 'SET_PROVIDER_TYPE',
  showConfigPage,
  SHOW_ADD_TOKEN_PAGE: 'SHOW_ADD_TOKEN_PAGE',
  showAddTokenPage,
  addToken,
  setRpcTarget: setRpcTarget,
  setProviderType: setProviderType,
  // loading overlay
  SHOW_LOADING: 'SHOW_LOADING_INDICATION',
  HIDE_LOADING: 'HIDE_LOADING_INDICATION',
  showLoadingIndication: showLoadingIndication,
  hideLoadingIndication: hideLoadingIndication,
  // buy Eth with coinbase
  onboardingBuyEthView,
  ONBOARDING_BUY_ETH_VIEW: 'ONBOARDING_BUY_ETH_VIEW',
  BUY_ETH: 'BUY_ETH',
  buyEth: buyEth,
  buyEthView: buyEthView,
  buyWithShapeShift,
  BUY_ETH_VIEW: 'BUY_ETH_VIEW',
  COINBASE_SUBVIEW: 'COINBASE_SUBVIEW',
  coinBaseSubview: coinBaseSubview,
  SHAPESHIFT_SUBVIEW: 'SHAPESHIFT_SUBVIEW',
  shapeShiftSubview: shapeShiftSubview,
  PAIR_UPDATE: 'PAIR_UPDATE',
  pairUpdate: pairUpdate,
  coinShiftRquest: coinShiftRquest,
  SHOW_SUB_LOADING_INDICATION: 'SHOW_SUB_LOADING_INDICATION',
  showSubLoadingIndication: showSubLoadingIndication,
  HIDE_SUB_LOADING_INDICATION: 'HIDE_SUB_LOADING_INDICATION',
  hideSubLoadingIndication: hideSubLoadingIndication,
// QR STUFF:
  SHOW_QR: 'SHOW_QR',
  showQrView: showQrView,
  reshowQrCode: reshowQrCode,
  SHOW_QR_VIEW: 'SHOW_QR_VIEW',
// FORGOT PASSWORD:
  BACK_TO_INIT_MENU: 'BACK_TO_INIT_MENU',
  goBackToInitView: goBackToInitView,
  RECOVERY_IN_PROGRESS: 'RECOVERY_IN_PROGRESS',
  BACK_TO_UNLOCK_VIEW: 'BACK_TO_UNLOCK_VIEW',
  backToUnlockView: backToUnlockView,
  // SHOWING KEYCHAIN
  SHOW_NEW_KEYCHAIN: 'SHOW_NEW_KEYCHAIN',
  showNewKeychain: showNewKeychain,

  callBackgroundThenUpdate,
  forceUpdateMetamaskState,
  retryTransaction,
}

module.exports = actions

var background = null
function _setBackgroundConnection (backgroundConnection) {
  background = backgroundConnection
}

function goHome () {
  return {
    type: actions.GO_HOME,
  }
}

// async actions

function tryUnlockMetamask (password) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    dispatch(actions.unlockInProgress())
    log.debug(`background.submitPassword`)
    background.submitPassword(password, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) {
        dispatch(actions.unlockFailed(err.message))
      } else {
        dispatch(actions.transitionForward())
        forceUpdateMetamaskState(dispatch)
      }
    })
  }
}

function transitionForward () {
  return {
    type: this.TRANSITION_FORWARD,
  }
}

function transitionBackward () {
  return {
    type: this.TRANSITION_BACKWARD,
  }
}

function confirmSeedWords () {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.clearSeedWordCache`)
    return new Promise((resolve, reject) => {
      background.clearSeedWordCache((err, account) => {
        dispatch(actions.hideLoadingIndication())
        if (err) {
          dispatch(actions.displayWarning(err.message))
          reject(err)
        }

        log.info('Seed word cache cleared. ' + account)
        dispatch(actions.showAccountsPage())
        resolve(account)
      })
    })
  }
}

function createNewVaultAndRestore (password, seed) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.createNewVaultAndRestore`)

    return new Promise((resolve, reject) => {
      background.createNewVaultAndRestore(password, seed, (err) => {

        dispatch(actions.hideLoadingIndication())

        if (err) {
          dispatch(actions.displayWarning(err.message))
          return reject(err)
        }

        dispatch(actions.showAccountsPage())
        resolve()
      })
    })
  }
}

function createNewVaultAndKeychain (password) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.createNewVaultAndKeychain`)

    return new Promise((resolve, reject) => {
      background.createNewVaultAndKeychain(password, (err) => {
        if (err) {
          dispatch(actions.displayWarning(err.message))
          return reject(err)
        }
        log.debug(`background.placeSeedWords`)
        background.placeSeedWords((err) => {
          if (err) {
            dispatch(actions.displayWarning(err.message))
            return reject(err)
          }
          dispatch(actions.hideLoadingIndication())
          forceUpdateMetamaskState(dispatch)
          resolve()
        })
      })
    })

  }
}

function revealSeedConfirmation () {
  return {
    type: this.REVEAL_SEED_CONFIRMATION,
  }
}

function requestRevealSeed (password) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.submitPassword`)
    background.submitPassword(password, (err) => {
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      log.debug(`background.placeSeedWords`)
      background.placeSeedWords((err, result) => {
        if (err) return dispatch(actions.displayWarning(err.message))
        dispatch(actions.hideLoadingIndication())
        dispatch(actions.showNewVaultSeed(result))
      })
    })
  }
}

function addNewKeyring (type, opts) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.addNewKeyring`)
    background.addNewKeyring(type, opts, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) return dispatch(actions.displayWarning(err.message))
      dispatch(actions.showAccountsPage())
    })
  }
}

function importNewAccount (strategy, args) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication('This may take a while, be patient.'))
    log.debug(`background.importAccountWithStrategy`)
    return new Promise((resolve, reject) => {
      background.importAccountWithStrategy(strategy, args, (err) => {
        if (err) {
          dispatch(actions.displayWarning(err.message))
          return reject(err)
        }
        log.debug(`background.getState`)
        background.getState((err, newState) => {
          dispatch(actions.hideLoadingIndication())
          if (err) {
            dispatch(actions.displayWarning(err.message))
            return reject(err)
          }
          dispatch(actions.updateMetamaskState(newState))
          dispatch({
            type: actions.SHOW_ACCOUNT_DETAIL,
            value: newState.selectedAddress,
          })
          resolve(newState)
        })
      })
    })
  }
}

function navigateToNewAccountScreen () {
  return {
    type: this.NEW_ACCOUNT_SCREEN,
  }
}

function addNewAccount () {
  log.debug(`background.addNewAccount`)
  return callBackgroundThenUpdate(background.addNewAccount)
}

function showInfoPage () {
  return {
    type: actions.SHOW_INFO_PAGE,
  }
}

function setCurrentCurrency (currencyCode) {
  return (dispatch) => {
    dispatch(this.showLoadingIndication())
    log.debug(`background.setCurrentCurrency`)
    background.setCurrentCurrency(currencyCode, (err, data) => {
      dispatch(this.hideLoadingIndication())
      if (err) {
        log.error(err.stack)
        return dispatch(actions.displayWarning(err.message))
      }
      dispatch({
        type: this.SET_CURRENT_FIAT,
        value: {
          currentCurrency: data.currentCurrency,
          conversionRate: data.conversionRate,
          conversionDate: data.conversionDate,
        },
      })
    })
  }
}

function signMsg (msgData) {
  log.debug('action - signMsg')
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())

    log.debug(`actions calling background.signMessage`)
    background.signMessage(msgData, (err, newState) => {
      log.debug('signMessage called back')
      dispatch(actions.updateMetamaskState(newState))
      dispatch(actions.hideLoadingIndication())

      if (err) log.error(err)
      if (err) return dispatch(actions.displayWarning(err.message))

      dispatch(actions.completedTx(msgData.metamaskId))
    })
  }
}

function signPersonalMsg (msgData) {
  log.debug('action - signPersonalMsg')
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())

    log.debug(`actions calling background.signPersonalMessage`)
    background.signPersonalMessage(msgData, (err, newState) => {
      log.debug('signPersonalMessage called back')
      dispatch(actions.updateMetamaskState(newState))
      dispatch(actions.hideLoadingIndication())

      if (err) log.error(err)
      if (err) return dispatch(actions.displayWarning(err.message))

      dispatch(actions.completedTx(msgData.metamaskId))
    })
  }
}

function signTypedMsg (msgData) {
  log.debug('action - signTypedMsg')
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())

    log.debug(`actions calling background.signTypedMessage`)
    background.signTypedMessage(msgData, (err, newState) => {
      log.debug('signTypedMessage called back')
      dispatch(actions.updateMetamaskState(newState))
      dispatch(actions.hideLoadingIndication())

      if (err) log.error(err)
      if (err) return dispatch(actions.displayWarning(err.message))

      dispatch(actions.completedTx(msgData.metamaskId))
    })
  }
}

function signTx (txData) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    global.ethQuery.sendTransaction(txData, (err, data) => {
      dispatch(actions.hideLoadingIndication())
      if (err) dispatch(actions.displayWarning(err.message))
      dispatch(this.goHome())
    })
    dispatch(actions.showConfTxPage())
  }
}

function updateAndApproveTx (txData) {
  log.info('actions: updateAndApproveTx: ' + JSON.stringify(txData))
  return (dispatch) => {
    log.debug(`actions calling background.updateAndApproveTx`)
    background.updateAndApproveTransaction(txData, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) {
        dispatch(actions.txError(err))
        dispatch(actions.goHome())
        return log.error(err.message)
      }
      dispatch(actions.completedTx(txData.id))
    })
  }
}

function completedTx (id) {
  return {
    type: actions.COMPLETED_TX,
    value: id,
  }
}

function txError (err) {
  return {
    type: actions.TRANSACTION_ERROR,
    message: err.message,
  }
}

function cancelMsg (msgData) {
  log.debug(`background.cancelMessage`)
  background.cancelMessage(msgData.id)
  return actions.completedTx(msgData.id)
}

function cancelPersonalMsg (msgData) {
  const id = msgData.id
  background.cancelPersonalMessage(id)
  return actions.completedTx(id)
}

function cancelTypedMsg (msgData) {
  const id = msgData.id
  background.cancelTypedMessage(id)
  return actions.completedTx(id)
}

function cancelTx (txData) {
  return (dispatch) => {
    log.debug(`background.cancelTransaction`)
    background.cancelTransaction(txData.id, () => {
      dispatch(actions.completedTx(txData.id))
    })
  }
}

function cancelAllTx (txsData) {
  return (dispatch) => {
    txsData.forEach((txData, i) => {
      background.cancelTransaction(txData.id, () => {
        dispatch(actions.completedTx(txData.id))
        i === txsData.length - 1 ? dispatch(actions.goHome()) : null
      })
    })
  }
}
//
// initialize screen
//

function showCreateVault () {
  return {
    type: actions.SHOW_CREATE_VAULT,
  }
}

function showRestoreVault () {
  return {
    type: actions.SHOW_RESTORE_VAULT,
  }
}

function forgotPassword () {
  return {
    type: actions.FORGOT_PASSWORD,
  }
}

function showInitializeMenu () {
  return {
    type: actions.SHOW_INIT_MENU,
  }
}

function showImportPage () {
  return {
    type: actions.SHOW_IMPORT_PAGE,
  }
}

function createNewVaultInProgress () {
  return {
    type: actions.CREATE_NEW_VAULT_IN_PROGRESS,
  }
}

function showNewVaultSeed (seed) {
  return {
    type: actions.SHOW_NEW_VAULT_SEED,
    value: seed,
  }
}

function backToUnlockView () {
  return {
    type: actions.BACK_TO_UNLOCK_VIEW,
  }
}

function showNewKeychain () {
  return {
    type: actions.SHOW_NEW_KEYCHAIN,
  }
}

//
// unlock screen
//

function unlockInProgress () {
  return {
    type: actions.UNLOCK_IN_PROGRESS,
  }
}

function unlockFailed (message) {
  return {
    type: actions.UNLOCK_FAILED,
    value: message,
  }
}

function unlockMetamask (account) {
  return {
    type: actions.UNLOCK_METAMASK,
    value: account,
  }
}

function updateMetamaskState (newState) {
  return {
    type: actions.UPDATE_METAMASK_STATE,
    value: newState,
  }
}

function lockMetamask () {
  log.debug(`background.setLocked`)
  return callBackgroundThenUpdate(background.setLocked)
}

function setCurrentAccountTab (newTabName) {
  log.debug(`background.setCurrentAccountTab: ${newTabName}`)
  return callBackgroundThenUpdateNoSpinner(background.setCurrentAccountTab, newTabName)
}

function showAccountDetail (address) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.setSelectedAddress`)
    background.setSelectedAddress(address, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      dispatch({
        type: actions.SHOW_ACCOUNT_DETAIL,
        value: address,
      })
    })
  }
}

function backToAccountDetail (address) {
  return {
    type: actions.BACK_TO_ACCOUNT_DETAIL,
    value: address,
  }
}

function showAccountsPage () {
  return {
    type: actions.SHOW_ACCOUNTS_PAGE,
  }
}

function showConfTxPage (transForward = true) {
  return {
    type: actions.SHOW_CONF_TX_PAGE,
    transForward: transForward,
  }
}

function nextTx () {
  return {
    type: actions.NEXT_TX,
  }
}

function viewPendingTx (txId) {
  return {
    type: actions.VIEW_PENDING_TX,
    value: txId,
  }
}

function previousTx () {
  return {
    type: actions.PREVIOUS_TX,
  }
}

function showConfigPage (transitionForward = true) {
  return {
    type: actions.SHOW_CONFIG_PAGE,
    value: transitionForward,
  }
}

function showAddTokenPage (transitionForward = true) {
  return {
    type: actions.SHOW_ADD_TOKEN_PAGE,
    value: transitionForward,
  }
}

function addToken (address, symbol, decimals) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    background.addToken(address, symbol, decimals, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      setTimeout(() => {
        dispatch(actions.goHome())
      }, 250)
    })
  }
}

function goBackToInitView () {
  return {
    type: actions.BACK_TO_INIT_MENU,
  }
}

//
// notice
//

function markNoticeRead (notice) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.markNoticeRead`)
    return new Promise((resolve, reject) => {
      background.markNoticeRead(notice, (err, notice) => {
        dispatch(actions.hideLoadingIndication())
        if (err) {
          dispatch(actions.displayWarning(err))
          return reject(err)
        }
        if (notice) {
          dispatch(actions.showNotice(notice))
          resolve()
        } else {
          dispatch(actions.clearNotices())
          resolve()
        }
      })
    })
  }
}

function showNotice (notice) {
  return {
    type: actions.SHOW_NOTICE,
    value: notice,
  }
}

function clearNotices () {
  return {
    type: actions.CLEAR_NOTICES,
  }
}

function markAccountsFound () {
  log.debug(`background.markAccountsFound`)
  return callBackgroundThenUpdate(background.markAccountsFound)
}

function retryTransaction (txId) {
  log.debug(`background.retryTransaction`)
  return (dispatch) => {
    background.retryTransaction(txId, (err, newState) => {
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      dispatch(actions.updateMetamaskState(newState))
      dispatch(actions.viewPendingTx(txId))
    })
  }
}

//
// config
//

function setProviderType (type) {
  return (dispatch) => {
    log.debug(`background.setProviderType`)
    background.setProviderType(type, (err, result) => {
      if (err) {
        log.error(err)
        return dispatch(self.displayWarning('Had a problem changing networks!'))
      }
    })
    return {
      type: actions.SET_PROVIDER_TYPE,
      value: type,
    }
  }
}

function setRpcTarget (newRpc) {
  log.debug(`background.setRpcTarget: ${newRpc}`)
  return (dispatch) => {
    background.setCustomRpc(newRpc, (err, result) => {
      if (err) {
        log.error(err)
        return dispatch(self.displayWarning('Had a problem changing networks!'))
      }
    })
  }
}

// Calls the addressBookController to add a new address.
function addToAddressBook (recipient, nickname) {
  log.debug(`background.addToAddressBook`)
  return (dispatch) => {
    background.setAddressBook(recipient, nickname, (err, result) => {
      if (err) {
        log.error(err)
        return dispatch(self.displayWarning('Address book failed to update'))
      }
    })
  }
}

function showLoadingIndication (message) {
  return {
    type: actions.SHOW_LOADING,
    value: message,
  }
}

function hideLoadingIndication () {
  return {
    type: actions.HIDE_LOADING,
  }
}

function showSubLoadingIndication () {
  return {
    type: actions.SHOW_SUB_LOADING_INDICATION,
  }
}

function hideSubLoadingIndication () {
  return {
    type: actions.HIDE_SUB_LOADING_INDICATION,
  }
}

function displayWarning (text) {
  return {
    type: actions.DISPLAY_WARNING,
    value: text,
  }
}

function hideWarning () {
  return {
    type: actions.HIDE_WARNING,
  }
}

function requestExportAccount () {
  return {
    type: actions.REQUEST_ACCOUNT_EXPORT,
  }
}

function exportAccount (password, address) {
  var self = this

  return function (dispatch) {
    dispatch(self.showLoadingIndication())

    log.debug(`background.submitPassword`)
    background.submitPassword(password, function (err) {
      if (err) {
        log.error('Error in submiting password.')
        dispatch(self.hideLoadingIndication())
        return dispatch(self.displayWarning('Incorrect Password.'))
      }
      log.debug(`background.exportAccount`)
      background.exportAccount(address, function (err, result) {
        dispatch(self.hideLoadingIndication())

        if (err) {
          log.error(err)
          return dispatch(self.displayWarning('Had a problem exporting the account.'))
        }

        dispatch(self.showPrivateKey(result))
      })
    })
  }
}

function showPrivateKey (key) {
  return {
    type: actions.SHOW_PRIVATE_KEY,
    value: key,
  }
}

function saveAccountLabel (account, label) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    log.debug(`background.saveAccountLabel`)
    background.saveAccountLabel(account, label, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      dispatch({
        type: actions.SAVE_ACCOUNT_LABEL,
        value: { account, label },
      })
    })
  }
}

function showSendPage () {
  return {
    type: actions.SHOW_SEND_PAGE,
  }
}

function buyEth (opts) {
  return (dispatch) => {
    const url = getBuyEthUrl(opts)
    global.platform.openWindow({ url })
    dispatch({
      type: actions.BUY_ETH,
    })
  }
}

function onboardingBuyEthView (address) {
  return {
    type: actions.ONBOARDING_BUY_ETH_VIEW,
    value: address,
  }
}

function buyEthView (address) {
  return {
    type: actions.BUY_ETH_VIEW,
    value: address,
  }
}

function coinBaseSubview () {
  return {
    type: actions.COINBASE_SUBVIEW,
  }
}

function pairUpdate (coin) {
  return (dispatch) => {
    dispatch(actions.showSubLoadingIndication())
    dispatch(actions.hideWarning())
    shapeShiftRequest('marketinfo', {pair: `${coin.toLowerCase()}_eth`}, (mktResponse) => {
      dispatch(actions.hideSubLoadingIndication())
      dispatch({
        type: actions.PAIR_UPDATE,
        value: {
          marketinfo: mktResponse,
        },
      })
    })
  }
}

function shapeShiftSubview (network) {
  var pair = 'btc_eth'

  return (dispatch) => {
    dispatch(actions.showSubLoadingIndication())
    shapeShiftRequest('marketinfo', {pair}, (mktResponse) => {
      shapeShiftRequest('getcoins', {}, (response) => {
        dispatch(actions.hideSubLoadingIndication())
        if (mktResponse.error) return dispatch(actions.displayWarning(mktResponse.error))
        dispatch({
          type: actions.SHAPESHIFT_SUBVIEW,
          value: {
            marketinfo: mktResponse,
            coinOptions: response,
          },
        })
      })
    })
  }
}

function coinShiftRquest (data, marketData) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    shapeShiftRequest('shift', { method: 'POST', data}, (response) => {
      dispatch(actions.hideLoadingIndication())
      if (response.error) return dispatch(actions.displayWarning(response.error))
      var message = `
        Deposit your ${response.depositType} to the address bellow:`
      log.debug(`background.createShapeShiftTx`)
      background.createShapeShiftTx(response.deposit, response.depositType)
      dispatch(actions.showQrView(response.deposit, [message].concat(marketData)))
    })
  }
}

function buyWithShapeShift (data) {
  return dispatch => new Promise((resolve, reject) => {
    shapeShiftRequest('shift', { method: 'POST', data}, (response) => {
      if (response.error) {
        return reject(response.error)
      }
      background.createShapeShiftTx(response.deposit, response.depositType)
      return resolve(response)
    })
  })
}

function showQrView (data, message) {
  return {
    type: actions.SHOW_QR_VIEW,
    value: {
      message: message,
      data: data,
    },
  }
}
function reshowQrCode (data, coin) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    shapeShiftRequest('marketinfo', {pair: `${coin.toLowerCase()}_eth`}, (mktResponse) => {
      if (mktResponse.error) return dispatch(actions.displayWarning(mktResponse.error))

      var message = [
        `Deposit your ${coin} to the address bellow:`,
        `Deposit Limit: ${mktResponse.limit}`,
        `Deposit Minimum:${mktResponse.minimum}`,
      ]

      dispatch(actions.hideLoadingIndication())
      return dispatch(actions.showQrView(data, message))
    })
  }
}

function shapeShiftRequest (query, options, cb) {
  var queryResponse, method
  !options ? options = {} : null
  options.method ? method = options.method : method = 'GET'

  var requestListner = function (request) {
    try {
      queryResponse = JSON.parse(this.responseText)
      cb ? cb(queryResponse) : null
      return queryResponse
    } catch (e) {
      cb ? cb({error: e}) : null
      return e
    }
  }

  var shapShiftReq = new XMLHttpRequest()
  shapShiftReq.addEventListener('load', requestListner)
  shapShiftReq.open(method, `https://shapeshift.io/${query}/${options.pair ? options.pair : ''}`, true)

  if (options.method === 'POST') {
    var jsonObj = JSON.stringify(options.data)
    shapShiftReq.setRequestHeader('Content-Type', 'application/json')
    return shapShiftReq.send(jsonObj)
  } else {
    return shapShiftReq.send()
  }
}

// Call Background Then Update
//
// A function generator for a common pattern wherein:
// We show loading indication.
// We call a background method.
// We hide loading indication.
// If it errored, we show a warning.
// If it didn't, we update the state.
function callBackgroundThenUpdateNoSpinner (method, ...args) {
  return (dispatch) => {
    method.call(background, ...args, (err) => {
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      forceUpdateMetamaskState(dispatch)
    })
  }
}

function callBackgroundThenUpdate (method, ...args) {
  return (dispatch) => {
    dispatch(actions.showLoadingIndication())
    method.call(background, ...args, (err) => {
      dispatch(actions.hideLoadingIndication())
      if (err) {
        return dispatch(actions.displayWarning(err.message))
      }
      forceUpdateMetamaskState(dispatch)
    })
  }
}

function forceUpdateMetamaskState (dispatch) {
  log.debug(`background.getState`)
  background.getState((err, newState) => {
    if (err) {
      return dispatch(actions.displayWarning(err.message))
    }
    dispatch(actions.updateMetamaskState(newState))
  })
}
