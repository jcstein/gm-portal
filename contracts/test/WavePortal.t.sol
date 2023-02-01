// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/WavePortal.sol";

contract WavePortalTest is Test {
    WavePortal public waveportal;
    function setUp() public {
        waveportal = new WavePortal();
    }
    function testWave() public {
        waveportal.wave("gm");
        waveportal.getTotalWaves();
        waveportal.getAllWaves();
        waveportal.wave("ge");
    }
}
