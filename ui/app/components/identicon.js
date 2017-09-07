const Component = require('react').Component
const h = require('react-hyperscript')
const blockies = require('ethereum-blockies')

class IdenticonComponent extends Component {
  constructor (props) {
    super(props)
    this.defaultDiameter = 46
  }

  render () {
    var props = this.props
    var diameter = props.diameter || this.defaultDiameter
    const content = blockies.create({
      seed: props.address || '0x00',
      size: 8,
      scale: 16,
      color: '#4541AD',
      bgcolor: '#DAEC19',
      spotcolor: -1,
    }).toDataURL()
    return h('img', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: diameter,
        width: diameter,
        borderRadius: diameter / 2,
        overflow: 'hidden',
        backgroundImage: 'url(' + content + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    })
  }
}

export default IdenticonComponent
