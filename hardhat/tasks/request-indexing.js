task("request-indexing", "")
  .setAction(async (taskArgs) => {
    const {address} = await hre.deployments.get("DocumentIndexingCaller")

    const DEPLOYER_PRIVATE_KEY = network.config.accounts[0]
    const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
    const wallet = new ethers.Wallet(deployer)
    const documentIndexingCaller = await ethers.getContractAt("DocumentIndexingCaller", address)
    documentIndexingCaller.connect(wallet)
    const tx = await documentIndexingCaller.requestIndexing({value: ethers.utils.parseEther('0.1')})
    const receipt = await tx.wait()
    console.log(`DocumentIndexingCaller.requestIndexing() transaction hash: ${receipt.transactionHash}`)
})