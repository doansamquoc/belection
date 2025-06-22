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
import { Calendar, CheckCircle, Clock, User, Users, Vote } from "lucide-react";
import InfoBlock from "./InfoBlock";
import { useState } from "react";
import getContract from "@/lib/contract";

interface ElectionDetailCardProps {
  electionId: string;
  election: ElectionDetailType;
  selected: number;
  fetchElection: () => Promise<void>;
}

const ElectionDetailCard = ({
  electionId,
  election,
  selected,
  fetchElection,
}: ElectionDetailCardProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);

  const expired =
    election?.deadline !== 0 &&
    election?.deadline! < Math.floor(Date.now() / 1000);
  const canVote =
    election && !election.hasVoted && !expired && selectedOption !== undefined;

  const handleVote = async () => {
    if (selectedOption === undefined || !election) return;
    setIsVoting(true);
    try {
      const contract = getContract();
      const tx = await contract.vote(electionId, selectedOption);
      const reicept = await tx.wait();
      console.log(reicept);
      await fetchElection();
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsVoting(false);
    }
  };
  return (
    <Card>
      <CardHeader className='space-y-3'>
        <div className='flex gap-2'>
          {election.hasVoted && (
            <Badge variant='secondary' className='flex items-center gap-1'>
              <CheckCircle className='h-3 w-3' />
              Voted
            </Badge>
          )}
          {expired && <Badge variant='destructive'>Expired</Badge>}
        </div>

        <div className='flex flex-col gap-1'>
          <CardTitle className='text-xl break-words'>
            {election.title}
          </CardTitle>
          <CardDescription className='flex items-center gap-2 text-sm'>
            <User className='h-4 w-4' />
            <span
              className='truncate max-w-[160px] text-muted-foreground'
              title={election.creator}
            >
              Created by {shortenAddress(election.creator)}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <InfoBlock
            icon={<Calendar className='h-4 w-4' />}
            label='Created'
            value={formatDate(election.createdAt)}
          />
          <InfoBlock
            icon={<Clock className='h-4 w-4' />}
            label='Deadline'
            value={formatDate(election.deadline)}
            valueClass={expired ? "text-destructive" : ""}
          />
          <InfoBlock
            icon={<Users className='h-4 w-4' />}
            label='Participants'
            value={election.participants}
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
            disabled={election.hasVoted || expired}
          >
            {election.options.map((option, index) => {
              const isSelected = index === selectedOption;
              const isVoted =
                election.hasVoted && index === election.votedOptionId;

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
                      election.hasVoted || expired
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
              className='flex-1'
            >
              {isVoting ? "Submitting..." : "Submit Vote"}
            </Button>
            {election.hasVoted || expired ? (
              <Button variant='outline' size='lg' className='flex-1'>
                View Results
              </Button>
            ) : (
              ""
            )}
          </div>
        </section>

        {election.hasVoted && (
          <Alert>
            <CheckCircle className='h-4 w-4' />
            <AlertDescription>
              You have already voted. Your vote has been recorded.
            </AlertDescription>
          </Alert>
        )}

        {expired && !election.hasVoted && (
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
