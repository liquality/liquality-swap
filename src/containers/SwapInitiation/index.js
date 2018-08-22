import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    wallets: state.swap.wallets,
    counterParty: state.swap.counterParty
  }
}

export default connect(
  mapStateToProps,
  {
    initiateSwap: actions.initiateSwap
  }
)(SwapInitiation)
