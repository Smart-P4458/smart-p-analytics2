import {
  Menu,
  Bell,
  ShieldCheck,
} from "lucide-react";

type AdminHeaderProps = {
  onMenuClick?: () => void;
};

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[73px] items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open admin menu"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-white sm:text-lg">
            Admin Dashboard
          </h1>

          <p className="hidden truncate text-xs text-slate-500 sm:block">
            Smart-P Analytics management centre
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        {/* System status */}
        <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 sm:flex">
          <ShieldCheck
            size={16}
            className="text-green-400"
          />

          <span className="text-xs font-medium text-green-400">
            System Online
          </span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        {/* Admin avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          P
        </div>
      </div>
    </header>
  );
}