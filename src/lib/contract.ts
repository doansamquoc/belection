import { ethers } from "ethers";
import abi from "../abi/abi.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error("VITE_CONTRACT_ADDRESS is not set");
}

const getContract = (signer: ethers.Signer) => {
  return new ethers.Contract(contractAddress, abi, signer);
};

export const getReadOnlyContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(contractAddress, abi, provider);
};

export default getContract;
