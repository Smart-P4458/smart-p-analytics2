import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Admin Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />

          <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}