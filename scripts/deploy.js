
const hre = require("hardhat");

async function main() {

  const Adapter = await hre.ethers.getContractFactory("Adapter");
  const adapter = await Adapter.deploy();

  await adapter.deployed();

  console.log("Adapter deployed to:", adapter.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
