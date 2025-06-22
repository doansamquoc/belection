import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import ElectionCard from "./ElectionCard";
import ElectionCardSkeleton from "./skeletons/ElectionCardSkeleton";
import type { PaginatedElectionType } from "@/types/PaginatedElectionType";
import SmartPagination from "../SmartPagination";

interface ElectionWrapperProps {
  elections: ElectionSumaryType[];
  isFetching: boolean;
  paginated: PaginatedElectionType;
  onPageChange: (page: number) => void;
}

const ElectionWrapper = ({
  elections,
  isFetching,
  paginated,
  onPageChange,
}: ElectionWrapperProps) => {
  return (
    <div className='flex flex-col gap-4 flex-1'>
      {isFetching
        ? Array.from({ length: 4 }).map((_, i) => (
            <ElectionCardSkeleton key={i} />
          ))
        : elections.map((election) => (
            <ElectionCard election={election} key={election.createdAt} />
          ))}

      {paginated && Number(paginated.totalPage) > 1 && (
        <div className='mt-auto'>
          <SmartPagination
            currentPage={Number(paginated.currentPage)}
            totalPage={Number(paginated.totalPage)}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ElectionWrapper;
