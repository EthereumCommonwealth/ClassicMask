const Helper=require('./util/mascara-test-helper.js') window.addEventListener('load',()=>{window.METAMASK_SKIP_RELOAD=true const body=document.body const container=document.createElement('div') container.id='app-content' body.appendChild(container) require('../src/ui.js')})