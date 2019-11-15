import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'react-select'

import cryptoassets from '@liquality/cryptoassets'
import './OfferAssetSelector.css'

const OfferAssetSelector = (props) => {
  const options = [
    { value: 'btc', label: 'BTC' },
    { value: 'eth', label: 'ETH' }
  ]

  return <div className='OfferAssetSelector'>
    <Select options={options} />
  </div>
}

OfferAssetSelector.propTypes = {
}

export default OfferAssetSelector
