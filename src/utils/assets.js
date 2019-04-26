function getIcon (code) {
  try {
    return require(`../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`)
  } catch (e) {
    return require('../icons/blank-asset.svg')
  }
}

export { getIcon }
