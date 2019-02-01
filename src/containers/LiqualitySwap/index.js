import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as swapActions } from '../../actions/swap'
import { actions as errorActions } from '../../actions/errors'
import LiqualitySwap from './LiqualitySwap'

const mapStateToProps = state => ({
  swap: state.swap,
  error: state.error
})

export default withRouter(connect(
  mapStateToProps,
  {
    waitForSwapConfirmation: swapActions.waitForSwapConfirmation,
    waitForSwapClaim: swapActions.waitForSwapClaim,
    clearError: errorActions.clearError
  }
)(LiqualitySwap))
