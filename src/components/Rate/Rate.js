import React from 'react'
import PropTypes from 'prop-types'

import currencies from '../../utils/currencies'
import './Rate.css'

const Rate = (props) => (
  <div className='Rate'>
    <h5 className='Rate_heading'>Rate</h5>
    <h5 className='Rate_stable'><strong>1 {props.currencyB.toUpperCase()}</strong></h5>
    <h4 className='Rate_equal'>=</h4>
    <h6>
      <input type='number' readOnly={props.disabled} value={props.value} className='Rate_input' placeholder='0.0000' onChange={e => props.onChange(e.target.value)} />
      {props.currencyA.toUpperCase()}
    </h6>
  </div>
)

Rate.propTypes = {
  // TODO: probably need some sort of repository for currency codes and icons?
  // currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

Rate.defaultProps = {
  value: 0
}

export default Rate
