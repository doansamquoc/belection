import { AlertCircleIcon, Calendar, X } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface DateAndTimePickerProps {
  onChange?: (durationSeconds: number) => void;
}

const DateAndTimePicker = ({ onChange }: DateAndTimePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [display, setDisplay] = useState<string>("");
  const [isInvalidDeadline, setInvalidDeadline] = useState(false);

  const openPicker = () => inputRef.current?.showPicker();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    const selected = new Date(dateStr).getTime();
    const now = Date.now();

    const durationSeconds = Math.floor((selected - now) / 1000);

    if (durationSeconds <= 0) {
      setInvalidDeadline(true);
    } else {
      setInvalidDeadline(false);
    }

    setDisplay(dateStr);
    onChange?.(durationSeconds);
  };

  const clearDeadline = () => {
    setInvalidDeadline(false);
    setDisplay("");
    onChange?.(0);
  };

  return (
    <div className='space-y-4'>
      <div className='relative flex gap-2'>
        <Input
          className='border-2'
          placeholder='Deadline'
          value={
            display
              ? new Date(display).toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })
              : "No deadline"
          }
          readOnly
        />
        <Button type='button' onClick={openPicker} size='icon'>
          <Calendar />
        </Button>
        {display && (
          <Button
            type='button'
            onClick={clearDeadline}
            variant='outline'
            size='icon'
          >
            <X />
          </Button>
        )}

        <input
          ref={inputRef}
          type='datetime-local'
          className='invisible absolute bottom-0'
          onChange={handleChange}
        />
      </div>
      {isInvalidDeadline && (
        <Alert variant='destructive'>
          <AlertCircleIcon />
          <AlertTitle>Invalid deadline.</AlertTitle>
          <AlertDescription>
            <ul className='list-inside list-disc text-sm'>
              <li>Please select a future time.</li>
              <li>Or ignore the deadline, the vote will never expire.</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DateAndTimePicker;
