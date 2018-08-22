import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { steps, stepData } from './steps'

class SwapProgressStepper extends Component {
  render () {
    const activeStep = stepData.findIndex(step => step.id === this.props.state)
    return <Stepper activeStep={activeStep}>
      {stepData.map((step, index) => {
        return <Step key={step.id}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      })}
    </Stepper>
  }
}

SwapProgressStepper.propTypes = {
  state: PropTypes.oneOf(Object.values(steps))
}

export default SwapProgressStepper
