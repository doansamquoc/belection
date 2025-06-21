import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95'>
      <Header />
      <main className='flex flex-col flex-1 max-w-4xl w-full mx-auto border-x border-border/30 p-4 relative'>
        <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none' />
        <div className='relative z-10'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
