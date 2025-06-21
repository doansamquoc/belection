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
import { BadgePlus, Settings, User } from "lucide-react";

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
    <div className='flex gap-3'>
      <Button>
        <BadgePlus /> Create
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='w-9 h-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200'>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className='bg-gradient-to-br from-primary to-purple-600 text-primary-foreground font-semibold text-sm'>
              {user?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='backdrop-blur-xl bg-background/80 border-border/60'
          sideOffset={8}
        >
          <DropdownMenuLabel className='flex flex-col gap-1'>
            <span className='text-sm'>Hi, {user?.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='gap-2 cursor-pointer hover:bg-primary/10'>
            <User className='w-4 h-4' />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2 cursor-pointer hover:bg-primary/10'>
            <Settings className='w-4 h-4' />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive' onClick={logout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavigation;
