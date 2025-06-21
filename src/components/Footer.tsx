import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Heart, Github, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/doansamquoc", label: "GitHub" },
    { icon: Mail, href: "mailto:doansamquoc@gmail.com", label: "Email" },
  ];

  return (
    <footer className='border-t border-border/50 bg-gradient-to-r from-background/80 via-background/90 to-background/80'>
      <div className='w-full max-w-6xl mx-auto px-6 py-8'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8'>
          <div className='flex flex-col md:flex-row justify-between w-full gap-6'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground group'>
              <span>Built with</span>
              <Heart className='w-4 h-4 text-red-500 fill-current group-hover:scale-125 transition-transform duration-300 animate-pulse' />
              <span>and lots of</span>
              <span className='text-primary font-medium'>☕</span>
              <span>by</span>
              <Button
                variant='link'
                asChild
                className='p-0 h-auto font-semibold text-foreground hover:text-primary transition-colors duration-200'
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

            <div className='flex items-center gap-2'>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant='ghost'
                  size='icon'
                  asChild
                  className='w-9 h-9 hover:bg-primary/10 hover:text-primary transition-all duration-200 group'
                >
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                  >
                    <Icon className='w-4 h-4 group-hover:scale-110 transition-transform duration-200' />
                  </a>
                </Button>
              ))}
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
