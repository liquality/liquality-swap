import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core'
import { steps, stepData } from './steps'

import CompletedIcon from '../../icons/completed.svg'
import './SwapProgressStepper.css'

class SwapProgressStepper extends Component {
  render () {
    const activeStep = stepData.findIndex(step => step.id === this.props.state)
    const connector = (
      <StepConnector
        classes={{
          active: 'SwapProgressStepper_connector_active',
          completed: 'SwapProgressStepper_connector_completed',
          line: 'SwapProgressStepper_connector_line',
          root: 'SwapProgressStepper_connector'
        }}
      />)
    return <Stepper connector={connector} activeStep={activeStep} alternativeLabel className='SwapProgressStepper'>
      {stepData.map((step, index) => {
        const stepIconProps = {
          classes: {
            root: 'SwapProgressStepper_icon',
            text: 'SwapProgressStepper_icon_text',
            active: 'SwapProgressStepper_icon_active',
            completed: 'SwapProgressStepper_icon_completed'
          }
        }
        if (index < activeStep) {
          stepIconProps.icon = <img src={CompletedIcon} />
        }
        return <Step key={step.id}>
          <StepLabel classes={{
            label: 'SwapProgressStepper_label',
            alternativeLabel: 'SwapProgressStepper_alternativeLabel',
            active: 'SwapProgressStepper_label_active',
            completed: 'SwapProgressStepper_label_completed'
          }} StepIconProps={stepIconProps}>{step.label}</StepLabel>
        </Step>
      })}
    </Stepper>
  }
}

SwapProgressStepper.propTypes = {
  state: PropTypes.oneOf(Object.values(steps))
}

export default SwapProgressStepper
