import type { ElectionOptionType } from "./ElectionOptionType";
import type { ElectionSumaryType } from "./ElectionSummaryType";

export interface ElectionDetailType extends ElectionSumaryType {
  options: ElectionOptionType[];
  hasEnded: boolean;
  hasVoted: boolean;
  votedOptionId: number;
}
