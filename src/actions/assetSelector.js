const types = {
  TOGGLE_ASSET_SELECTOR: 'TOGGLE_ASSET_SELECTOR'
}

function toggleAssetSelector (party) {
  return { type: types.TOGGLE_ASSET_SELECTOR, party }
}

const actions = {
  toggleAssetSelector
}

export { types, actions }
