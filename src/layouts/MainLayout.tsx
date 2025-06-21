import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col mx-auto'>
      <Header />
      <main className='flex flex-col flex-1 max-w-4xl w-full mx-auto border-x border-dashed'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
