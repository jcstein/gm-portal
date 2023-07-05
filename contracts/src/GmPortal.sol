// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "lib/forge-std/src/console.sol";

contract GmPortal {
    uint256 totalGms;
    event NewGm(address indexed from, uint256 timestamp, string message);
    struct Gm {
        address gmer; // The address of the user who gmd.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user gmd.
    }
    Gm[] gms;
    mapping(address => bool) public usersWhoGmd;
    constructor() {
        console.log("i am a smart contract on Bubs testnet. gm!");
    }
    function gm(string memory _message) public {
        totalGms += 1;
        console.log("%s gm'd w/ message %s", msg.sender, _message);
        gms.push(Gm(msg.sender, _message, block.timestamp));
        emit NewGm(msg.sender, block.timestamp, _message);
        usersWhoGmd[msg.sender] = true;
    }
    function getAllGms() public view returns (Gm[] memory) {
        return gms;
    }
    function getTotalGms() public view returns (uint256) {
        console.log("We have %d total gms!", totalGms);
        return totalGms;
    }
}
