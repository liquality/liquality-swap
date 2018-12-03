import { connect } from 'react-redux'
import ExpirationDetails from './ExpirationDetails'

const mapStateToProps = (state, ownProps) => {
  return {
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB,
    assets: state.swap.assets,
    transactions: state.swap.transactions,
    link: state.swap.link,
    step: state.swap.step,
    ...ownProps
  }
}

export default connect(
  mapStateToProps,
  {
  }
)(ExpirationDetails)
