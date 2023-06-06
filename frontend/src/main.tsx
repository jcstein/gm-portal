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
  id: 1582,
  name: 'Taro testnet',
  network: 'taro',
  nativeCurrency: {
    decimals: 18,
    name: 'Taro',
    symbol: 'gETH',
  },
  rpcUrls: {
    default: {
      http: ['https://taro-testnet.calderachain.xyz/http'],
      webSocket: ['wss://taro-testnet.calderachain.xyz/ws']
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
      coinbaseWallet({ chains, appName: 'GM portal 🧋' }),
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
