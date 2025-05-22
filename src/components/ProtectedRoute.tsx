import { useAtomValue } from "jotai";
import { Navigate, useLocation } from "react-router-dom";
import { authState } from "@/state";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogin } = useAtomValue(authState);
  const location = useLocation();

  if (isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
