
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Authentication required", {
        description: "Please login to access the admin page"
      });
      navigate("/login");
    }
  }, [navigate]);

  return isAuthenticated() ? <>{children}</> : null;
};

export default ProtectedRoute;
