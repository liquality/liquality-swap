const steps = Object.freeze({
  INITIATION: 'initiation',
  AGREEMENT: 'agreement',
  CLAIMING: 'claiming',
  SETTLED: 'settled'
})

const stepData = [
  { id: steps.INITIATION, label: 'Swap initiation' },
  { id: steps.AGREEMENT, label: 'Counterparties agree' },
  { id: steps.CLAIMING, label: 'Claiming' },
  { id: steps.SETTLED, label: 'Settlement' }
]

export { steps, stepData }
