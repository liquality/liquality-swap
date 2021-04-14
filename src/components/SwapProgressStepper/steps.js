const steps = Object.freeze({
  INITIATION: 'initiation',
  AGREEMENT: 'agreement',
  CLAIMING: 'claiming',
  SETTLED: 'settled'
})

const stepData = [
  { id: steps.INITIATION, label: 'Swap Initiation' },
  { id: steps.AGREEMENT, label: 'Confirming Transactions' },
  { id: steps.CLAIMING, label: 'Claiming' },
  { id: steps.SETTLED, label: 'Swap Settlement' }
]

export { steps, stepData }
