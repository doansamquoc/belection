import { LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import UserNavigation from "./navigations/UserNavigation";
import Logo from "./Logo";

const Header = () => {
  const location = useLocation();
  const isDashboard =
    location.pathname === "/" || location.pathname.startsWith("/page");

  return (
    <header className='border-b border-border/30 sticky top-0 bg-background/80 backdrop-blur-md z-50 transition-all duration-300'>
      <div className='w-full max-w-4xl mx-auto flex justify-between items-center px-6 py-4'>
        <div className='flex items-center gap-3'>
          {isDashboard ? (
            <div className='flex items-center gap-2'>
              <Logo />
              <div className='hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full'>
                <Sparkles className='w-3 h-3' />
                <span>Dashboard</span>
              </div>
            </div>
          ) : (
            <Button asChild>
              <Link to='/' className='flex items-center gap-2'>
                <LayoutDashboard className='w-4 h-4' />
                <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            </Button>
          )}
        </div>

        <UserNavigation />
      </div>
    </header>
  );
};

export default Header;
