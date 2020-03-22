import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TickIcon from '../../icons/tick.svg'
import Spinner from '../../icons/spinner.svg'
import './StatusMessage.css'

class StatusMessage extends Component {
  render () {
    return (
      <div className='StatusMessage'>
        <img src={this.props.complete ? TickIcon : Spinner} alt='status' />
        <div className='StatusMessage_message'>{this.props.message}</div>
      </div>
    )
  }
}

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  complete: PropTypes.bool
}

export default StatusMessage
