import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

function GuestRoute() {
  const { isAuthenticated, setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
      setIsLoading(true);
    }
  }, [isAuthenticated, navigate, setIsLoading]);

  return <Outlet />;
}

export default GuestRoute;
