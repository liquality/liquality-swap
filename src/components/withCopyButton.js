import React from 'react'

function withCopyButton (WrappedComponent) {
  return class extends React.Component {
    handleCopyClick () {
      const tempInput = document.createElement('input')
      tempInput.value = this.props.link
      tempInput.style = 'position: absolute; top: -2000px;'
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
    }

    render () {
      return <WrappedComponent onCopyClick={() => this.handleCopyClick()} {...this.props} />
    }
  }
}

export default withCopyButton
