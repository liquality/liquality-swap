function getIcon (code) {
  try {
    const codeLowerCase = code.toLowerCase()
    if (codeLowerCase === 'dai') return require(`../../src/icons/${codeLowerCase}.svg`)
    else return require(`../../node_modules/cryptocurrency-icons/svg/color/${codeLowerCase}.svg`)
  } catch (e) {
    return require('../icons/blank-asset.svg')
  }
}

export { getIcon }
