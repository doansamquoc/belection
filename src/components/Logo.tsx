import { Button } from "./ui/button";

const Logo = () => {
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <a href='/'>
        <img src='/logo-white.svg' alt='Logo' className='w-6 h-6' />
      </a>
    </Button>
  );
};

export default Logo;
