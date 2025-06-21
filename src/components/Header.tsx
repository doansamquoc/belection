import { LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import UserNavigation from "./navigations/UserNavigation";
import Logo from "./Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDashboard =
    location.pathname === "/" || location.pathname.startsWith("/page");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-primary/5"
          : "bg-background/60 backdrop-blur-md border-b border-border/40"
      }`}
    >
      <div className='w-full max-w-6xl mx-auto flex justify-between items-center px-6 py-4'>
        <div className='flex items-center gap-4'>
          {isDashboard ? (
            <div className='flex items-center gap-4'>
              <div className='group cursor-pointer'>
                <Logo />
              </div>
            </div>
          ) : (
            <Button
              asChild
              variant='outline'
              className='group border-primary/20 hover:border-primary/40 hover:bg-primary/5'
            >
              <Link to='/' className='flex items-center gap-2'>
                <LayoutDashboard className='w-4 h-4 group-hover:scale-110 transition-transform duration-200' />
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
