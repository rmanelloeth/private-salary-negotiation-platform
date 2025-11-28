# Smart Contract ABIs

This directory contains the ABI (Application Binary Interface) files for the smart contracts.

## Contracts

### JobMarketplace
- **Address:** `0x57f315E773788e087f9123ccE6515BeD9BD7520F`
- **Network:** Sepolia Testnet (Chain ID: 11155111)
- **ABI File:** `JobMarketplaceABI.json`

### SalaryNegotiation
- **Address:** `0x08faCE30dc5538344ae275d128D2b92fFb8a492E`
- **Network:** Sepolia Testnet (Chain ID: 11155111)
- **ABI File:** `SalaryNegotiationABI.json`

## Usage

```javascript
import JobMarketplaceABI from './contracts/JobMarketplaceABI.json';
import { ethers } from 'ethers';

const contract = new ethers.Contract(
  contractAddress,
  JobMarketplaceABI,
  signer
);
```

