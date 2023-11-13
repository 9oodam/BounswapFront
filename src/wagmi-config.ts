import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygon, mainnet, Chain } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const customChain: Chain = {
  id: 18328, // 여기에 회사에서 제공한 체인 ID를 입력
  name: "BounsWalletChain",
  network: "BounsNetwork",
  nativeCurrency: {
    name: "BounsNetworkCoin", // 해당 체인의 네이티브 통화명
    symbol: "BNC", // 해당 체인의 네이티브 통화 심볼
    decimals: 18, // 해당 체인의 네이티브 통화 소수점 자릿수
  },
  rpcUrls: {
    default: { http: ["https://network.bouncecode.net/"] }, // 여기에 회사에서 제공한 RPC URL을 입력
    public: { http: ["https://network.bouncecode.net/"] }, // 공개 RPC URL을 배열로 제공
  },
  blockExplorers: {
    default: {
      name: "BounsWallet Explorer",
      url: "https://network.bouncecode.net/",
    },
  },
  testnet: true, // 해당 체인이 테스트넷인 경우 true로 설정
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, customChain],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains: [mainnet] }),
    new MetaMaskConnector({ chains: [customChain] }),
  ],
  publicClient,
  webSocketPublicClient,
});
