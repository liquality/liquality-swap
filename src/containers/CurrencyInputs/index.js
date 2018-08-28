import { connect } from 'react-redux'
import { actions as swapActions } from '../../actions/swap'
import { actions as assetActions } from '../../actions/assets'
import CurrencyInputs from './CurrencyInputs'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {
    onSwitchSides: swapActions.switchSides,
    onAmountChange: assetActions.changeAmount
  }
)(CurrencyInputs)
