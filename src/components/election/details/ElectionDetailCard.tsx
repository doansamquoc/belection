import { Alert, AlertDescription } from "@/components/ui/alert";
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

    try {
      const contract = getContract();
      const tx = await contract.vote(electionId, selectedOption);
      await tx.wait();

      setElectionState((prevElection) => {
        const newElection = { ...prevElection };

        newElection.participants += 1;
        newElection.hasVoted = true;
        newElection.votedOptionId = selectedOption;
        return newElection;
      });
    } catch (error) {
      setElectionState(previousElectionState);
      console.error("Error voting:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card>
      <CardHeader className='space-y-3'>
        <div className='flex gap-2'>
          {electionState.hasVoted && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              <CheckCircle className='h-3 w-3' />
              Voted
            </Badge>
          )}
          {expired && <Badge variant='destructive'>Expired</Badge>}
        </div>

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
                electionState.hasVoted && index === electionState.votedOptionId;

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

          <div className='flex flex-col sm:flex-row gap-3 pt-4'>
            <Button
              onClick={handleVote}
              disabled={!canVote || isVoting}
              size='lg'
              className='grow'
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
            {electionState.hasVoted || expired ? (
              <Button variant='outline' size='lg' className='grow'>
                <ChartArea /> View Results
              </Button>
            ) : (
              ""
            )}
          </div>
        </section>

        {electionState.hasVoted && (
          <Alert>
            <CheckCircle className='h-4 w-4' />
            <AlertDescription>
              You have already voted. Your vote has been recorded.
            </AlertDescription>
          </Alert>
        )}

        {expired && !electionState.hasVoted && (
          <Alert>
            <Clock className='h-4 w-4' />
            <AlertDescription>
              This election has ended. You can no longer vote.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ElectionDetailCard;
