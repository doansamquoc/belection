import { Calendar } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const DateAndTimePicker = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [deadline, setDeadline] = useState("");
  console.log(new Date(deadline).toLocaleString());
  const openPicker = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div className='relative flex gap-2'>
      <Input
        className='border-2'
        placeholder='Deadline'
        value={deadline ? new Date(deadline).toLocaleString() : "No deadline"}
        readOnly
        required
      />
      <Button type='button' onClick={openPicker} size={"icon"} className='w-20'>
        <Calendar />
      </Button>

      <input
        ref={inputRef}
        type='datetime-local'
        className='invisible absolute bottom-0'
        onChange={(e) => setDeadline(e.target.value)}
      />
    </div>
  );
};

export default DateAndTimePicker;
