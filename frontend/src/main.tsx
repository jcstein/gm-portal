import "./polyfills";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { injectedWallet, metaMaskWallet, walletConnectWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

const ethermintChain: Chain = {
  id: 9000,
  name: 'Ethermint',
  network: 'ethermint',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethermint',
    symbol: 'EMINT',
  },
  rpcUrls: {
    default: {
      http: ['https://cd71-159-65-252-178.eu.ngrok.io'],
      // webSocket: ['wss://159.65.252.178:8546/']
    },
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [ethermintChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ chains, appName: 'GM Portal' }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
)
