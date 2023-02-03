// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "lib/forge-std/src/console.sol";

contract WavePortal {
    uint256 totalWaves;
    event NewWave(address indexed from, uint256 timestamp);
    struct Wave {
        address waver; // The address of the user who waved.
        uint256 timestamp; // The timestamp when the user waved.
    }
    Wave[] waves;
    constructor() {
        console.log("I AM SMART CONTRACT. GM.");
    }
    function wave() public {
        totalWaves += 1;
        console.log("%s waved", msg.sender);
        waves.push(Wave(msg.sender, block.timestamp));
        emit NewWave(msg.sender, block.timestamp);
    }
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
