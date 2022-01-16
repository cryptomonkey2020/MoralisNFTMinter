pragma solidity ^0.8.0;

// import0 ERC1155 from OpenZ 

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable { 

   //uint256 public constant ARTWORK = 0; 
   // uint256 public constant PHOTO = 1; 

    constructor() ERC1155("https://gesqofutph1n.usemoralis.com/{id}.json") {
        _mint(msg.sender, 0, 1, "");
        _mint(msg.sender, 1, 1, "");
        _mint(msg.sender, 2, 1, "");
        _mint(msg.sender, 3, 1, "");
        _mint(msg.sender, 4, 1, "");
        _mint(msg.sender, 5, 1, "");
        _mint(msg.sender, 6, 1, "");
        _mint(msg.sender, 7, 1, "");
        _mint(msg.sender, 8, 1, "");
    }

    function mint(address account, uint256 id, uint256 amount) public onlyOwner  {
        _mint(account, id, amount, "");
    }


    function burn(address account, uint256 id, uint256 amount) public {
        require (msg.sender == account );
        _burn (account, id , amount);
    }


}
