const types = {
  OPEN_ASSET_SELECTOR: 'OPEN_ASSET_SELECTOR',
  CLOSE_ASSET_SELECTOR: 'CLOSE_ASSET_SELECTOR'
}

function openAssetSelector (party) {
  return { type: types.OPEN_ASSET_SELECTOR, party }
}

function closeAssetSelector () {
  return { type: types.CLOSE_ASSET_SELECTOR }
}

const actions = {
  openAssetSelector,
  closeAssetSelector
}

export { types, actions }
