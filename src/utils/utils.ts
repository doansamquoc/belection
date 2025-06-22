import { nanoid } from "nanoid";

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

export const optionsPlaceholder = [
  "Blinding Lights - The Weeknd",
  "The Twist - Chubby Checker",
  "Smooth - Santana featuring Rob Thomas",
  "Mack The Knife - Bobby Darin",
  "Uptown Funk - Mark Ronson featuring Bruno Mars",
  "How Do I Live - LeAnn Rimes",
  "Party Rock Anthem - LMFAO featuring Lauren Bennett & GoonRock",
  "I Gotta Feeling - The Black Eyed Peas",
  "Macarena (Bayside Boys mix) - Los Del Rio",
  "Shape of You - Ed Sheeran",
];
