# Liquality Swap

Trustless swaps application

## Development

### Run locally

> U2F (`@ledgerhq/hw-transport-u2f`) requires HTTPS.

```bash
npm install
HTTPS=true npm start
```

If you get errors about missing library `chainabstractionlayer`, pull it and link it:

```bash
git clone git@github.com:ConsenSys/chainabstractionlayer.git
cd chainabstractionlayer
npm link
```

Back in the `liquality-atomic-swap` project, do `npm link chainabstractionlayer`

### Build for production

```bash
npm run build
```
