import ElectionWrapper from "@/components/election/ElectionWrapper";
import { useAuth } from "@/contexts/AuthContext";
import getContract from "@/lib/contract";
import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import type { PaginatedElectionType } from "@/types/PaginatedElectionType";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [paginated, setPaginated] = useState<PaginatedElectionType | null>(
    null
  );
  const [elections, setElections] = useState<ElectionSumaryType[]>([]);
  const [isFetching, setFetching] = useState(true);
  const { user } = useAuth();
  const [offset, setOffset] = useState(0);
  const limit = 10;

  function handlePageChange(page: number) {
    const newOffset = (page - 1) * limit;
    setOffset(newOffset);
    getElections(newOffset);
  }

  async function getElections(offset: number = 0) {
    try {
      setFetching(true);
      const contract = getContract();

      const [
        electionSummaries,
        total,
        totalPage,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      ] = await contract.getPaginatedElectionSummariesByCreator(
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        limit,
        offset
      );

      const elections: ElectionSumaryType[] = electionSummaries.map(
        (summary: any) => ({
          id: summary.id,
          title: summary.title,
          deadline: Number(summary.deadline),
          createdAt: Number(summary.createdAt),
          participants: Number(summary.participantCount),
        })
      );

      const paginatedElection: PaginatedElectionType = {
        total,
        totalPage,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        elections,
      };

      setPaginated(paginatedElection);
      setElections(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    getElections(offset);
  }, [user]);

  return (
    <ElectionWrapper
      elections={elections}
      isFetching={isFetching}
      paginated={paginated!}
      onPageChange={handlePageChange}
    />
  );
};

export default DashboardPage;
