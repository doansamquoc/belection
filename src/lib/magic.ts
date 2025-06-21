import { ethers } from "ethers";
import { Magic } from "magic-sdk";

const magicApiKey = import.meta.env.VITE_MAGIC_PUBLIC_KEY;
const localRpcUrl = import.meta.env.VITE_LOCAL_NETWORK;
const localPrivateKey = import.meta.env.VITE_LOCAL_PRIVATE_KEY;

export const magic = new Magic(magicApiKey);

export const provider = new ethers.JsonRpcProvider(localRpcUrl);
export const signer = new ethers.Wallet(localPrivateKey, provider);
