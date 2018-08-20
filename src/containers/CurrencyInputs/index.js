import { connect } from 'react-redux'
import actions from '../../actions'
import CurrencyInputs from './CurrencyInputs'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchSides: () => dispatch({ type: actions.SWITCH_SIDES }),
    onAmountChange: (party, newValue) => dispatch({ type: actions.CHANGE_AMOUNT, party, newValue })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyInputs)
