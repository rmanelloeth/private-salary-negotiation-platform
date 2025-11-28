# Smart Contract Function Signatures

## ✅ Verified Function Signatures from Deployed Contracts

### JobMarketplace Contract
**Address:** `0x57f315E773788e087f9123ccE6515BeD9BD7520F`  
**Network:** Sepolia Testnet (Chain ID: 11155111)

#### createJob
```solidity
function createJob(
    uint32 _minSalary,
    uint32 _maxSalary,
    string calldata _jobTitle,
    string calldata _description
) public returns (uint256)
```

**ABI Signature:**
```json
{
  "inputs": [
    {"internalType": "uint32", "name": "_minSalary", "type": "uint32"},
    {"internalType": "uint32", "name": "_maxSalary", "type": "uint32"},
    {"internalType": "string", "name": "_jobTitle", "type": "string"},
    {"internalType": "string", "name": "_description", "type": "string"}
  ],
  "name": "createJob",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Function Selector:** `0x2042ba3a`  
**Parameters:**
- `_minSalary`: `uint32` - Minimum salary (plain number, NOT wei)
- `_maxSalary`: `uint32` - Maximum salary (plain number, NOT wei)
- `_jobTitle`: `string` - Job title as string
- `_description`: `string` - Job description as string

**Usage Example:**
```javascript
const tx = await contract.createJob(
  50000,              // minSalary: uint32
  100000,             // maxSalary: uint32
  "Senior Developer", // jobTitle: string
  "We are looking..." // description: string
);
```

#### applyForJob
```solidity
function applyForJob(
    uint256 _jobId,
    uint32 _minExpected,
    uint32 _maxExpected
) public returns (uint256)
```

**ABI Signature:**
```json
{
  "inputs": [
    {"internalType": "uint256", "name": "_jobId", "type": "uint256"},
    {"internalType": "uint32", "name": "_minExpected", "type": "uint32"},
    {"internalType": "uint32", "name": "_maxExpected", "type": "uint32"}
  ],
  "name": "applyForJob",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Function Selector:** `0x8e15f473`  
**Parameters:**
- `_jobId`: `uint256` - Job ID (number)
- `_minExpected`: `uint32` - Minimum expected salary (plain number)
- `_maxExpected`: `uint32` - Maximum expected salary (plain number)

**Usage Example:**
```javascript
const tx = await contract.applyForJob(
  0,      // jobId: uint256
  60000,  // minExpected: uint32
  90000   // maxExpected: uint32
);
```

#### getJob
```solidity
function getJob(uint256 _jobId) public view returns (
    address employer,
    uint32 minSalary,
    uint32 maxSalary,
    string memory jobTitle,
    string memory description,
    bool isActive,
    uint256 createdAt
)
```

**Usage Example:**
```javascript
const jobData = await contract.getJob(0);
// Returns: { employer, minSalary, maxSalary, jobTitle, description, isActive, createdAt }
```

#### jobCounter
```solidity
function jobCounter() public view returns (uint256)
```

**Usage Example:**
```javascript
const count = await contract.jobCounter();
// Returns: BigNumber, convert with parseInt(count.toString())
```

---

### SalaryNegotiation Contract
**Address:** `0x08faCE30dc5538344ae275d128D2b92fFb8a492E`  
**Network:** Sepolia Testnet (Chain ID: 11155111)

#### startNegotiation
```solidity
function startNegotiation(
    address _candidate,
    uint256 _jobId,
    uint32 _initialOffer
) public returns (uint256)
```

**ABI Signature:**
```json
{
  "inputs": [
    {"internalType": "address", "name": "_candidate", "type": "address"},
    {"internalType": "uint256", "name": "_jobId", "type": "uint256"},
    {"internalType": "uint32", "name": "_initialOffer", "type": "uint32"}
  ],
  "name": "startNegotiation",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "nonpayable",
  "type": "function"
}
```

**Parameters:**
- `_candidate`: `address` - Candidate's wallet address
- `_jobId`: `uint256` - Job ID
- `_initialOffer`: `uint32` - Initial offer amount (plain number)

#### acceptOffer
```solidity
function acceptOffer(uint256 _negotiationId) public
```

**Parameters:**
- `_negotiationId`: `uint256` - Negotiation ID

#### getNegotiation
```solidity
function getNegotiation(uint256 _negotiationId) public view returns (
    address employer,
    address candidate,
    uint256 jobId,
    uint32 employerOffer,
    uint32 candidateCounter,
    bool employerAccepted,
    bool candidateAccepted,
    bool isActive,
    uint256 createdAt,
    uint256 lastUpdated
)
```

#### getUserNegotiations
```solidity
function getUserNegotiations(address _user) public view returns (uint256[] memory)
```

---

## 🔑 Key Points for v0

1. **Salary values are `uint32` - plain numbers, NOT wei**
   - Example: `50000` means 50,000 (not 50000 wei)
   - No conversion needed

2. **Title and description are `string` type**
   - Not `bytes32` or `bytes`
   - Pass as regular JavaScript strings

3. **All function signatures match the deployed contracts**
   - ABI files are extracted from compiled artifacts
   - Function selectors are correct

4. **Network: Sepolia Testnet (Chain ID: 11155111)**
   - Contracts are deployed on Sepolia
   - Must connect to Sepolia to interact

5. **Contract addresses:**
   - JobMarketplace: `0x57f315E773788e087f9123ccE6515BeD9BD7520F`
   - SalaryNegotiation: `0x08faCE30dc5538344ae275d128D2b92fFb8a492E`

---

## ✅ Verified ABI Files

The ABI files in `frontend/src/contracts/` are now extracted directly from the compiled contract artifacts and match the deployed contracts exactly.

