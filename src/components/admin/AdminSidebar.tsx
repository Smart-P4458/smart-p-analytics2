import {
  BarChart3,
  MessageSquare,
  Mail,
  HelpCircle,
  AlertTriangle,
  LayoutDashboard,
  X,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

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
    path: "/admin/failures",
    icon: AlertTriangle,
  },
];

export default function AdminSidebar({
  isOpen = true,
  onClose,
}: AdminSidebarProps) {
  return (
    <>
      {isOpen && onClose && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-72
          border-r
          border-slate-800
          bg-slate-950
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex h-[73px] items-center justify-between border-b border-slate-800 px-6">
            <div>
              <p className="text-lg font-bold text-white">
                Smart-P Analytics
              </p>

              <p className="text-xs text-slate-500">
                Admin Dashboard
              </p>
            </div>

            {onClose && (
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
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
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} />

                  <span>
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-800 p-4">
            <div className="rounded-xl bg-slate-900 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                  <BarChart3 size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Smart-P AI
                  </p>

                  <p className="text-xs text-slate-500">
                    System monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}