import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import { isAuthenticated } from "../utils/auth";

const MainLayout = () => {
   const loggedIn = isAuthenticated();
  return (
    <div className="bg-gray-100 min-h-screen">
     {!loggedIn && <Navbar />}

      <main className="pt-28">
        <Outlet />
      </main>

        {!loggedIn && <Footer />}
    </div>
  );
};

export default MainLayout;