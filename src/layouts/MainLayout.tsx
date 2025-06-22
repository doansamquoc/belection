import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95'>
      <Header />
      <main className='flex flex-col flex-1 max-w-4xl w-full mx-auto p-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
