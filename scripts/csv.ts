import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  // Create 10 random addresses
  const addresses = [];
  for (let i = 0; i < 10; i++) {
    const randomWallet = ethers.Wallet.createRandom();
    addresses.push(randomWallet.address);
  }

  // Create CSV data
  let csvData = "address,amount\n";
  addresses.forEach((address) => {
    csvData += `${address},1000\n`;
  });

  // Write CSV file
  const fileName = "balances.csv";
  fs.writeFile(fileName, csvData, function (err) {
    if (err) throw err;
    console.log(`CSV file with 10 addresses and balance of 1000 each has been created as ${fileName}`);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
