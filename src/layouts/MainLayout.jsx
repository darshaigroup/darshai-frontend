import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

<<<<<<< HEAD
      <main>
        <Outlet />
      </main>

=======
      <main className="pt-[110px]">
  <Outlet />
</main>
>>>>>>> feature/new/home
      <Footer />
    </div>
  );
};

export default MainLayout;