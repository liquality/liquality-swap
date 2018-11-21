import { connect } from 'react-redux'
import Waiting from './Waiting'

const mapStateToProps = state => {
  return {
    assets: state.swap.assets,
    expiration: state.swap.expiration,
    isPartyB: state.swap.isPartyB
  }
}

export default connect(
  mapStateToProps,
  {}
)(Waiting)
