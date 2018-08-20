import { connect } from 'react-redux'
import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets,
    counterParty: state.swap.counterParty
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwapInitiation)
