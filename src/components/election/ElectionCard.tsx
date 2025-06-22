import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import { Link } from "react-router-dom";
import { Dot, Clock, Users, Calendar } from "lucide-react";
import { formatDate } from "@/utils/utils";

interface ElectionCardProps {
  election: ElectionSumaryType;
}

const ElectionCard = ({ election }: ElectionCardProps) => {
  return (
    <Link to={`/e/${election.id}`} className='group block'>
      <div className='bg-muted/10 border rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:border-primary/20 group-hover:bg-muted/20'>
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2'>
            {election.title}
          </h1>

          <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-1'>
            <div className='flex items-center gap-2 text-muted-foreground text-sm'>
              <Calendar className='w-4 h-4 shrink-0' />
              <span>Created {formatDate(election.createdAt)}</span>
            </div>

            <Dot className='hidden sm:block text-muted-foreground' />

            <div className='flex items-center gap-2 text-muted-foreground text-sm'>
              <Clock className='w-4 h-4 shrink-0' />
              <span>Deadline {formatDate(election.deadline)}</span>
            </div>

            <Dot className='hidden sm:block text-muted-foreground' />

            <div className='flex items-center gap-2 text-muted-foreground text-sm'>
              <Users className='w-4 h-4 shrink-0' />
              <span>{election.participants} participants</span>
            </div>
          </div>
        </div>

        <div className='mt-4 pt-4 border-t border-border/50'>
          <span className='text-sm text-primary font-medium group-hover:text-primary/80 transition-colors duration-200'>
            View Election →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ElectionCard;
