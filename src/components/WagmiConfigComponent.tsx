import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useDisconnect,
  useAccount,
} from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import Account from "./Account";
import ConnectWalletsButton from "./ConnectWalletsButton";

const chains = [arbitrum, mainnet, polygon];

// MUST be stored in safety
const projectId = "beb462b6b27f48ee46a75261d69c5020";

// Wagmi & WalletConnect config
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// WagmiConfig MUST wrap all logic that includes Wagmi/WalletConnect
export default function WagmiConfigComponent() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ConnectWalletsButton />
        <Account />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={mainnet}
        explorerRecommendedWalletIds={[
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
          "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
          "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        ]}
      />
    </>
  );
}
