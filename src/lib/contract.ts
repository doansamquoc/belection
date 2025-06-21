import { ethers } from "ethers";
import abi from "../abi/abi.json";
import { signer } from "./magic";

const localContractAddress = import.meta.env.VITE_LOCAL_CONTRACT_ADDRESS;
const getContract = () => {
  return new ethers.Contract(localContractAddress, abi, signer);
};

export default getContract;
