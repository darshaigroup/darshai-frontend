import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
       
    </Routes>
  );
};

export default AppRoutes;
