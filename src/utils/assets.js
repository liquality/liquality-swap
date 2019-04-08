function getIcon (code) {
  return require(`../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`)
}

export { getIcon }
