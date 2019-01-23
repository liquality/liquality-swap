import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './spinner.svg'
import './Button.css'

class Button extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clickDisabled: false
    }
  }

  onClickHandler (e) {
    if (this.props.loadingAfterClickMessage) {
      this.setState({
        clickDisabled: true
      })
      this.timeout = setTimeout(() => {
        this.setState({clickDisabled: false})
      }, 20000)
    }
    this.props.onClick(e)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

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
    }

    if (this.props.wide) {
      classes.push('Button_wide')
    }
    if (this.props.small) {
      classes.push('Button_small')
    }

    const showLoader = this.props.loadingAfterClick && this.state.clickDisabled
    const disabled = this.state.clickDisabled || this.props.disabled

    return <button tabIndex={this.props.tabIndex} className={classes.join(' ')} disabled={disabled} onClick={e => this.onClickHandler(e)}>
      {this.props.icon && <span className='Button_icon'><img src={this.props.icon} alt='' /></span>}
      {showLoader &&
        <img className='Button_spinner' src={Spinner} alt='Loading...' />
      }
      { this.props.loadingAfterClickMessage && this.state.clickDisabled
        ? this.props.loadingAfterClickMessage : this.props.children }
    </button>
  }
}

Button.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  link: PropTypes.bool,
  wide: PropTypes.bool,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  loadingAfterClick: PropTypes.bool,
  loadingAfterClickMessage: PropTypes.string,
  tabIndex: PropTypes.number
}

Button.defaultProps = {
  tabIndex: -1
}

export default Button
