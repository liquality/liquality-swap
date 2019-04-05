import React, {Component} from 'react'
import PropTypes from 'prop-types'
import currencies from '../../utils/currencies'
import config from '../../config'

import closeIcon from '../../icons/close.svg'
import './AssetSelector.css'

class AssetSelector extends Component {
  render () {
    const configuredAssets = Object.keys(config.assets)
    const displayedAssets = Object.entries(currencies)
      .filter(([id]) => configuredAssets.includes(id))
      .filter(([id]) => id !== this.props.excludeAsset)
      .filter(([, currency]) =>
        currency.code.toLowerCase().includes(this.props.search.toLowerCase()) ||
        currency.name.toLowerCase().includes(this.props.search.toLowerCase())
      )

    return <div className='AssetSelector'>
      <div className='AssetSelector_search'>
        <input type='text'
          value={this.props.search}
          placeholder='Search by Asset Name or Symbol'
          onChange={e => this.props.onSearchChange(e.target.value)} />
        <button className='AssetSelector_close' onClick={() => this.props.onClose()}><img src={closeIcon} alt='Close asset selector' /></button>
      </div>
      <ul className='AssetSelector_list'>
        {displayedAssets.map(
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
  search: PropTypes.string,
  excludeAsset: PropTypes.oneOf(Object.keys(currencies)),
  onSearchChange: PropTypes.func.isRequired,
  onSelectAsset: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

AssetSelector.defaultProps = {
  search: ''
}

export default AssetSelector
