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
      {isFetching ? (
        Array.from({ length: 4 }).map((_, i) => (
          <ElectionCardSkeleton key={i} />
        ))
      ) : elections.length > 0 ? (
        elections.map((election) => (
          <ElectionCard election={election} key={election.createdAt} />
        ))
      ) : (
        <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
          <div className='w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          </div>
          <h3 className='text-lg font-medium mb-2'>No elections yet</h3>
          <p className='text-muted-foreground max-w-sm'>
            Elections will appear here once they are created and available.
          </p>
        </div>
      )}

      {paginated &&
        Number(paginated.totalPage) > 1 &&
        !isFetching &&
        elections.length > 0 && (
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
