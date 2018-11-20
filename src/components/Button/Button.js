import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    }

    if (this.props.wide) {
      classes.push('Button_wide')
    }

    return <button className={classes.join(' ')} disabled={this.props.disabled} onClick={e => this.props.onClick(e)}>
      {this.props.icon && <span class='Button_icon'><img src={this.props.icon} /></span>}
      {this.props.children}
    </button>
  }
}

Button.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  wide: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  onClick: PropTypes.func
}

export default Button
