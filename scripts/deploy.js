const { ethers } = require("hardhat");

async function main() {
  const Registry = await ethers.getContractFactory("SimpleLandRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  console.log("✅ Land Registry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
