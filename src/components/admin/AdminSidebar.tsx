import {
  BarChart3,
  MessageSquare,
  Mail,
  HelpCircle,
  AlertTriangle,
  LayoutDashboard,
  X,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

type AdminSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const navigation = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Conversations",
    path: "/admin/conversations",
    icon: MessageSquare,
  },
  {
    name: "Contact Inbox",
    path: "/admin/contacts",
    icon: Mail,
  },
  {
    name: "Unanswered Questions",
    path: "/admin/unanswered",
    icon: HelpCircle,
  },
  {
    name: "Automation Failures",
    path: "/admin/automation-failures",
    icon: AlertTriangle,
  },
];

export default function AdminSidebar({
  isOpen = false,
  onClose,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-64
          border-r
          border-slate-800/90
          bg-[#020617]
          shadow-2xl
          shadow-black/30
          transition-transform
          duration-300
          ease-in-out
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col">
          {/* =====================================================
              BRAND
          ====================================================== */}
          <div className="flex h-[73px] shrink-0 items-center border-b border-slate-800/90 px-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {/* Logo */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                <img
                  src="/branding/Smart-P-Logo.png"
                  alt="Smart-P Analytics"
                  className="h-10 w-10 object-contain transition duration-300 hover:scale-105"
                />
              </div>

              {/* Brand text */}
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold tracking-tight text-white">
                  Smart-P Analytics
                </p>

                <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500">
                  Admin Dashboard
                </p>
              </div>
            </div>

            {/* Mobile close */}
            <button
              type="button"
              aria-label="Close admin menu"
              onClick={onClose}
              className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-900 hover:text-white lg:hidden"
            >
              <X size={19} />
            </button>
          </div>

          {/* =====================================================
              NAVIGATION
          ====================================================== */}
          <nav className="flex-1 overflow-y-auto px-3 py-5">
            {/* Section label */}
            <div className="mb-3 px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Management
              </p>
            </div>

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      group
                      relative
                      flex
                      min-h-11
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                      }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-white" />
                        )}

                        {/* Icon container */}
                        <span
                          className={`
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            transition
                            ${
                              isActive
                                ? "bg-white/10"
                                : "bg-slate-900/60 group-hover:bg-slate-800"
                            }
                          `}
                        >
                          <Icon
                            size={18}
                            strokeWidth={isActive ? 2.2 : 1.8}
                          />
                        </span>

                        {/* Label */}
                        <span className="min-w-0 flex-1 truncate">
                          {item.name}
                        </span>

                        {/* Active arrow */}
                        {isActive && (
                          <ChevronRight
                            size={15}
                            className="shrink-0 text-blue-100"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* =====================================================
              FOOTER / SMART-P AI
          ====================================================== */}
          <div className="shrink-0 border-t border-slate-800/90 p-3">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5">
              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-600/10 blur-2xl"
              />

              <div className="relative flex items-center gap-3">
                {/* AI icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <BarChart3
                    size={19}
                    strokeWidth={2}
                  />
                </div>

                {/* AI information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-white">
                      Smart-P AI
                    </p>

                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  </div>

                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    System monitoring
                  </p>
                </div>
              </div>
            </div>

            {/* Version */}
            <p className="mt-3 text-center text-[10px] font-medium tracking-wide text-slate-700">
              SMART-P ANALYTICS · ADMIN
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
