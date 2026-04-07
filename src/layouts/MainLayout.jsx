import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <main className="pt-28">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;