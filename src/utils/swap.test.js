/* eslint-env jest */
import { getEthSwapCreationData } from './swap'

test('generates correct bytecode', () => {
  const data = getEthSwapCreationData('0x5acbf79d0cf4139a6c3eca85b41ce2bd23ced04f',
    '0x0a81e8be41b21f651a71aab1a85c6813b8bbccf8',
    '0x91d6a24697ed31932537ae598d3de3131e1fcd0641b9ac4be7afcb376386d71e',
    255)
  expect(data).toBe('607180600b6000396000f36020806000803760218160008060026048f17f91d6a24697ed31932537ae598d3de3131e1fcd0641b9ac4be7afcb376386d71e602151141660435760ff4211605a57005b735acbf79d0cf4139a6c3eca85b41ce2bd23ced04fff5b730a81e8be41b21f651a71aab1a85c6813b8bbccf8ff')
})

test('generates correct bytecode different expiration length', () => {
  const data = getEthSwapCreationData('0x5acbf79d0cf4139a6c3eca85b41ce2bd23ced04f',
    '0x0a81e8be41b21f651a71aab1a85c6813b8bbccf8',
    '0x91d6a24697ed31932537ae598d3de3131e1fcd0641b9ac4be7afcb376386d71e',
    6016519)
  expect(data).toBe('607380600b6000396000f36020806000803760218160008060026048f17f91d6a24697ed31932537ae598d3de3131e1fcd0641b9ac4be7afcb376386d71e6021511416604557625bce074211605c57005b735acbf79d0cf4139a6c3eca85b41ce2bd23ced04fff5b730a81e8be41b21f651a71aab1a85c6813b8bbccf8ff')
})
