import { ethers } from "hardhat";

async function main() {
    if (!process.env.WALLET_PRIVATE_KEY) {
        throw new Error("WALLET_PRIVATE_KEY env variable is not set")
    }
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY)
    
    const documentIndexingCaller = await ethers.getContractAt("DocumentIndexingCaller", "0x0d1514A6F366f3936ef5059dC99fE694333A7a5b")
    documentIndexingCaller.connect(wallet)
    const tx = await documentIndexingCaller.requestIndexing({value: ethers.utils.parseEther('0.35')})
    const receipt = await tx.wait()
    console.log(`DocumentIndexingCaller.requestIndexing() transaction hash: ${receipt.transactionHash}`)
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
