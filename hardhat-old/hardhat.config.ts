import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY env variable is not set")
}
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    calibration: {
        chainId: 314159,
        url: "https://filecoin-calibration.chainup.net/rpc/v1",
        accounts: [process.env.PRIVATE_KEY]
    }
  },
  // etherscan: {
  //
  // }
};

export default config;
