import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",

  networks: {
    hardhat: {
      forking: {
        enabled: true,
        //@ts-ignore
        url: process.env.MAINNET_RPC
      }
    },
    goerli: {
      url: process.env.GOERLI_RPC,
      //@ts-ignore
      accounts: [process.env.PRIVATE_KEY1]
    },
  },
  etherscan: {
    //@ts-ignore
    api_key: process.env.ETHERSCAN_API
  }
};

export default config;
