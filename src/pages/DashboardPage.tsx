import ElectionWrapper from "@/components/election/ElectionWrapper";
import { useAuth } from "@/contexts/AuthContext";
import getContract from "@/lib/contract";
import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [elections, setElections] = useState<ElectionSumaryType[]>([]);
  const [isFetching, setFetching] = useState(true);
  const { user } = useAuth();

  async function getElections() {
    try {
      setFetching(true);
      const contract = getContract();
      const [ids, titles, deadlines, createdAts, participants] =
        await contract.getElectionSummariesByCreator(
          "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"
        );

      const elections: ElectionSumaryType[] = ids.map(
        (id: bigint, index: number) => ({
          id: Number(id),
          title: titles[index],
          deadline: Number(deadlines[index]),
          createdAt: Number(createdAts[index]),
          participants: Number(participants[index]),
        })
      );

      setElections(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    getElections();
  }, [user]);

  return (
    <div className='p-4'>
      <ElectionWrapper elections={elections} isFetching={isFetching} />
    </div>
  );
};

export default DashboardPage;
