import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ElectionDetailType } from "@/types/ElectionDetailType";
import { formatDate, shortenAddress } from "@/utils/utils";
import {
  AlertCircle,
  Calendar,
  ChartArea,
  CheckCircle,
  Clock,
  Loader2,
  Send,
  User,
  Users,
  Vote,
} from "lucide-react";
import InfoBlock from "./InfoBlock";
import { useState } from "react";
import getContract from "@/lib/contract";
import VoteResultPieChart from "./ElectionResultPieChart";
import { provider } from "@/lib/magic";

interface ElectionDetailCardProps {
  electionId: string;
  election: ElectionDetailType;
}

const ElectionDetailCard = ({
  electionId,
  election,
}: ElectionDetailCardProps) => {
  const [electionState, setElectionState] =
    useState<ElectionDetailType>(election);
  const previousElectionState: ElectionDetailType = { ...election };
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    electionState.hasVoted ? Number(electionState.votedOptionId) : undefined
  );
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState("");

  const expired =
    electionState?.deadline !== 0 &&
    electionState?.deadline! < Math.floor(Date.now() / 1000);

  const canVote =
    electionState &&
    !electionState.hasVoted &&
    !expired &&
    selectedOption !== undefined;

  const handleVote = async () => {
    if (selectedOption === undefined || !electionState) return;
    setIsVoting(true);
    setError("");

    try {
      const signer = provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.vote(electionId, selectedOption);
      await tx.wait();

      setElectionState((prevElection) => {
        const newElection = { ...prevElection };

        newElection.options = newElection.options.map((option, index) => {
          if (index === selectedOption) {
            return {
              ...option,
              voteCount: (option.voteCount || 0) + 1,
            };
          }
          return option;
        });
        newElection.participants += 1;
        newElection.hasVoted = true;
        newElection.votedOptionId = selectedOption;
        return newElection;
      });
    } catch (error: any) {
      setElectionState(previousElectionState);
      console.error("Error voting:", error);

      console.error("Transaction failed:", error);

      let message = "An unexpected error occurred.";

      if (error.code === 4001) {
        message = "User rejected the transaction.";
      } else if (error.message?.includes("paymaster")) {
        message = "Paymaster rejected the operation. Please try again.";
      } else if (error.message?.includes("gas")) {
        message = "Gas estimation failed. Please try again.";
      } else if (error.message?.includes("network")) {
        message = "Network error. Please check your connection.";
      }

      setError(message);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <Card className='bg-muted/10'>
        <CardHeader className='space-y-3'>
          {(electionState.hasVoted || expired) && (
            <div className='flex gap-2'>
              {electionState.hasVoted && (
                <Badge variant='secondary' className='flex items-center gap-1'>
                  <CheckCircle className='h-3 w-3' />
                  Voted
                </Badge>
              )}
              {expired && <Badge variant='destructive'>Expired</Badge>}
            </div>
          )}

          <div className='flex flex-col gap-1'>
            <CardTitle className='text-xl break-words'>
              {electionState.title}
            </CardTitle>
            <CardDescription className='flex items-center gap-2 text-sm'>
              <User className='h-4 w-4' />
              <span
                className='truncate max-w-[160px] text-muted-foreground'
                title={electionState.creator}
              >
                Created by {shortenAddress(electionState.creator)}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <InfoBlock
              icon={<Calendar className='h-4 w-4' />}
              label='Created'
              value={formatDate(electionState.createdAt)}
            />
            <InfoBlock
              icon={<Clock className='h-4 w-4' />}
              label='Deadline'
              value={formatDate(electionState.deadline)}
              valueClass={expired ? "text-destructive" : ""}
            />
            <InfoBlock
              icon={<Users className='h-4 w-4' />}
              label='Participants'
              value={electionState.participants}
            />
          </div>

          <section className='space-y-4'>
            <h4 className='text-md font-semibold flex items-center gap-2'>
              <Vote className='h-5 w-5' />
              Make a choice
            </h4>

            <RadioGroup
              value={selectedOption?.toString()}
              onValueChange={(val) => setSelectedOption(Number(val))}
              disabled={electionState.hasVoted || expired}
            >
              {electionState.options.map((option, index) => {
                const isSelected = index === selectedOption;
                const isVoted =
                  electionState.hasVoted &&
                  index === electionState.votedOptionId;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center rounded-lg border transition-all
                    ${
                      isSelected
                        ? "bg-primary/5 border-primary"
                        : "border-border hover:border-muted"
                    }
                    ${
                      electionState.hasVoted || expired
                        ? "opacity-70"
                        : "cursor-pointer"
                    }
                  `}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className='mt-0.5 ml-4'
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className='flex-1 cursor-pointer font-medium p-4'
                    >
                      {option.text}
                    </Label>
                    {isVoted && (
                      <Badge variant='secondary' className='ml-2 mr-4'>
                        Your vote
                      </Badge>
                    )}
                  </div>
                );
              })}
            </RadioGroup>

            <Button
              onClick={handleVote}
              disabled={!canVote || isVoting}
              size='lg'
              className='w-full'
            >
              {isVoting ? (
                <>
                  <Loader2 className='animate-spin' /> Submitting ...
                </>
              ) : (
                <>
                  <Send /> Submit Vote
                </>
              )}
            </Button>
          </section>

          {error && (
            <Alert variant={"destructive"} className='bg-muted/10'>
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {electionState.hasVoted && (
            <Alert className='bg-muted/10'>
              <CheckCircle className='h-4 w-4' />
              <AlertDescription>
                You have already voted. Your vote has been recorded.
              </AlertDescription>
            </Alert>
          )}

          {expired && !electionState.hasVoted && (
            <Alert className='bg-muted/10'>
              <Clock className='h-4 w-4' />
              <AlertDescription>
                This election has ended. You can no longer vote.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {(electionState.hasVoted || expired) && (
        <Card className='bg-muted/10'>
          <CardContent>
            <div className='flex gap-3 items-center'>
              <div className='p-2 rounded-md bg-muted'>
                <ChartArea />
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Election results</h3>
                <p className='text-sm text-muted-foreground'>
                  Election results will always be fair and transparent.
                </p>
              </div>
            </div>

            <VoteResultPieChart options={electionState.options} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElectionDetailCard;
