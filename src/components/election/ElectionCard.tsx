import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { formatDate } from "@/utils/utils";

interface ElectionCardProps {
  election: ElectionSumaryType;
}

const ElectionCard = ({ election }: ElectionCardProps) => {
  return (
    <Link to={`/e/${election.id}`}>
      <div className='bg-card border rounded-md p-4'>
        <h1 className='text-lg font-semibold'>{election.title}</h1>
        <div className='flex flex-col sm:flex-row'>
          <span className='text-muted-foreground text-xs my-auto'>
            Created at {formatDate(election.createdAt)}
          </span>

          <Dot className='hidden sm:block' />
          <span className='text-muted-foreground text-xs my-auto'>
            Deadline at {formatDate(election.deadline)}
          </span>
          <Dot className='hidden sm:block' />
          <span className='text-muted-foreground text-xs my-auto'>
            {election.participants} participants
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ElectionCard;
