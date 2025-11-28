const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const deploymentPath = path.join(__dirname, "..", "deployments.json");
  
  if (!fs.existsSync(deploymentPath)) {
    console.error("❌ deployments.json not found. Please deploy contracts first.");
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  
  console.log("🔍 Verifying contracts on", hre.network.name, "...\n");

  try {
    // Verify FHEToken
    console.log("Verifying FHEToken...");
    await hre.run("verify:verify", {
      address: deploymentInfo.contracts.FHEToken,
      constructorArguments: [],
    });
    console.log("✅ FHEToken verified");

    // Verify JobMarketplace
    console.log("\nVerifying JobMarketplace...");
    await hre.run("verify:verify", {
      address: deploymentInfo.contracts.JobMarketplace,
      constructorArguments: [],
    });
    console.log("✅ JobMarketplace verified");

    // Verify SalaryNegotiation
    console.log("\nVerifying SalaryNegotiation...");
    await hre.run("verify:verify", {
      address: deploymentInfo.contracts.SalaryNegotiation,
      constructorArguments: [],
    });
    console.log("✅ SalaryNegotiation verified");

    console.log("\n🎉 All contracts verified successfully!");
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

