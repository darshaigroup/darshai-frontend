import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import DarshaiLoader from "@/components/ui/loader/DarshaiLoader";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // smoother UX (not 2s)

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <DarshaiLoader />;

  return <Outlet />;
};

export default RouteLoader;