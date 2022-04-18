require("@nomiclabs/hardhat-ethers");
const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/adapter.sol/Adapter.json");

task("addLiquidityTokens", "Add LiquidityTokens")
  .addParam("token1" , "token1 addr")
  .addParam("token2" , "token2 addr")
  .addParam("token1Amount" , "token1 amount")
  .setAction(async (taskArgs) => {
    const RINKEBY_URL = process.env.RINKEBY_URL;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const API_KEY = process.env.API_KEY;
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;  

    const infuraProvider = new ethers.providers.InfuraProvider(network = "rinkeby", API_KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, infuraProvider);
    const AdapterContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
    const tx = await AdapterContract.swap(
        taskArgs.token1,
        taskArgs.token2,
        taskArgs.token1Amount
    );
    
    console.log(tx);
  });

module.exports = {};