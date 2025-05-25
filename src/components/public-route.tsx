import { useAtomValue } from "jotai";
import { Navigate, useLocation } from "react-router-dom";
import { authState } from "@/state";
import { useEffect, useState } from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const auth = useAtomValue(authState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
