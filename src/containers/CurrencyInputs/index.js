import { connect } from 'react-redux'
import { actions as swapActions } from '../../actions/swap'
import { actions as assetActions } from '../../actions/assets'
import CurrencyInputs from './CurrencyInputs'

const mapStateToProps = (state, ownProps) => {
  return {
    assets: state.swap.assets,
    agent: state.swap.agent,
    disabled: ownProps.disabled,
    showErrors: state.swap.showErrors,
    fiatRates: state.fiat.rates
  }
}

export default connect(
  mapStateToProps,
  {
    switchSides: swapActions.switchSides,
    onSwitchSides: swapActions.switchSides,
    onAmountChange: assetActions.changeAmount,
    onRateChange: assetActions.changeRate,
    setAsset: assetActions.setAsset
  }
)(CurrencyInputs)
