import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserNavigation = () => {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className='flex gap-2'>
        <div className='w-30 h-9 rounded-md shimmer' />
        <div className='w-9 h-9 rounded-full shimmer' />
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-2'>
      <Button variant={"secondary"} asChild>
        <Link to={"/create"}>Create vote</Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className='cursor-pointer select-none'>
          <Avatar className='w-9 h-9'>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>{user?.email}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Hi, {user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Votes participated</DropdownMenuItem>
          <DropdownMenuItem variant='destructive' onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavigation;
