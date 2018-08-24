import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LiqualitySwap from './LiqualitySwap'

const mapStateToProps = state => ({
  swap: state.swap
})

export default withRouter(connect(
  mapStateToProps
)(LiqualitySwap))
