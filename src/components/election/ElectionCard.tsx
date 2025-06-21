import type { ElectionSumaryType } from "@/types/ElectionSummaryType";
import { Link } from "react-router-dom";
import { Clock, Users, Calendar, ArrowRight, Vote } from "lucide-react";
import { formatDate } from "@/utils/utils";

interface ElectionCardProps {
  election: ElectionSumaryType;
}

const ElectionCard = ({ election }: ElectionCardProps) => {
  const isDeadlineClose = () => {
    const now = new Date();
    const deadline = new Date(election.deadline);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = () => {
    const now = new Date();
    const deadline = new Date(election.deadline);
    return deadline < now;
  };

  return (
    <Link to={`/e/${election.id}`} className='group block'>
      <div className='relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 sm:hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-card/90 group-hover:to-card/70 overflow-hidden'>
        <div className='absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16 transition-all duration-500 group-hover:scale-125' />
        <div className='absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12 transition-all duration-500 group-hover:scale-110' />

        <div className='absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2'>
          {isExpired() ? (
            <span className='px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full border border-destructive/20'>
              Expired
            </span>
          ) : isDeadlineClose() ? (
            <span className='px-2 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-medium rounded-full border border-yellow-500/20 animate-pulse'>
              Ending Soon
            </span>
          ) : (
            <span className='px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full border border-green-500/20'>
              Active
            </span>
          )}
        </div>

        <div className='relative z-10 space-y-3 sm:space-y-5'>
          <div className='flex items-start gap-2 sm:gap-3 pr-16 sm:pr-20'>
            <div className='p-1.5 sm:p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300'>
              <Vote className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
            </div>
            <div className='flex-1 min-w-0'>
              <h2 className='text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight'>
                {election.title}
              </h2>
            </div>
          </div>

          <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3'>
            <div className='flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg group-hover:bg-muted/50 transition-colors duration-300'>
              <Calendar className='w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0' />
              <div className='min-w-0 flex-1'>
                <p className='text-xs text-muted-foreground font-medium'>
                  Created
                </p>
                <p className='text-xs sm:text-sm font-semibold text-foreground truncate'>
                  {formatDate(election.createdAt)}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                isExpired()
                  ? "bg-destructive/10 group-hover:bg-destructive/20"
                  : isDeadlineClose()
                  ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                  : "bg-muted/30 group-hover:bg-muted/50"
              }`}
            >
              <Clock
                className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${
                  isExpired()
                    ? "text-destructive"
                    : isDeadlineClose()
                    ? "text-yellow-600"
                    : "text-muted-foreground"
                }`}
              />
              <div className='min-w-0 flex-1'>
                <p className='text-xs text-muted-foreground font-medium'>
                  Deadline
                </p>
                <p
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    isExpired()
                      ? "text-destructive"
                      : isDeadlineClose()
                      ? "text-yellow-600"
                      : "text-foreground"
                  }`}
                >
                  {formatDate(election.deadline)}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg group-hover:bg-muted/50 transition-colors duration-300 xs:col-span-2 lg:col-span-1'>
              <Users className='w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0' />
              <div className='min-w-0 flex-1'>
                <p className='text-xs text-muted-foreground font-medium'>
                  Participants
                </p>
                <p className='text-xs sm:text-sm font-semibold text-foreground'>
                  {election.participants.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between pt-2 border-t border-border/30'>
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse' />
              <span className='text-xs sm:text-sm font-medium text-primary'>
                <span className='hidden sm:inline'>View Election Details</span>
                <span className='sm:hidden'>View Details</span>
              </span>
            </div>
            <ArrowRight className='w-3 h-3 sm:w-4 sm:h-4 text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300' />
          </div>
        </div>

        <div className='absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl' />
      </div>
    </Link>
  );
};

export default ElectionCard;
