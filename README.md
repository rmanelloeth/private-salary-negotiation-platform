# Zama Salary Negotiation Platform

A decentralized application (dApp) for private salary negotiations and job matching using Zama's Fully Homomorphic Encryption (FHE) technology. This platform enables employers and candidates to negotiate salaries with complete confidentiality, ensuring that sensitive financial information remains encrypted throughout the entire process.

## 🎯 Project Overview

This platform leverages Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine) to create a privacy-preserving job marketplace where:

- **Employers** can post job listings with encrypted salary ranges
- **Candidates** can submit applications with encrypted salary expectations
- **The system** automatically matches candidates to positions based on encrypted data without revealing individual values
- **Negotiations** are conducted entirely in encrypted form
- **No party** can see individual salary values until both parties agree

## 🏗️ Architecture

### Smart Contracts

#### 1. JobMarketplace.sol
The core marketplace contract that handles:
- Job listing creation with encrypted salary ranges
- Candidate application submission with encrypted expectations
- Automatic matching algorithm based on encrypted range intersections
- Match confirmation system

**Key Features:**
- Encrypted salary range storage (min/max)
- Automatic match detection
- Job and application lifecycle management
- Event emission for off-chain tracking

#### 2. SalaryNegotiation.sol
A dedicated contract for private salary negotiations:
- Initiates negotiations after successful matching
- Handles encrypted offer/counter-offer exchanges
- Manages acceptance workflow
- Tracks negotiation state and history

**Key Features:**
- Encrypted offer management
- Dual-party acceptance mechanism
- Negotiation state tracking
- Timestamp-based audit trail

### Frontend Application

Built with React and modern web3 technologies:
- **Wallet Integration:** MetaMask and Web3 wallet support
- **FHEVM Integration:** Client-side encryption capabilities
- **Smart Contract Interaction:** Direct contract communication via Ethers.js
- **Responsive UI:** Modern, user-friendly interface
- **Real-time Updates:** Event-driven state management

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn)
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** for testnet interactions (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/zama-salary-negotiation-platform.git
cd zama-salary-negotiation-platform
```

2. **Install dependencies:**
```bash
# Install root dependencies (Hardhat, etc.)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. **Configure environment variables:**
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your configuration:
# PRIVATE_KEY=0xyour_private_key_here
# RPC_URL=https://rpc.sepolia.org
# SEPOLIA_RPC=https://ethereum-sepolia-rpc.publicnode.com
```

4. **Configure frontend environment:**
```bash
cd frontend
cp .env.example .env

# Edit frontend/.env and add contract addresses:
# REACT_APP_JOBMARKETPLACE_ADDRESS=0x57f315E773788e087f9123ccE6515BeD9BD7520F
# REACT_APP_SALARYNEGOTIATION_ADDRESS=0x08faCE30dc5538344ae275d128D2b92fFb8a492E
cd ..
```

### Development

#### Compile Smart Contracts
```bash
npm run compile
```

#### Deploy Contracts

**To Sepolia Testnet:**
```bash
npm run deploy:sepolia
```

**To Local Hardhat Network:**
```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy contracts
npm run deploy:local
```

#### Run Frontend Development Server
```bash
npm run frontend
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
cd frontend
npm run build
```

The production build will be in `frontend/build/`

## 📋 Deployed Contracts

### Sepolia Testnet

| Contract | Address | Explorer |
|----------|---------|----------|
| JobMarketplace | `0x57f315E773788e087f9123ccE6515BeD9BD7520F` | [View on Etherscan](https://sepolia.etherscan.io/address/0x57f315E773788e087f9123ccE6515BeD9BD7520F) |
| SalaryNegotiation | `0x08faCE30dc5538344ae275d128D2b92fFb8a492E` | [View on Etherscan](https://sepolia.etherscan.io/address/0x08faCE30dc5538344ae275d128D2b92fFb8a492E) |

**Network:** Sepolia Testnet (Chain ID: 11155111)  
**Deployer:** `0x4039438f00A5996db91b8Ab359420D6f78dfdBBf`

## 🔐 Security Considerations

### Privacy & Encryption
- All salary data is encrypted before being sent to the blockchain
- Computations are performed on encrypted data using FHE
- Individual values remain hidden until mutual agreement
- Zero-knowledge proof capabilities for enhanced privacy

### Best Practices
- **Never commit `.env` files** containing private keys
- Use testnet tokens only for development
- Store private keys securely (use hardware wallets for production)
- Conduct security audits before mainnet deployment
- Review and understand all smart contract code before interaction

### Known Limitations
- Current implementation uses simplified contracts for demonstration
- Full FHE integration requires additional setup and configuration
- Gas costs may be significant for complex FHE operations
- Production deployment requires comprehensive security audit

## 🛠️ Technology Stack

### Smart Contracts
- **Solidity** ^0.8.20
- **Hardhat** ^2.19.0 - Development environment and testing framework
- **Ethers.js** ^6.8.0 - Ethereum library

### Frontend
- **React** ^18.2.0 - UI framework
- **React Router** ^6.20.0 - Client-side routing
- **Ethers.js** ^6.8.0 - Blockchain interaction
- **Create React App** - Build tooling

### Infrastructure
- **Vercel** - Frontend hosting and deployment
- **Sepolia Testnet** - Ethereum test network
- **MetaMask** - Web3 wallet integration

## 📖 Usage Guide

### For Employers

1. **Connect Wallet**
   - Click "Connect Wallet" in the navigation
   - Approve the connection request in MetaMask
   - Ensure you're connected to Sepolia Testnet

2. **Create Job Listing**
   - Navigate to "Job Marketplace"
   - Click "Create Job"
   - Fill in job details:
     - Job title
     - Description
     - Minimum salary (will be encrypted)
     - Maximum salary (will be encrypted)
   - Submit the listing

3. **Review Applications**
   - View applications for your job listings
   - System automatically matches compatible salary ranges
   - Review matched candidates

4. **Start Negotiations**
   - Initiate negotiation with matched candidates
   - Make encrypted offers
   - Accept or counter offers

### For Candidates

1. **Connect Wallet**
   - Connect your Web3 wallet to the platform
   - Ensure Sepolia Testnet is selected

2. **Browse Jobs**
   - View available job listings
   - Read job descriptions and requirements

3. **Apply for Jobs**
   - Click "Apply Now" on desired positions
   - Enter your salary expectations (encrypted):
     - Minimum expected salary
     - Maximum expected salary
   - Submit application

4. **Negotiate**
   - Receive match notifications
   - Review employer offers
   - Make counter-offers
   - Accept when terms are agreeable

## 🧪 Testing

### Run Contract Tests
```bash
npm test
```

### Test on Local Network
```bash
# Start local Hardhat node
npm run node

# In another terminal, deploy and test
npm run deploy:local
```

## 📚 Documentation

- [Zama Protocol Documentation](https://docs.zama.org/protocol)
- [FHEVM Repository](https://github.com/zama-ai/fhevm)
- [FHEVM React Template](https://github.com/0xchriswilder/fhevm-react-template)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)

## 🌐 Deployment

### Frontend Deployment (Vercel)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Environment Variables (set in Vercel Dashboard):**
- `REACT_APP_JOBMARKETPLACE_ADDRESS`
- `REACT_APP_SALARYNEGOTIATION_ADDRESS`

### Smart Contract Deployment

See deployment scripts in `scripts/deploy.js`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Solidity style guide for smart contracts
- Use ESLint for JavaScript/React code
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Zama](https://www.zama.ai/) for FHEVM technology
- [Hardhat](https://hardhat.org/) team for excellent development tools
- Ethereum community for continuous innovation

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. The current implementation uses simplified contracts without full FHE integration. For production use:

- Conduct comprehensive security audits
- Implement full FHE capabilities
- Optimize gas costs
- Add additional security measures
- Ensure regulatory compliance

**Use at your own risk. This software is provided "as is" without warranty of any kind.**

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Review existing documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- See [GITHUB_VERCEL_SETUP.md](./GITHUB_VERCEL_SETUP.md) for setup instructions

---

**Built with ❤️ using Zama FHEVM technology**
