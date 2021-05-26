import { connect } from 'react-redux'
import BackupLinkCard from './BackupLinkCard'

const mapStateToProps = (state) => {
  return {
    step: state.swap.step,
    quote: state.swap.agent.quote,
    assets: state.swap.assets,
    transactions: state.swap.transactions
  }
}

export default connect(
  mapStateToProps,
  {}
)(BackupLinkCard)
