import { ModeToggle } from "./ModeToggle";

const Footer = () => {
  return (
    <footer className='border-t border-dashed'>
      <div className='w-full max-w-4xl mx-auto flex justify-between items-center border-x border-dashed p-4'>
        <span className='text-sm'>
          Built by{" "}
          <a href='https://github.com/doansamquoc' className='underline'>
            Sam
          </a>
        </span>
        <ModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
