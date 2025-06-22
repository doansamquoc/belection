import { useState } from "react";
import { Button } from "../ui/button";
import getContract from "@/lib/contract";
import {
  Loader2,
  X,
  Plus,
  Trash2,
  Sparkles,
  Calendar,
  Vote,
  CircleAlert,
  RefreshCcw,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { ElectionOptionType } from "@/types/ElectionOptionType";
import DateAndTimePicker from "../DateAndTimePicker";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { generateUUID } from "@/utils/utils";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const createEmptyOption = () => ({
    text: "",
  });
  const [options, setOptions] = useState<ElectionOptionType[]>([
    createEmptyOption(),
    createEmptyOption(),
  ]);

  const optionsPlaceholder = [
    "Blinding Lights - The Weeknd",
    "The Twist - Chubby Checker",
    "Smooth - Santana featuring Rob Thomas",
    "Mack The Knife - Bobby Darin",
    "Uptown Funk - Mark Ronson featuring Bruno Mars",
    "How Do I Live - LeAnn Rimes",
    "Party Rock Anthem - LMFAO featuring Lauren Bennett & GoonRock",
    "I Gotta Feeling - The Black Eyed Peas",
    "Macarena (Bayside Boys mix) - Los Del Rio",
    "Shape of You - Ed Sheeran",
  ];

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((option, i) =>
        i === index ? { ...option, text: value } : option
      )
    );
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, createEmptyOption()]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearOptions = () => {
    setOptions([createEmptyOption(), createEmptyOption()]);
  };

  const [isCreating, setCreating] = useState(false);
  const [duration, setDuration] = useState<number>(0);

  async function createElection() {
    try {
      setCreating(true);
      const contract = getContract();
      const optionTexts = options.map((o) => o.text.trim()).filter(Boolean);
      const tx = await contract.createElection(
        generateUUID(),
        title,
        optionTexts,
        duration
      );
      const reicept = await tx.wait();
      console.log(reicept);
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  }

  const isFormValid =
    title.trim().length > 0 &&
    options.every((opt) => opt.text.trim().length > 0) &&
    duration >= 0 &&
    options.length >= 2;
  return (
    <div className='bg-card border rounded-xl p-4 space-y-8 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='space-y-2'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Vote className='w-5 h-5 text-primary' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-foreground'>
              Create Election
            </h1>
            <p className='text-sm text-muted-foreground'>
              Deploy your secure blockchain election with one click
            </p>
          </div>
        </div>
      </div>

      <form
        className='space-y-8'
        onSubmit={(e) => {
          e.preventDefault();
          createElection();
        }}
      >
        <div className='space-y-3'>
          <Label
            htmlFor='title'
            className='text-base font-medium flex items-center gap-2'
          >
            <Sparkles className='w-4 h-4' />
            Election Title
          </Label>
          <Input
            id='title'
            type='text'
            placeholder='e.g., Best Song in the World'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='text-base py-3 px-4 focus:ring-2 focus:ring-primary/20 border-2 transition-all duration-200'
            required
          />
        </div>

        <div className='space-y-4'>
          <Label className='text-base font-medium flex items-center gap-2'>
            <Vote className='w-4 h-4' />
            Answer Options
            <span className='text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground'>
              {options.length} options
            </span>
          </Label>

          <div className='space-y-3'>
            {options.map((option, index) => (
              <div className='flex gap-2 items-center group' key={index}>
                <div className='flex items-center justify-center w-8 h-8 bg-primary/10 text-primary text-sm font-medium rounded-full shrink-0'>
                  {index + 1}
                </div>
                <Input
                  type='text'
                  value={option.text}
                  placeholder={`e.g., ${
                    optionsPlaceholder[index % optionsPlaceholder.length]
                  }`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className='flex-1 border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                  required
                />
                {options.length > 2 && (
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    type='button'
                    onClick={() => handleRemoveOption(index)}
                    className='transition-opacity duration-200 hover:bg-destructive/10 hover:text-destructive'
                  >
                    <X className='w-4 h-4' />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className='flex gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={handleClearOptions}
              className='hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20'
            >
              <Trash2 className='w-4 h-4 mr-2' />
              Clear All
            </Button>
            <Button
              type='button'
              className='flex-1'
              onClick={handleAddOption}
              disabled={options.length >= 10}
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Option
            </Button>
          </div>
        </div>

        <div className='space-y-3'>
          <Label className='text-base font-medium flex items-center gap-2'>
            <Calendar className='w-4 h-4' />
            Election Deadline
          </Label>
          <DateAndTimePicker onChange={(d) => setDuration(d)} />
        </div>

        <div className='flex gap-3 pt-4 border-t border-border/50'>
          <Button
            type='reset'
            variant='outline'
            className='px-6'
            disabled={isCreating}
          >
            <RefreshCcw /> Reset
          </Button>
          <Button
            type='submit'
            className='flex-1 py-3 text-base font-medium relative overflow-hidden group'
            disabled={!isFormValid || isCreating}
          >
            <div className='flex items-center justify-center gap-2'>
              {isCreating ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Deploying...
                </>
              ) : (
                <>
                  <Vote className='w-4 h-4' />
                  Deploy Election
                </>
              )}
            </div>
          </Button>
        </div>
        {!isFormValid && (
          <Alert variant={"default"}>
            <CircleAlert />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>
              Please fill out all fields to deploy your election.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreateForm;
