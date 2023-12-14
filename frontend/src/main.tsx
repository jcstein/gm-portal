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

const orbitNitroChain: Chain = {
  id: 412346,
  name: 'Nitro Rollup',
  network: 'nitro',
  nativeCurrency: {
    decimals: 18,
    name: 'Nitro Rollup',
    symbol: 'gETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8547'],
      webSocket: ['ws://localhost:8548']
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [orbitNitroChain],
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
      coinbaseWallet({ chains, appName: 'gm portal ☀️' }),
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
