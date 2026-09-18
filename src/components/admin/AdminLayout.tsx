import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";

import { supabase } from "../../lib/supabase";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const ADMIN_EMAIL = "sanismartp1@gmail.com";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        const email = session?.user.email?.trim().toLowerCase();

        const authorized = Boolean(
          session && email === ADMIN_EMAIL.toLowerCase(),
        );

        setIsAuthenticated(authorized);
      } catch (error) {
        console.error("Admin authentication check failed:", error);

        if (mounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    void checkAuthentication();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      const email = session?.user.email?.trim().toLowerCase();

      const authorized = Boolean(
        session && email === ADMIN_EMAIL.toLowerCase(),
      );

      setIsAuthenticated(authorized);
      setCheckingAuth(false);
    });

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

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);
      setLogoutError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setIsAuthenticated(false);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Admin logout failed:", error);

      setLogoutError(
        "Unable to sign out. Please try again.",
      );

      setIsLoggingOut(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#020617] text-white">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
          </div>

          <p className="text-sm font-semibold text-white">
            Smart-P Analytics
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Verifying administrator access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[#020617] text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* =====================================================
          MAIN APPLICATION
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* HEADER */}

        <AdminHeader onMenuClick={openSidebar} />

        {/* ===================================================
            CONTENT AREA
        ==================================================== */}

        <main className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          {/* Background glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
          >
            <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-600/[0.045] blur-[110px]" />

            <div className="absolute bottom-[-160px] left-[280px] h-[360px] w-[360px] rounded-full bg-cyan-500/[0.025] blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* =====================================================
          LOGOUT ERROR
      ====================================================== */}

      {logoutError && (
        <div className="fixed bottom-20 right-4 z-[80] max-w-sm rounded-xl border border-red-500/20 bg-red-950/95 px-4 py-3 text-sm text-red-300 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {logoutError}
        </div>
      )}

      {/* =====================================================
          SIGN OUT
      ====================================================== */}

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Sign out of admin dashboard"
        className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/95 px-4 py-2.5 text-sm font-semibold text-slate-300 shadow-xl shadow-black/30 backdrop-blur-xl transition hover:border-red-500/30 hover:bg-red-950/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut
          size={16}
          className={isLoggingOut ? "animate-pulse" : ""}
        />

        {isLoggingOut ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
