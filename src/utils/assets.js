function getIcon (code) {
  try {
    const codeLowerCase = code.toLowerCase()
    return require(`../../src/icons/${codeLowerCase}.svg`)
  } catch (e) {
    return require('../icons/blank-asset.svg')
  }
}

export { getIcon }
