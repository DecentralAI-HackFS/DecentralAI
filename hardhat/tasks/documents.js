task("documents", "")
  .setAction(async (taskArgs) => {
    const {address} = await hre.deployments.get("DocumentIndexingCaller")
    console.log(`DocumentIndexingCaller address: ${address}`)
    const DEPLOYER_PRIVATE_KEY = network.config.accounts[0]
    const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
    const wallet = new ethers.Wallet(deployer)
    const documentIndexingCaller = await ethers.getContractAt("DocumentIndexingCaller", address)
    documentIndexingCaller.connect(wallet)
    const allDocuments = await documentIndexingCaller.allDocuments()
    console.log(`DocumentIndexingCaller.allDocuments: ${allDocuments}`)
})
