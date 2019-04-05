const types = {
  OPEN_ASSET_SELECTOR: 'OPEN_ASSET_SELECTOR',
  CLOSE_ASSET_SELECTOR: 'CLOSE_ASSET_SELECTOR',
  SET_ASSET_SELECTOR_SEARCH: 'SET_ASSET_SELECTOR_SEARCH'
}

function openAssetSelector (party) {
  return { type: types.OPEN_ASSET_SELECTOR, party }
}

function closeAssetSelector () {
  return { type: types.CLOSE_ASSET_SELECTOR }
}

function setAssetSelectorSearch (value) {
  return { type: types.SET_ASSET_SELECTOR_SEARCH, value }
}

const actions = {
  openAssetSelector,
  closeAssetSelector,
  setAssetSelectorSearch
}

export { types, actions }
