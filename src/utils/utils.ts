export const generateAvatarUrl = (seed: string) => {
  return `https://api.dicebear.com/9.x/dylan/svg?seed=${seed}`;
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
