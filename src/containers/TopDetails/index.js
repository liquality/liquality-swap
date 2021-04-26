import { connect } from 'react-redux'
import TopDetails from './TopDetails'

const mapStateToProps = (state, ownProps) => {
  return {
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB,
    assets: state.swap.assets,
    transactions: state.swap.transactions,
    link: state.swap.link,
    step: state.swap.step,
    quote: state.swap.agent.quote,
    ...ownProps
  }
}

export default connect(
  mapStateToProps,
  {
  }
)(TopDetails)
