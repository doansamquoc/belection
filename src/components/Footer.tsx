import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import {
  Heart,
  Github,
  Mail,
  Coffee,
  Mouse,
  Keyboard,
  Code2,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/doansamquoc", label: "GitHub" },
    { icon: Mail, href: "mailto:doansamquoc@gmail.com", label: "Email" },
  ];

  return (
    <footer className='border-t border-border/50 bg-gradient-to-r from-background/80 via-background/90 to-background/80'>
      <div className='w-full max-w-6xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div className='flex flex-col space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center justify-center'>
                <Code2 size={30} />
              </div>
              <span className='font-bold text-lg'>BElection.</span>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>
              A modern voting platform built to make decision-making simple,
              transparent, and accessible for everyone.
            </p>
          </div>

          <div className='flex flex-col space-y-4 md:mx-auto'>
            <h3 className='font-semibold text-sm uppercase tracking-wider text-foreground/80'>
              Connect
            </h3>
            <div className='flex gap-2'>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant='secondary'
                  size={"icon"}
                  className='bg-muted/20'
                  asChild
                >
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-3'
                  >
                    <Icon />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className='flex flex-col space-y-4 md:mx-auto'>
            <h3 className='font-semibold text-sm uppercase tracking-wider text-foreground/80'>
              Settings
            </h3>
            <ModeToggle />
          </div>
        </div>

        <div className='border-t border-border/30 mb-6'></div>

        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <span>Crafted with</span>
            <Heart className='w-4 h-4 text-red-500 fill-current animate-pulse' />
            <span>and</span>
            <Coffee className='w-4 h-4 text-amber-600' />
            <span>by</span>
            <Button
              variant='link'
              asChild
              className='p-0 h-auto font-semibold text-foreground hover:text-primary'
            >
              <a
                href='https://github.com/doansamquoc'
                target='_blank'
                rel='noopener noreferrer'
              >
                Sam
              </a>
            </Button>
          </div>

          <div className='text-xs text-muted-foreground flex items-center gap-4'>
            <span>© 2025 BElection.</span>
            <span>•</span>
            <span className='flex items-center gap-2'>
              Made with <Mouse className='w-4 h-4 text-amber-600' /> and
              <Keyboard className='w-4 h-4 text-white' />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
