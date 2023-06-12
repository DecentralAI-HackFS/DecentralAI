import { ethers } from "hardhat";
const lilypadEventsContractAddress = '0xdC7612fa94F098F1d7BB40E0f4F4db8fF0bC8820';

async function main() {  
  const DocumentIndexingCaller = await ethers.getContractFactory("DocumentIndexingCaller");
  const documentIndexingCaller = await DocumentIndexingCaller.deploy(lilypadEventsContractAddress);
  
  await documentIndexingCaller.deployed();

  console.log("DocumentIndexingCaller deployed to:", documentIndexingCaller.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
