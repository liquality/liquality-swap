import { connect } from 'react-redux'
import SwapOfferConfirmation from './SwapOfferConfirmation'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets
  }
}

export default connect(
  mapStateToProps,
  {
  }
)(SwapOfferConfirmation)
