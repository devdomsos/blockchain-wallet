pragma solidity ^0.5.0;
import "node_modules" 
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";


contract DaiTokenMock is ERC20Mintable {

    string public name;
    string public symbol;
    uint256 public decimals;

    constructor() public {
        name = "Dai Stablecoin (Dai)";
        symbol = "DAI";
        decimals = 18;
    }
}