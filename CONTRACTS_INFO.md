# Smart Contracts Information

## 📋 Deployed Contracts (Sepolia Testnet)

### JobMarketplace Contract
- **Address:** `0x57f315E773788e087f9123ccE6515BeD9BD7520F`
- **Network:** Sepolia Testnet
- **Chain ID:** 11155111
- **Explorer:** https://sepolia.etherscan.io/address/0x57f315E773788e087f9123ccE6515BeD9BD7520F
- **ABI Location:** `frontend/src/contracts/JobMarketplaceABI.json`

**Main Functions:**
- `createJob(uint32 _minSalary, uint32 _maxSalary, string _jobTitle, string _description)` - Create a new job listing
- `applyForJob(uint256 _jobId, uint32 _minExpected, uint32 _maxExpected)` - Apply for a job
- `getJob(uint256 _jobId)` - Get job details
- `getEmployerJobs(address _employer)` - Get all jobs by employer
- `getCandidateApplications(address _candidate)` - Get all applications by candidate
- `confirmMatch(uint256 _jobId, uint256 _applicationId)` - Confirm a match
- `jobCounter()` - Get total number of jobs

### SalaryNegotiation Contract
- **Address:** `0x08faCE30dc5538344ae275d128D2b92fFb8a492E`
- **Network:** Sepolia Testnet
- **Chain ID:** 11155111
- **Explorer:** https://sepolia.etherscan.io/address/0x08faCE30dc5538344ae275d128D2b92fFb8a492E
- **ABI Location:** `frontend/src/contracts/SalaryNegotiationABI.json`

**Main Functions:**
- `startNegotiation(address _candidate, uint256 _jobId, uint32 _initialOffer)` - Start a negotiation
- `acceptOffer(uint256 _negotiationId)` - Accept an offer
- `updateEmployerOffer(uint256 _negotiationId, uint32 _newOffer)` - Update employer offer
- `updateCandidateCounter(uint256 _negotiationId, uint32 _newCounter)` - Update candidate counter
- `getNegotiation(uint256 _negotiationId)` - Get negotiation details
- `getUserNegotiations(address _user)` - Get all negotiations for a user

## 🔗 Network Information

- **Network Name:** Sepolia Testnet
- **Chain ID:** 11155111
- **RPC URL:** https://rpc.sepolia.org
- **Block Explorer:** https://sepolia.etherscan.io
- **Faucet:** https://sepoliafaucet.com/

## 🔐 Environment Variables

For Vercel deployment, set these environment variables:

```
REACT_APP_JOBMARKETPLACE_ADDRESS=0x57f315E773788e087f9123ccE6515BeD9BD7520F
REACT_APP_SALARYNEGOTIATION_ADDRESS=0x08faCE30dc5538344ae275d128D2b92fFb8a492E
```

## 📝 Contract Deployment Info

- **Deployer:** `0x4039438f00A5996db91b8Ab359420D6f78dfdBBf`
- **Deployment Date:** 2025-11-28T15:07:25.849Z
- **Deployment Transaction:** Check on Etherscan

## 🧪 Testing

To interact with contracts:
1. Connect MetaMask to Sepolia Testnet
2. Get test ETH from faucet
3. Use the dApp interface to interact with contracts

