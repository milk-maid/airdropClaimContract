import { ethers } from "hardhat";
import * as fs from "fs";
declare const require: any;
const MerkleTree = require('merkle-tree-solidity').default;

async function main() {
  // Read CSV file
  const fileName = "balances.csv";
  const fileContent = fs.readFileSync(fileName, "utf-8");
  const rows = fileContent.trim().split("\n").slice(1); // Ignore header row

  // Generate leaves of the merkle tree
  const leaves = rows.map((row) => {
    const [address, amount] = row.split(",");
    const addressBytes = ethers.utils.hexZeroPad(address, 32);
    const amountBytes = ethers.utils.hexZeroPad(amount, 32);
    return ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);
  });

  // Build merkle tree
  const tree = new MerkleTree(leaves, ethers.utils.solidityKeccak256);

  // Print merkle root
  console.log(`Merkle root: ${tree.getHexRoot()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




// import { ethers } from "hardhat";
// import * as fs from "fs";
// import { MerkleTree } from "merkle-tree-solidity";

// async function main() {
//   // Read CSV file
//   const fileName = "balances.csv";
//   const fileContent = fs.readFileSync(fileName, "utf-8");
//   const rows = fileContent.trim().split("\n").slice(1); // Ignore header row

//   // Generate leaves of the merkle tree
//   const leaves = rows.map((row) => {
//     const [address, amount] = row.split(",");
//     const addressBytes = ethers.utils.hexZeroPad(address, 32);
//     const amountBytes = ethers.utils.hexZeroPad(amount, 32);
//     return ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);
//   });

//   // Build merkle tree
//   const tree = new MerkleTree(leaves, ethers.utils.solidityKeccak256);

//   // Print merkle root
//   console.log(`Merkle root: ${tree.getHexRoot()}`);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
