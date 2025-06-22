import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import getContract from "@/lib/contract";
import type { ElectionDetailType } from "@/types/ElectionDetailType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Share2, Copy, QrCode } from "lucide-react";
import type { ElectionOptionType } from "@/types/ElectionOptionType";
import ElectionDetailSkeleton from "../skeletons/ElectionDetailSkeleton";
import ElectionDetailCard from "./ElectionDetailCard";

const ElectionDetail = () => {
  const { id: electionId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [election, setElection] = useState<ElectionDetailType | null>(null);
  const [isFetching, setFetching] = useState(true);
  const [selected, setSelected] = useState<number | undefined>(undefined);

  async function fetchElection() {
    try {
      setFetching(true);
      const contract = getContract();
      const result = await contract.getElection(
        electionId,
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"
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
      setSelected(hasVoted ? Number(votedOptionId) : undefined);
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
      <Alert>
        <AlertDescription>
          Election not found. Please check the URL and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-8'>
      <ElectionDetailCard
        election={election}
        electionId={electionId!}
        selected={Number(selected)}
      />
      <Card>
        <CardContent className='flex flex-col md:flex-row gap-4 items-start justify-between'>
          <div className='flex items-center gap-2 my-auto'>
            <Share2 className='h-5 w-5' />
            <span className='font-medium'>Share this election</span>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              <Copy /> Copy Link
            </Button>
            <Button variant='outline' size='sm'>
              <QrCode /> QR code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectionDetail;
