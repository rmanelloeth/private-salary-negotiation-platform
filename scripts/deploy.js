const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const networkInfo = await hre.ethers.provider.getNetwork();
  console.log(`🚀 Starting deployment to ${hre.network.name} network (Chain ID: ${Number(networkInfo.chainId)})...\n`);

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString(), "\n");

  // Deploy JobMarketplaceSimple
  console.log("📦 Deploying JobMarketplaceSimple...");
  const JobMarketplaceSimple = await hre.ethers.getContractFactory("JobMarketplaceSimple");
  const jobMarketplace = await JobMarketplaceSimple.deploy();
  await jobMarketplace.waitForDeployment();
  const jobMarketplaceAddress = await jobMarketplace.getAddress();
  console.log("✅ JobMarketplaceSimple deployed to:", jobMarketplaceAddress);

  // Deploy SalaryNegotiationSimple
  console.log("\n📦 Deploying SalaryNegotiationSimple...");
  const SalaryNegotiationSimple = await hre.ethers.getContractFactory("SalaryNegotiationSimple");
  const salaryNegotiation = await SalaryNegotiationSimple.deploy();
  await salaryNegotiation.waitForDeployment();
  const salaryNegotiationAddress = await salaryNegotiation.getAddress();
  console.log("✅ SalaryNegotiationSimple deployed to:", salaryNegotiationAddress);

  // Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    chainId: Number(networkInfo.chainId),
    deployer: deployer.address,
    contracts: {
      JobMarketplace: jobMarketplaceAddress,
      SalaryNegotiation: salaryNegotiationAddress,
    },
    timestamp: new Date().toISOString(),
  };

  const deploymentPath = path.join(__dirname, "..", "deployments.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n💾 Deployment info saved to:", deploymentPath);

  // Update .env file if it exists
  const envPath = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, "utf8");
    
    if (!envContent.includes("JOBMARKETPLACE_ADDRESS")) {
      envContent += `\nJOBMARKETPLACE_ADDRESS=${jobMarketplaceAddress}`;
    } else {
      envContent = envContent.replace(/JOBMARKETPLACE_ADDRESS=.*/g, `JOBMARKETPLACE_ADDRESS=${jobMarketplaceAddress}`);
    }
    
    if (!envContent.includes("SALARYNEGOTIATION_ADDRESS")) {
      envContent += `\nSALARYNEGOTIATION_ADDRESS=${salaryNegotiationAddress}`;
    } else {
      envContent = envContent.replace(/SALARYNEGOTIATION_ADDRESS=.*/g, `SALARYNEGOTIATION_ADDRESS=${salaryNegotiationAddress}`);
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file updated with contract addresses");
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("   JobMarketplace:", jobMarketplaceAddress);
  console.log("   SalaryNegotiation:", salaryNegotiationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

