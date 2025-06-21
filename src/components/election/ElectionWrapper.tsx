import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import ElectionCard from "./ElectionCard";
import ElectionCardSkeleton from "./skeletons/ElectionCardSkeleton";

interface ElectionWrapperProps {
  elections: ElectionSumaryType[];
  isFetching: boolean;
}

const ElectionWrapper = ({ elections, isFetching }: ElectionWrapperProps) => {
  return (
    <div className='grid grid-cols-1 space-y-4'>
      {isFetching
        ? Array.from({ length: 4 }).map((_, i) => (
            <ElectionCardSkeleton key={i} />
          ))
        : elections.map((election) => (
            <ElectionCard election={election} key={election.createdAt} />
          ))}
    </div>
  );
};

export default ElectionWrapper;
