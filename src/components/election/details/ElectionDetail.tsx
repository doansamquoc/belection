import { useAuth } from "@/contexts/AuthContext";
import getContract from "@/lib/contract";
import type { ElectionDetailType } from "@/types/ElectionDetailType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ElectionDetail = () => {
  const { id: electionId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [election, setElection] = useState<ElectionDetailType | null>(null);
  const [isFetching, setFetching] = useState(true);

  async function fetchElection() {
    try {
      setFetching(true);
      const contract = getContract();
      const result = await contract.getElection(
        Number(electionId),
        user?.publicAddress
      );

      const [
        title,
        creator,
        deadline,
        createdAt,
        participantCount,
        optionTexts,
        voteCounts,
        hasVoted,
        votedOptionId,
      ] = result;

      const options = optionTexts.map((text: string, index: number) => ({
        text,
        voteCount: Number(voteCounts[index]),
      }));

      const electionData: ElectionDetailType = {
        id: Number(electionId),
        title,
        creator,
        deadline: Number(deadline),
        createdAt: Number(createdAt),
        participants: participantCount,
        options,
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
    if (!user) return;
    fetchElection();
  }, [electionId, user]);
  return (
    <div className='p-4'>
      {isFetching ? (
        <p>Đang tải...</p>
      ) : election ? (
        <>
          <h1 className='text-xl font-bold'>{election.title}</h1>
          <p>Deadline: {new Date(election.deadline * 1000).toLocaleString()}</p>
          <p>Created: {new Date(election.createdAt * 1000).toLocaleString()}</p>
          <ul className='mt-4 space-y-2'>
            {election.options.map((opt, idx) => (
              <li key={idx} className='border p-2 rounded'>
                {opt.text} — {opt.voteCount} votes
              </li>
            ))}
          </ul>
          <p className='mt-4 font-medium'>
            {election.hasVoted
              ? `Bạn đã bỏ phiếu: ${
                  election.options[election.votedOptionId]?.text
                }`
              : "Bạn chưa bỏ phiếu"}
          </p>
        </>
      ) : (
        <p>Không tìm thấy cuộc bầu cử</p>
      )}
    </div>
  );
};

export default ElectionDetail;
