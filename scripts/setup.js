const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🔧 Setting up Private Salary Negotiation Platform\n');

  // Check if .env exists
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');

  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    
    const privateKey = await question('Enter your private key (without 0x): ');
    const rpcUrl = await question('Enter RPC URL (default: https://api.testnet.fhenix.zone): ') || 'https://api.testnet.fhenix.zone';

    const envContent = `PRIVATE_KEY=${privateKey.startsWith('0x') ? privateKey : '0x' + privateKey}
RPC_URL=${rpcUrl}
FHETOKEN_ADDRESS=
JOBMARKETPLACE_ADDRESS=
SALARYNEGOTIATION_ADDRESS=
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created\n');
  } else {
    console.log('✅ .env file already exists\n');
  }

  // Create frontend .env if needed
  const frontendEnvPath = path.join(__dirname, '..', 'frontend', '.env');
  if (!fs.existsSync(frontendEnvPath)) {
    console.log('📝 Creating frontend/.env file...');
    const frontendEnvContent = `REACT_APP_JOBMARKETPLACE_ADDRESS=
REACT_APP_SALARYNEGOTIATION_ADDRESS=
REACT_APP_FHETOKEN_ADDRESS=
`;
    fs.writeFileSync(frontendEnvPath, frontendEnvContent);
    console.log('✅ frontend/.env file created\n');
  }

  console.log('🎉 Setup completed!');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run compile');
  console.log('3. Run: npm run deploy');
  console.log('4. Update frontend/.env with deployed contract addresses');
  console.log('5. Run: npm run frontend');

  rl.close();
}

setup().catch(console.error);

