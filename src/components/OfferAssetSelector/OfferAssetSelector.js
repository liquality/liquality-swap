import React from 'react'
import Select from 'react-select'

import './OfferAssetSelector.css'

const OfferAssetSelector = (props) => {
  const options = [
    { value: 'BTC', label: 'BTC' },
    { value: 'ETH', label: 'ETH' }
  ]

  return <div className='OfferAssetSelector'>
    <Select options={options} />
  </div>
}

OfferAssetSelector.propTypes = {
}

export default OfferAssetSelector
