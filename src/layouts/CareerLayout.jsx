import { Outlet } from "react-router-dom";
import CareerNavbar from "@/components/careerComponents/Navbar";
import Footer from "@/components/common/Footer";

const CareerLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <CareerNavbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CareerLayout;