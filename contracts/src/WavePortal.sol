// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "lib/forge-std/src/console.sol";

contract WavePortal {
    uint256 totalWaves;
    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }
    Wave[] waves;
    mapping(address => bool) public usersWhoWaved;
    mapping(address => uint256) public dailyWaves;
    constructor() {
        console.log("I AM SMART CONTRACT. GM.");
    }
    function wave(string memory _message) public {
        require(!usersWhoWaved[msg.sender], "This address has already waved.");
        require(dailyWaves[msg.sender] < 1, "This address has already reached the limit of 1 wave per day.");
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
        usersWhoWaved[msg.sender] = true;
        dailyWaves[msg.sender] += 1;
    }
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
