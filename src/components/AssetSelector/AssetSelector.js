import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'

import './AssetSelector.css'

class AssetSelector extends Component {
  render () {
    return <Modal open={this.props.open} onClose={this.props.onClose}>
      <div className='AssetSelector'>
        BO SELECTA
      </div>
    </Modal>
  }
}

AssetSelector.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

AssetSelector.defaultProps = {
  open: false
}

export default AssetSelector
