import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import DarshaiLoader from "@/components/ui/loader/DarshaiLoader";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <DarshaiLoader />}
      <Outlet /> 
    </>
  );
};

export default RouteLoader;