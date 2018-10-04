import { connect } from 'react-redux'
import SwapCompleted from './SwapCompleted'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

export default connect(
  mapStateToProps
)(SwapCompleted)
