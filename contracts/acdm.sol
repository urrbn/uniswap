pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Acdm is ERC20 {
  address public owner;

  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    owner = msg.sender;
    _mint(msg.sender, 1000000 * (10**18));
  }


}