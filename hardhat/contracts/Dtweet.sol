// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Dtweet{
    // address payable public owner;
    uint totalDtweets;
    struct DtweetContent{
        // address dtweetOwner;
        string msg;
        // uint timestamp;
        string imgUri;
    }

    mapping(address => DtweetContent) public dtweets;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 

    DtweetContent[] dtweetContents;
    // mapping (uint => string) public names;

    constructor() {
        console.log("SMART CONTRACT STARTED");
    }

    function dtweet(string memory _message) public {
        totalDtweets += 1;
        dtweets[msg.sender]=DtweetContent(_message,block.timestamp);
        console.log("%s dtweeted %s", msg.sender, _message);
        // dtweetContents.push(DtweetContent(msg.sender, _message, block.timestamp));
    }

    function getAllDtweets() public view returns (DtweetContent[] memory) {
        return dtweetContents;
    }

    function getTotalDtweets() public view returns (uint256) {
        console.log("We have %d total dtweets!", totalDtweets);
        return totalDtweets;
    }


}