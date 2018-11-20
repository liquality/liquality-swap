import { connect } from 'react-redux'
import { actions as swapActions } from '../../actions/swap'
import { actions as assetActions } from '../../actions/assets'
import CurrencyInputs from './CurrencyInputs'

const mapStateToProps = (state, ownProps) => {
  return {
    assets: state.swap.assets,
    disabled: ownProps.disabled
  }
}

export default connect(
  mapStateToProps,
  {
    onSwitchSides: swapActions.switchSides,
    onAmountChange: assetActions.changeAmount
  }
)(CurrencyInputs)
