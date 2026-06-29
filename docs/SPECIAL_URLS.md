# Special URL Schemes

The Burner Wallet supports several special URL schemes that allow users and external applications to navigate directly to specific features. This document standardizes and documents all known URL patterns.

## Base URL

All URLs are relative to the wallet's base path. In development this is typically `http://localhost:3000`, and in production the deployed domain.

## URL Patterns

### Wallet Management

| URL | Purpose | Parameters |
|-----|---------|------------|
| `/` | Wallet home / dashboard | — |
| `/receive` | Show wallet address for receiving funds | — |
| `/send` | Send funds to an address | `?to=<address>` (optional) — pre-fill recipient |
| `/wallet` | Wallet detail view | — |

### Key Management

| URL | Purpose | Parameters |
|-----|---------|------------|
| `/pk` | Load a wallet by private key | `?key=<private-key-hex>` |
| `/pk#<private-key>` | Alternative private key route using hash fragment | `#<private-key-hex>` |
| `/burner` | Generate a new ephemeral (burner) wallet | — |

### Transaction Flow

| URL | Purpose | Parameters |
|-----|---------|------------|
| `/send/to/<address>` | Send funds to a specific address | Address in URL path |
| `/send/to/<address>/<amount>` | Send a specific amount to an address | Address and amount in path |
| `/tx/<hash>` | View transaction details | Transaction hash in path |

### QR Code Scanning

| URL | Purpose | Parameters |
|-----|---------|------------|
| `/scan` | Open QR code scanner | — |

### Vendor Integrations

| URL | Purpose | Parameters |
|-----|---------|------------|
| `/wyre` | Open Wyre fiat on-ramp widget | — |

### Exchange

| URL | Purpose | Parameters |
|-----|---------|------------|
| `/exchange` | Open the token exchange interface | — |

## Usage Examples

\`\`\`bash
# Load wallet with specific private key
http://localhost:3000/pk?key=0x1234abcd...

# Open send page pre-filled with recipient
http://localhost:3000/send?to=0x5678efgh...

# Send exact amount
http://localhost:3000/send/to/0xdeadbeef/0.5

# View a transaction
http://localhost:3000/tx/0xabcdef1234567890
\`\`\`

## Notes

- All addresses should be hex-encoded and `0x`-prefixed.
- Amounts (where applicable) are in the native token unit (xDai on the xDai chain, Ether on mainnet).
- The `/burner` route generates a new keypair in-memory; funds on burner wallets should be transferred out before closing the browser.
