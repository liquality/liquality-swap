# Liquality Swap

Trustless swaps application

## Development

### Run locally

> U2F (`@ledgerhq/hw-transport-u2f`) requires HTTPS.

```bash
npm install
HTTPS=true npm start
```

If you get errors about missing libraries `liquality-ui` or `chainabstractionlayer`, pull these and link them:

```bash
git clone git@github.com:ConsenSys/chainabstractionlayer.git
cd chainabstractionlayer
npm link
```

```bash
git clone git@github.com:ConsenSys/liquality-ui.git
cd liquality-ui
npm link
```

Back in the `liquality-atomic-swap` project, do `npm link liquality-ui chainabstractionlayer`

### Build for production

```bash
npm run build
```
