import React, { Component } from 'react'
import './BrandCard.css'

class BrandCard extends Component {
  render () {
    return <div className={'BrandCard ' + this.props.className}>
      <h1 className='BrandCard_title'>{this.props.title}</h1>
      {this.props.children}
    </div>
  }
}

export default BrandCard
