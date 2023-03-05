// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Airdrop is ERC20 {
  
  string  name_;
  string symbol_;
  constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
    name_ = _name;
    symbol_ = _symbol;
  }
}
