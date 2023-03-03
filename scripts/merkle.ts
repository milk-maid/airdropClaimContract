import { ethers } from "hardhat";
import * as fs from "fs";

// import Web3 from "web3";
// const web3 = new Web3();

// test if web3 is properly initialized
// console.log(web3.utils.toHex(1000));

// const Web3 = require('web3');
// const web3 = new Web3();

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
    
    // const amountHex = web3.utils.toHex(amount); // convert decimal to hex
    const addressBytes = ethers.utils.hexZeroPad(address, 32);

    // Check if amount is a valid hex string
    // if (!/^0x[0-9a-fA-F]*$/.test(amount)) {
    //   throw new Error(`Invalid hex string: ${amount}`);
    // }

    
    const amountHex = ethers.utils.hexlify(parseInt(amount, 10)); // the hex value of our amount
    
    const amountBytes = ethers.utils.hexZeroPad(amountHex, 32);

    // return ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);

    const leaf =  ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);


    return Buffer.from(leaf.slice(2), "hex"); // slice(2) removes the '0x' prefif


  });

  // Build merkle tree
  const tree = new MerkleTree(leaves, ethers.utils.solidityKeccak256);

  //console.log(tree); // add this line to check if tree is an instance of MerkleTree

  // Print merkle root
  console.log(`Merkle root: ${tree.getRoot().toString()}`);

  const merkleRoot = tree.getRoot();
  const merkleRootHex = "0x" + Buffer.from(merkleRoot).toString("hex");
  console.log(`Merkle root (hex): ${merkleRootHex}`);

  // Construct the Merkle proof object for each leaf
  const proofs = rows.map((row) => {
    const [address, amount] = row.split(",");
    const addressBytes = ethers.utils.hexZeroPad(address, 32);
    const amountHex = ethers.utils.hexlify(parseInt(amount, 10));
    const amountBytes = ethers.utils.hexZeroPad(amountHex, 32);
    const leaf = ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);
    const proof = tree.getProof(Buffer.from(leaf.slice(2), "hex")); // slice(2) removes the '0x' prefix
    return {
      address,
      amount,
      proof,
    };
  });

  // Write Merkle tree data to a JSON file
  const merkleData = {
    merkleRoot: merkleRootHex,
    proofs: proofs,
  };
  console.log(merkleData);
  
  const outputFile = "merkleData.json";
  fs.writeFileSync(outputFile, JSON.stringify(merkleData));

  console.log(`Merkle tree data written to ${outputFile}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


/*

import { ethers } from "hardhat";
import * as fs from "fs";



// test if web3 is properly initialized
// console.log(web3.utils.toHex(1000));

// const Web3 = require('web3');
// const web3 = new Web3();

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
    
    // const amountHex = web3.utils.toHex(amount); // convert decimal to hex
    const addressBytes = ethers.utils.hexZeroPad(address, 32);

    // Check if amount is a valid hex string
    // if (!/^0x[0-9a-fA-F]*$/.test(amount)) {
    //   throw new Error(`Invalid hex string: ${amount}`);
    // }

    
    const amountHex = ethers.utils.hexlify(parseInt(amount, 10)); // the hex value of our amount
    
    const amountBytes = ethers.utils.hexZeroPad(amountHex, 32);

    // return ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);

    const leaf =  ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [addressBytes, amountBytes]);


    return Buffer.from(leaf.slice(2), "hex"); // slice(2) removes the '0x' prefif


  });

  // Build merkle tree
  const tree = new MerkleTree(leaves, ethers.utils.solidityKeccak256);

  //console.log(tree); // add this line to check if tree is an instance of MerkleTree

  // Print merkle root
  console.log(`Merkle root: ${tree.getRoot().toString()}`);

  const merkleRoot = tree.getRoot();
  const merkleRootHex = "0x" + Buffer.from(merkleRoot).toString("hex");
  console.log(`Merkle root (hex): ${merkleRootHex}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

*/


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
