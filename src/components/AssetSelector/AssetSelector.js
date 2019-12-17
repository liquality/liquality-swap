import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cryptoassets from '@liquality/cryptoassets'
import * as assetUtils from '../../utils/assets'
import config from '../../config'

import closeIcon from '../../icons/close.svg'
import './AssetSelector.css'

class AssetSelector extends Component {
  render () {
    const userDefinedAssets = Object.keys(config.assets)
    const displayedAssets = Object.entries(cryptoassets)
      .filter(([id]) => this.props.assets.includes(id))
      .filter(([id]) => userDefinedAssets.includes(id))
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
              <img className='AssetSelector_asset_icon' src={assetUtils.getIcon(currency.code)} alt={currency.name} />
              <h4 className='AssetSelector_asset_name'>{currency.name} ({currency.code})</h4>
            </li>
        )}
      </ul>
    </div>
  }
}

AssetSelector.propTypes = {
  search: PropTypes.string,
  assets: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(cryptoassets))),
  onSearchChange: PropTypes.func.isRequired,
  onSelectAsset: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

AssetSelector.defaultProps = {
  search: '',
  assets: [Object.keys(cryptoassets)]
}

export default AssetSelector
