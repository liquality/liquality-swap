import { connect } from 'react-redux'
import SwapOfferConfirmation from './SwapOfferConfirmation'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    quote: state.swap.agent.quote
  }
}

export default connect(
  mapStateToProps,
  {
  }
)(SwapOfferConfirmation)
