import React, {Component} from 'react'
import './ErrorModal.css'
import CloseIcon from '../../icons/close.svg'

class ErrorModal extends Component {
  render () {
    return (
      <div>
        { this.props.open && <div className='ErrorModal'>
          <img className='ErrorModal_close' src={CloseIcon} onClick={this.props.onClose} alt='Close' />
          {this.props.error && this.props.error.toString()}
        </div> }
      </div>
    )
  }
}

export default ErrorModal
