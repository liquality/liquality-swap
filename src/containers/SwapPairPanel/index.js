import { connect } from 'react-redux'
import { actions as swapActions } from '../../actions/swap'
import SwapPairPanel from './SwapPairPanel'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {
    onSwitchSides: swapActions.switchSides
  }
)(SwapPairPanel)
