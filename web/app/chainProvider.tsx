"use client";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { sepolia, filecoinCalibration, polygonMumbai } from "viem/chains";
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient } = configureChains(
  [sepolia, filecoinCalibration, polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

interface ChainProviderProps {
  children: React.ReactNode;
}

export const ChainProvider = ({ children }: ChainProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
