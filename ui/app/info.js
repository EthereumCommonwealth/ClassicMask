const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('./actions')

module.exports = connect(mapStateToProps)(InfoScreen)

function mapStateToProps (state) {
  return {}
}

inherits(InfoScreen, Component)
function InfoScreen () {
  Component.call(this)
}

InfoScreen.prototype.render = function () {
  const state = this.props
  const version = global.platform.getVersion()

  return (
    h('.flex-column.flex-grow', {
      style: {
        maxWidth: '400px',
      },
    }, [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: (event) => {
            state.dispatch(actions.goHome())
          },
        }),
        h('h2.page-subtitle', 'Info'),
      ]),

      // main view
      h('.flex-column.flex-justify-center.flex-grow.select-none', [
        h('.flex-space-around', {
          style: {
            padding: '20px',
          },
        }, [
          // current version number

          h('.info.info-gray', [
            h('div', 'ATHMask'),
            h('div', {
              style: {
                marginBottom: '10px',
              },
            }, `Version: ${version}`),
          ]),

          h('hr', {
            style: {
              margin: '10px 0 ',
              width: '7em',
            },
          }),

        ]),
      ]),
    ])
  )
}

InfoScreen.prototype.navigateTo = function (url) {
  global.platform.openWindow({ url })
}
