# GM Portal ☀️

This is the repository for the [GM Portal](https://gmportal.xyz).

Contracts can be found in the [`contracts`](./contracts) directory, and the frontend in [`frontend`](./frontend).

## What is GM?

GM means good morning. It's GM o'clock somewhere, so there's never a bad time to say GM, Gm, or gm.

## Getting Started

First, DM me at [@JoshCStein](https://twitter.com/JoshCStein) or [joshcs.lens](https://www.lensfrens.xyz/joshcs.lens) with your Ethereum wallet address to receive EMT tokens.

Then, you will need to connect your Ethereum wallet below to the Ethermint Sovereign Rollup to display the posts from the smart contract and post a GM. You only need EMT to post.

## Nice, what's going on under the hood?

This GM Portal is built with Celestia, RollKit, & Ethermint.

The GM Portal is a smart contract demo on a sovereign rollup built on Celestia to provide data availability and consensus, leveraging Ethermint with RollKit as the execution environment.

This allows users to securely create and share blog posts on the blockchain without the need for a centralized server or authority.

## Developing this site yourself

```sh
# clone the repository
git clone https://github.com/jcstein/gm-portal.git

# CD into directory, and frontend
cd gm-portal/frontend

# Install dependencies
yarn

# Develop site locally
yarn build
```

## Adding your contributions

This site was built with a mix of the [Ethermint with Rollkit tutorial](https://rollkit.dev/docs/tutorials/ethermint)
and [Celestia's full stack modular blockchain development guide](https://docs.celestia.org/developers/full-stack-modular-development-guide/).
The smart contract on this dapp was deployed with Foundry.

If you would like to contribute to this repository, please submit an
[issue](https://github.com/jcstein/gm-portal/issues/new/choose) and
open a [pull request](https://github.com/jcstein/gm-portal/compare)
with your changes for the issue.
