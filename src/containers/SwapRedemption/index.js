import { connect } from 'react-redux'
import SwapRedemption from './SwapRedemption'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

export default connect(
  mapStateToProps
)(SwapRedemption)
