const steps = Object.freeze({
  INITIATION: 'initiation',
  AGREEMENT: 'agreement',
  CLAIMING: 'claiming',
  SETTLED: 'settled'
})

const stepData = [
  { id: steps.INITIATION, label: 'Swap Initiation' },
  { id: steps.AGREEMENT, label: 'Confirming Transaction' },
  { id: steps.CLAIMING, label: 'Claiming' },
  { id: steps.SETTLED, label: 'Settlement' }
]

export { steps, stepData }
