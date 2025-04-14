
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Sistem Monitoring Qurban</h1>
            <nav className="flex space-x-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100"
                  )
                }
              >
                <Home size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100"
                  )
                }
              >
                <Settings size={18} />
                <span>Admin</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Card className="p-6">
          {children}
        </Card>
      </main>
      <footer className="bg-white shadow-sm mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Sistem Monitoring Qurban. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
