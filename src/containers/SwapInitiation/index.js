import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import SwapInitiation from './SwapInitiation'

const mapStateToProps = state => {
  return {
    isPartyB: state.swap.isPartyB,
    wallets: state.swap.wallets,
    assets: state.swap.assets,
    counterParty: state.swap.counterParty,
    transactions: state.swap.transactions
  }
}

export default connect(
  mapStateToProps,
  {
    initiateSwap: actions.initiateSwap,
    confirmSwap: actions.confirmSwap
  }
)(SwapInitiation)
