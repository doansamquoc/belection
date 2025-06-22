import { ethers } from "ethers";
import { Magic } from "magic-sdk";

const magicApiKey = import.meta.env.VITE_MAGIC_PUBLIC_KEY;
const rpcUrl = import.meta.env.VITE_RPC_URL;

if (!magicApiKey) {
  throw new Error("VITE_MAGIC_PUBLIC_KEY is not set");
}

export const magic = new Magic(magicApiKey, {
  network: {
    rpcUrl: rpcUrl,
    chainId: 11155111,
  },
});

export const provider = new ethers.providers.Web3Provider(
  magic.rpcProvider as any
);
