import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ElectionDetailSkeleton = () => {
  return (
    <div className='space-y-6'>
      <Card className='bg-muted/10'>
        <CardHeader>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-4'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-32' />
          </div>
          <Skeleton className='h-20 w-full' />
          <Skeleton className='h-20 w-full' />
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectionDetailSkeleton;
