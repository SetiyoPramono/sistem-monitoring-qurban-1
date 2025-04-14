
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Settings, User } from "lucide-react";
import { isAuthenticated } from "@/utils/auth";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [open, setOpen] = useState(false);
  const isAdmin = isAuthenticated();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="sticky top-0 z-10 w-full bg-white border-b shadow-sm">
        <div className="container flex h-16 items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="mr-4 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link to="/" className="flex items-center gap-2 py-2" onClick={() => setOpen(false)}>
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                {isAdmin ? (
                  <Link to="/admin" className="flex items-center gap-2 py-2" onClick={() => setOpen(false)}>
                    <Settings className="h-5 w-5" />
                    Admin
                  </Link>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 py-2" onClick={() => setOpen(false)}>
                    <User className="h-5 w-5" />
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            Sistem Monitoring Qurban
          </Link>
          <nav className="ml-auto hidden md:flex gap-4 font-medium">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            {isAdmin ? (
              <Link to="/admin" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
      <footer className="mt-auto py-6 border-t bg-white">
        <div className="container text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Sistem Monitoring Qurban. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
