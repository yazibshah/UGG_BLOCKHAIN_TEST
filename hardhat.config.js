require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY="";
module.exports = {
  solidity: "0.8.24",
  networks: {
    BSC_Testnet: {
      url: `https://bsc-testnet-dataseed.bnbchain.org`,
      accounts: [PRIVATE_KEY],
    },
  },
};
