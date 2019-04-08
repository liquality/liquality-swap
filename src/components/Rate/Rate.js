import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import cryptoassets from '@liquality/cryptoassets'
import './Rate.css'

const Rate = (props) => (
  <div className={classNames('Rate', { error: props.error })}>
    <div className='Rate_circle'>
      <h5 className='Rate_heading'>Rate</h5>
      <h5 className='Rate_stable'><strong>1 {cryptoassets[props.currencyA].code}</strong></h5>
      <h4 className='Rate_equal'>=</h4>
      <h6>
        <input tabIndex={props.tabIndex} type='number' readOnly={props.disabled} value={props.value} className='Rate_input' placeholder='0.0000' onChange={e => props.onChange(e.target.value)} />
        {cryptoassets[props.currencyB].code}
      </h6>
    </div>
    <div className='Rate_errorMessage'>{ props.error && props.error }</div>
  </div>
)

Rate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  error: PropTypes.string
}

Rate.defaultProps = {
  value: 0,
  tabIndex: -1
}

export default Rate
