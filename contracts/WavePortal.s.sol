// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {WavePortal} from "src/WavePortal.sol";

contract WavePortalScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new WavePortal();
        vm.stopBroadcast();
    }
}