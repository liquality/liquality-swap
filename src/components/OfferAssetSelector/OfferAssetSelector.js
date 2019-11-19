import React from 'react'
import Select from 'react-select'

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
