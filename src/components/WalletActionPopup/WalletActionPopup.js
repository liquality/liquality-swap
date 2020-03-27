import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import InfoIcon from '../../icons/info.svg'

import { Stepper, Step, StepLabel } from '@material-ui/core'

import './WalletActionPopup.css'

class WalletActionPopup extends Component {
  render () {
    const activeStepIndex = this.props.steps.findIndex(step => step.id === this.props.activeStep)
    const activeStep = this.props.steps[activeStepIndex]
    return (
      <div>
        <Modal open={this.props.open}>
          <div className='WalletActionPopup'>
            <div className='WalletActionPopup_body'>
              {activeStep.type && <span className='WalletActionPopup_type'>{activeStep.type}</span>}
              <h1>{activeStep.title}</h1>
              { this.props.steps.length > 1 ? <Stepper connector={null} nonLinear activeStep={activeStepIndex} className='WalletActionPopup_stepper'
                classes={{root: 'WalletActionPopup_stepper_root'}}>
                {this.props.steps.map((step, index) => {
                  const stepIconProps = {
                    classes: {
                      root: 'WalletActionPopup_stepper_icon',
                      text: 'WalletActionPopup_stepper_icon_text',
                      active: 'WalletActionPopup_stepper_icon_active'
                    }
                  }
                  return <Step key={step.id}>
                    <StepLabel classes={{
                      root: 'WalletActionPopup_stepper_label',
                      active: 'WalletActionPopup_stepper_label_active',
                      completed: 'WalletActionPopup_stepper_label_completed'
                    }} StepIconProps={stepIconProps}>{step.label}</StepLabel>
                  </Step>
                })}
              </Stepper> : <div className='WalletActionPopup_step'>{activeStep.label}</div> }
              <div className='WalletActionPopup_instructions'>
                <p className='WalletActionPopup_instructions_description'>{activeStep.description}</p>
                {activeStep.info && <p className='WalletActionPopup_instructions_info'><img src={InfoIcon} alt='info' /> {activeStep.info}</p>}
                {activeStep.image && <img className='WalletActionPopup_instructions_image' src={activeStep.image} alt={activeStep.description} />}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

WalletActionPopup.propTypes = {
  open: PropTypes.bool,
  steps: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.any
  }),
  activeStep: PropTypes.string
}

WalletActionPopup.defaultProps = {
  open: false
}

export default WalletActionPopup
