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
      var _ = this
      setTimeout((function() {_.setState({
        clickDisabled: false
      })}), 20000)
    }
    this.props.onClick(e)
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
    }

    if (this.props.wide) {
      classes.push('Button_wide')
    }
    if (this.props.small) {
      classes.push('Button_small')
    }

    const showLoader = this.props.loadingAfterClick && this.state.clickDisabled
    const disabled = this.state.clickDisabled || this.props.disabled

    return <button tabindex={this.props.tabindex} className={classes.join(' ')} disabled={disabled} onClick={e => this.onClickHandler(e)}>
      {this.props.icon && <span class='Button_icon'><img src={this.props.icon} /></span>}
      {showLoader &&
        <img class='Button_spinner' src={Spinner} />
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
  wide: PropTypes.bool,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  loadingAfterClick: PropTypes.bool,
  loadingAfterClickMessage: PropTypes.string,
  tabindex: PropTypes.number
}

Button.defaultProps = {
  tabindex: -1
}

export default Button
