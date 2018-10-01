import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../../actions/swap'
import { actions as stepActions } from '../../actions/step'
import LiqualitySwap from './LiqualitySwap'

const mapStateToProps = state => ({
  swap: state.swap
})

export default withRouter(connect(
  mapStateToProps,
  {
    waitForSwapConfirmation: actions.waitForSwapConfirmation,
    waitForSwapRedemption: actions.waitForSwapRedemption,
    setStep: stepActions.setStep
  }
)(LiqualitySwap))