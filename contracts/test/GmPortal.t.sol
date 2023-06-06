// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/GmPortal.sol";

contract GmPortalTest is Test {
    GmPortal public gmportal;
    function setUp() public {
        gmportal = new GmPortal();
    }
    function testGm() public {
        gmportal.gm("gm");
        gmportal.getTotalGms();
        gmportal.getAllGms();
        gmportal.gm("ge");
    }
}
