import type { ElectionSumaryType } from "./ElectionSummaryType";

export interface PaginatedElectionType {
  total: number;
  totalPage: number;
  currentPage: number;
  hasNextPage: number;
  hasPreviousPage: number;
  elections: ElectionSumaryType[];
}
