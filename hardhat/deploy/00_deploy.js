require("hardhat-deploy")
require("hardhat-deploy-ethers")

const lilypadEventsContractAddress = '0xdC7612fa94F098F1d7BB40E0f4F4db8fF0bC8820';
const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;
    console.log("Wallet Ethereum Address:", wallet.address)

    const documentIndexingCaller = await deploy("DocumentIndexingCaller", {
        from: wallet.address,
        args: [lilypadEventsContractAddress],
        log: true,
    });
    // documentIndexingCaller

}
