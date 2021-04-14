import React, {Component} from "react";
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'

class TopProgressBar extends Component {
    constructor (props) {
        super(props)
        this.state = this.getExpirationState()
      }
    
      getTransaction (party) {
        const tx = this.props.transactions[party].initiation
        if (!tx.hash) return null
    
        const asset = this.props.assets[party].currency
        const explorerLink = tx && getExplorerLink(tx, asset)
        tx.explorerLink = explorerLink
        return tx
      }
    
      getExpirationState () {
        const party = this.props.isPartyB ? 'b' : 'a'
        const expiration = this.props.isClaim ? getClaimExpiration(this.props.expiration, party) : getFundExpiration(this.props.expiration, party)
    
        return {
          start: expiration.start,
          duration: expiration.duration,
          expiration: expiration.time,
          now: moment(),
          transactions: {
            a: this.getTransaction('a'),
            b: this.getTransaction('b')
          }
        }
      }
    
      componentDidMount () {
        this.interval = setInterval(this.tick.bind(this), 1000)
      }
    
      componentWillUnmount () {
        clearInterval(this.interval)
      }
    
      tick () {
        this.setState(this.getExpirationState())
      }
  
    render () {
        // const maxNow = this.state.now.isAfter(this.state.expiration) ? this.state.expiration : this.state.now
        // const left = moment.duration(this.state.expiration.diff(maxNow))
        // const passed = moment.duration(maxNow.diff(this.state.start))
        // const total = this.state.duration
    
        // const filled = (((total.asSeconds() - left.asSeconds()) / total.asSeconds()) * 100).toFixed(2)

      return <div className='TopProgressBar_progress'>
      {/* <div className='TopProgressBar_progress_fill' style={{width: `${filled}%`}} /> */}
    </div>
    }
  }
  
  TopProgressBar.propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    expiration: PropTypes.number,
  
  }
  
  export default TopProgressBar
  