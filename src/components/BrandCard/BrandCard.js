import React, { Component } from 'react'
import './BrandCard.css'

class BrandCard extends Component {
  render () {
    return <div className={'BrandCard ' + this.props.className}>
      <div className='BrandCard_top'>
        <h1 className='BrandCard_title'>{this.props.title}</h1>
      </div>
      {this.props.children}
    </div>
  }
}

export default BrandCard
