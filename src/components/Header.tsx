import { House } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import UserNavigation from "./navigations/UserNavigation";
import Logo from "./Logo";

const Header = () => {
  const location = useLocation();
  const isDashboard =
    location.pathname === "/" || location.pathname.startsWith("/page");

  return (
    <header className='border-b border-dashed'>
      <div className='w-full max-w-4xl mx-auto flex justify-between border-x border-dashed p-4'>
        {isDashboard ? (
          <Logo />
        ) : (
          <Button variant={"default"} size={"icon"} asChild>
            <Link to={"/"}>
              <House />
            </Link>
          </Button>
        )}
        <UserNavigation />
      </div>
    </header>
  );
};

export default Header;
