import { Home } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='text-center max-w-md mx-auto space-y-8'>
        <div className='space-y-4'>
          <h1 className='text-8xl font-bold text-muted-foreground'>404</h1>
          <h2 className='text-2xl font-semibold'>Page Not Found</h2>
          <p className='text-muted-foreground'>
            The page you're looking for doesn't exist.
          </p>
        </div>

        <div className='space-y-3'>
          <Button
            size={"lg"}
            className='flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'
            asChild
          >
            <Link to={"/"}>
              <Home className='w-4 h-4' />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
