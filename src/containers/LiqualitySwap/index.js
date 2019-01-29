import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../../actions/swap'
import LiqualitySwap from './LiqualitySwap'

const mapStateToProps = state => ({
  swap: state.swap
})

export default withRouter(connect(
  mapStateToProps,
  {
    waitForSwapConfirmation: actions.waitForSwapConfirmation,
    waitForSwapClaim: actions.waitForSwapClaim
  }
)(LiqualitySwap))
