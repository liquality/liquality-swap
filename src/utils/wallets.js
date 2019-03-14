import metamask from '../icons/metamask.svg'
import ledger from '../icons/ledger.svg'

const wallets = {
  'metamask': {
    icon: metamask,
    name: 'MetaMask',
    connection: {
      title: 'Login to MetaMask'
    }
  },
  'ledger': {
    icon: ledger,
    name: 'Ledger',
    connection: {
      title: 'On your ledger',
      description: 'Navigate to your Bitcoin account. Follow Ledger instructions to connect Bitcoin wallet'
    }
  }
}

export default wallets
