import { connect } from 'react-redux'
import { actions } from '../../actions/swap'
import InitiatorExpirationInfo from './InitiatorExpirationInfo'

const mapStateToProps = state => {
  return {
  }
}

export default connect(
  mapStateToProps,
  {
    refundSwap: actions.refundSwap
  }
)(InitiatorExpirationInfo)
