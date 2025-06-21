import { ModeToggle } from "./ModeToggle";
import { Heart, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className='border-t border-border/30 bg-muted/20'>
      <div className='w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center border-x border-border/30 px-6 py-6 gap-4'>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <span className='flex items-center gap-1'>
            Built with <Heart className='w-3 h-3 text-red-500 fill-current' />{" "}
            by{" "}
            <a
              href='https://github.com/doansamquoc'
              className='text-foreground hover:text-primary transition-colors duration-200 font-medium underline underline-offset-2 decoration-primary/30 hover:decoration-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Sam
            </a>
          </span>
          <a
            href='https://github.com/doansamquoc'
            className='text-muted-foreground hover:text-foreground transition-colors duration-200'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Github className='w-4 h-4' />
          </a>
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-xs text-muted-foreground hidden sm:inline'>
            Theme
          </span>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
