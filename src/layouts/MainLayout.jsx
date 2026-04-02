import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="bg-lightBg min-h-screen">
      <Navbar />
      
      {/* Add padding so content not hidden behind fixed navbar */}
      <main className="pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;