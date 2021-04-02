import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './spinner.svg'
import './Button.css'

class Button extends Component {
  render () {
    const classes = ['Button', 'btn']

    if (this.props.className) {
      classes.push(this.props.className)
    }

    if (this.props.primary) {
      classes.push('btn-primary')
    } else if (this.props.secondary) {
      classes.push('btn-secondary')
    } else if (this.props.link) {
      classes.push('btn-link')
    } else if (this.props.secondaryWallet) {
      classes.push('btn-secondary bg-none mt-4')
    }

    if (this.props.wide) {
      classes.push('Button_wide')
    }
    if (this.props.small) {
      classes.push('Button_small')
    }

    const showLoader = this.props.loadingMessage
    const disabled = this.props.disabled || this.props.loadingMessage

    return <button tabIndex={this.props.tabIndex} className={classes.join(' ')} disabled={disabled} onClick={e => this.props.onClick(e)}>
      {this.props.icon && <span className='Button_icon'><img src={this.props.icon} alt='' /></span>}
      { showLoader &&
        <img className='Button_spinner' src={Spinner} alt='Loading...' />
      }
      { showLoader ? this.props.loadingMessage : this.props.children }
    </button>
  }
}

Button.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  secondaryWallet: PropTypes.bool,
  link: PropTypes.bool,
  wide: PropTypes.bool,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  loadingMessage: PropTypes.string,
  tabIndex: PropTypes.number
}

Button.defaultProps = {
  tabIndex: -1
}

export default Button
