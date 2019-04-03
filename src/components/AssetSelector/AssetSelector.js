import React, {Component} from 'react'
import PropTypes from 'prop-types'
import currencies from '../../utils/currencies'

import './AssetSelector.css'

class AssetSelector extends Component {
  render () {
    return <div className='AssetSelector'>
      <ul className='AssetSelector_list'>
        {Object.entries(currencies).filter(([id]) => id !== this.props.excludeAsset).map(
          ([id, currency]) =>
            <li className='AssetSelector_asset' key={id} onClick={() => this.props.onSelectAsset(id)}>
              <img className='AssetSelector_asset_icon' src={currency.icon} alt={currency.name} />
              <h3 className='AssetSelector_asset_name'>{currency.code} {currency.name}</h3>
            </li>
        )}
      </ul>
    </div>
  }
}

AssetSelector.propTypes = {
  excludeAsset: PropTypes.oneOf(Object.keys(currencies)),
  onSelectAsset: PropTypes.func.isRequired
}

export default AssetSelector
