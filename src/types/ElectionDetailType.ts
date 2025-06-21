import type { ElectionOptionType } from "./ElectionOptionType";
import type { ElectionSumaryType } from "./ElectionSummaryType";

export interface ElectionDetailType extends ElectionSumaryType {
  options: ElectionOptionType[];
  hasVoted: boolean;
  votedOptionId: number;
}
