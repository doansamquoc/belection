import { useAuth } from "@/contexts/AuthContext";
import getContract from "@/lib/contract";
import type { ElectionDetailType } from "@/types/ElectionDetailType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ElectionOptionType } from "@/types/ElectionOptionType";
import ElectionDetailSkeleton from "../skeletons/ElectionDetailSkeleton";
import ElectionDetailCard from "./ElectionDetailCard";
import ShareCard from "./ShareCard";
import { provider } from "@/lib/magic";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutDashboard } from "lucide-react";

const ElectionDetail = () => {
  const { id: electionId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [election, setElection] = useState<ElectionDetailType | null>(null);
  const [isFetching, setFetching] = useState(true);

  async function fetchElection() {
    try {
      setFetching(true);
      const signer = provider.getSigner();
      const contract = getContract(signer);
      const result = await contract.getElection(
        electionId,
        user?.publicAddress
      );

      const [summary, options, hasEnded, hasVoted, votedOptionId] = result;

      const optionsData: ElectionOptionType[] = options.map((opt: any) => ({
        text: opt.text,
        voteCount: Number(opt.voteCount),
      }));

      const electionData: ElectionDetailType = {
        id: electionId!,
        title: summary.title,
        creator: summary.creator,
        deadline: Number(summary.deadline),
        createdAt: Number(summary.createdAt),
        participants: Number(summary.participantCount),
        options: optionsData,
        hasEnded,
        hasVoted,
        votedOptionId: Number(votedOptionId),
      };

      setElection(electionData);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (!user || !electionId) return;
    fetchElection();
  }, [electionId, user]);

  if (isFetching) {
    return <ElectionDetailSkeleton />;
  }

  if (!election) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] px-4 text-center'>
        <div className='w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center shadow-inner'>
          <svg
            className='w-12 h-12 text-red-400 dark:text-red-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>

        <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3'>
          Election Not Found
        </h2>

        <p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed'>
          We couldn't find the election you're looking for. It may have been
          moved, deleted, or the URL might be incorrect.
        </p>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Button
            onClick={() => window.history.back()}
            size={"lg"}
            variant={"secondary"}
          >
            <ChevronLeft />
            Go Back
          </Button>

          <Button onClick={() => (window.location.href = "/")} size={"lg"}>
            <LayoutDashboard />
            Go Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <ElectionDetailCard election={election} electionId={electionId!} />
      <ShareCard />
    </div>
  );
};

export default ElectionDetail;
