import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

import { assets as cryptoassets } from '@liquality/cryptoassets'
import './Rate.css'

const Rate = (props) => (
  <div className={classNames('Rate', { error: props.error, strong: props.strong })}>
    <div className='Rate_circle'>
      <h5 className='Rate_heading'>{ props.title }</h5>
      <h5 className='Rate_stable'>1 {cryptoassets[props.currencyA].code}</h5>
      <h4 className='Rate_equal'>=</h4>
      <h6 className='Rate_amount'>
        {props.disabled
          ? props.value.toFixed()
          : <input tabIndex={props.tabIndex} type='number' value={props.value.toFixed()} className='Rate_input' placeholder='0.0000' onChange={e => props.onChange(BigNumber(e.target.value))} />}
        &nbsp;{cryptoassets[props.currencyB].code}
      </h6>
      {props.timer && <h6>
        Quote refreshes in {props.timer.current}s
      </h6>}
    </div>
    <div className='Rate_errorMessage'>{ props.error && props.error }</div>
    { props.timer && <svg width='300' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg' className='Rate_timer'>
      <g transform='translate(110,110)'>
        <g transform='rotate(-90)'>
          <circle r='100' className='Rate_timer_progress' style={{
            animation: props.timer.current === props.timer.duration ? 'none' : `countdown ${props.timer.duration - 1}s linear 1 forwards`
          }} />
          <g className='Rate_timer_pointer'>
            <circle cx='100' cy='0' r='6' className='Rate_timer_pointer_c' style={{
              animation: props.timer.current === props.timer.duration ? 'none' : `pointer ${props.timer.duration - 1}s linear 1 forwards`
            }} />
          </g>
        </g>
      </g>
    </svg> }
  </div>
)

Rate.propTypes = {
  title: PropTypes.string,
  value: PropTypes.instanceOf(BigNumber),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  strong: PropTypes.bool,
  timer: PropTypes.shape({
    current: PropTypes.number,
    duration: PropTypes.number
  })
}

Rate.defaultProps = {
  title: 'Rate',
  value: BigNumber(0),
  tabIndex: -1
}

export default Rate
