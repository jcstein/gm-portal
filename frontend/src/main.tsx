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
  id: 2061,
  name: 'Polaris EVM x Rollkit',
  network: 'berakit',
  nativeCurrency: {
    decimals: 18,
    name: 'Berakit',
    symbol: 'tBERA',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
      // webSocket: ['wss://bubs.calderachain.xyz/ws']
    },
  },
  testnet: true,
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
      coinbaseWallet({ chains, appName: 'gm portal' }),
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
   <WagmiConfig client={wagmiClient}>
     <RainbowKitProvider chains={chains}>
      <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
       </ChakraProvider>
     </RainbowKitProvider>
   </WagmiConfig>
  </React.StrictMode>,
)
