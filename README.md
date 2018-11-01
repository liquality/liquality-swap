# Liquality Swap <img align="right" src="https://raw.githubusercontent.com/liquality/chainabstractionlayer/master/liquality-logo.png" height="80px" />


[![Build Status](https://travis-ci.com/ConsenSys/liquality-atomic-swap.svg?branch=master)](https://travis-ci.com/ConsenSys/liquality-atomic-swap)
[![Standard Code Style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg)](https://github.com/standard/standard)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)
[![ChainAbstractionLayer](https://img.shields.io/npm/dt/@liquality/chainabstractionlayer.svg)](https://npmjs.com/package/@liquality/chainabstractionlayer)
[![Gitter](https://img.shields.io/gitter/room/liquality/Lobby.svg)](https://gitter.im/liquality/Lobby?source=orgpage)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/Liquality)

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
