import { randomBytes, uuidV4 } from "ethers";
import { nanoid } from "nanoid";

export function generateUUID() {
  return uuidV4(randomBytes(16));
}

export function generateShortId() {
  return nanoid(8); // e.g:"xC9f2Klq"
}

export const generateAvatarUrl = (seed: string) => {
  return `https://api.dicebear.com/9.x/dylan/svg?seed=${seed}`;
};

export const formatDate = (timestamp: number) => {
  if (timestamp === 0) {
    return "No Deadline.";
  }
  return new Date(timestamp * 1000).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export function shortenAddress(address: string, chars = 4) {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
