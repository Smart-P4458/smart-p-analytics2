import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { supabase } from "../../lib/supabase";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      const email =
        session?.user.email?.trim().toLowerCase();

      if (
        session &&
        email === "sanismartp1@gmail.com"
      ) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setCheckingAuth(false);
    };

    void checkAuthentication();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const email =
          session?.user.email?.trim().toLowerCase();

        setIsAuthenticated(
          Boolean(
            session &&
              email === "sanismartp1@gmail.com"
          )
        );

        setCheckingAuth(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-sm text-slate-400">
          Verifying admin access...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="min-h-screen lg:pl-64">
        <AdminHeader onMenuClick={openSidebar} />

        <main className="min-h-[calc(100vh-73px)] overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
