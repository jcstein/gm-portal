// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {GmPortal} from "src/GmPortal.sol";

contract GmPortalScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new GmPortal();
        vm.stopBroadcast();
    }
}