const ElectionCardSkeleton = () => {
  return (
    <div className='bg-card border rounded-lg p-6 animate-pulse'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <div className='h-6 bg-muted rounded-md w-3/4' />
          <div className='h-6 bg-muted rounded-md w-1/2' />
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-muted rounded' />
            <div className='h-4 bg-muted rounded w-24' />
          </div>

          <div className='w-1 h-1 bg-muted rounded-full hidden sm:block' />

          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-muted rounded' />
            <div className='h-4 bg-muted rounded w-20' />
          </div>

          <div className='w-1 h-1 bg-muted rounded-full hidden sm:block' />

          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-muted rounded' />
            <div className='h-4 bg-muted rounded w-16' />
          </div>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-border/50'>
        <div className='h-4 bg-muted rounded w-24' />
      </div>
    </div>
  );
};

export default ElectionCardSkeleton;
