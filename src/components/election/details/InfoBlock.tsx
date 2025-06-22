import React from "react";

interface InfoBlockProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueClass?: string;
}

const InfoBlock = ({ icon, label, value, valueClass = "" }: InfoBlockProps) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='bg-muted p-3 rounded-md'>{icon}</div>
      <div className='text-sm space-y-1'>
        <p className='font-medium'>{label}</p>
        <p className={`text-muted-foreground ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
};

export default InfoBlock;
