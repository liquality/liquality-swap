import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

import cryptoassets from '@liquality/cryptoassets'
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
    </div>
    <div className='Rate_errorMessage'>{ props.error && props.error }</div>
  </div>
)

Rate.propTypes = {
  title: PropTypes.string,
  value: PropTypes.instanceOf(BigNumber),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  strong: PropTypes.bool
}

Rate.defaultProps = {
  title: 'Rate',
  value: BigNumber(0),
  tabIndex: -1
}

export default Rate
