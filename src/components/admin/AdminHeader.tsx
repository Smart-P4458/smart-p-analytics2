import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Bell,
  ShieldCheck,
  User,
  Settings,
  Mail,
  ChevronDown,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import AdminProfileSettings from "./AdminProfileSettings";

type AdminHeaderProps = {
  onMenuClick?: () => void;
};

type AdminProfile = {
  fullName: string;
  email: string;
  avatarUrl: string;
};

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=Pam+Sani+George&background=2563eb&color=ffffff&bold=true";

const DEFAULT_PROFILE: AdminProfile = {
  fullName: "Pam Sani George",
  email: "sanismartp1@gmail.com",
  avatarUrl: FALLBACK_AVATAR,
};

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profile, setProfile] =
    useState<AdminProfile>(DEFAULT_PROFILE);

  const profileRef = useRef<HTMLDivElement>(null);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const metadata = user.user_metadata ?? {};

      setProfile({
        fullName:
          typeof metadata.full_name === "string" &&
          metadata.full_name.trim()
            ? metadata.full_name.trim()
            : DEFAULT_PROFILE.fullName,

        email: user.email ?? DEFAULT_PROFILE.email,

        avatarUrl:
          typeof metadata.avatar_url === "string" &&
          metadata.avatar_url.trim()
            ? metadata.avatar_url
            : FALLBACK_AVATAR,
      });
    } catch (error) {
      console.error("Unable to load admin profile:", error);
    }
  };

  useEffect(() => {
    void loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const openProfile = () => {
    setIsProfileOpen((current) => !current);
  };

  const openSettings = () => {
    setIsProfileOpen(false);
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-[73px] items-center justify-between border-b border-slate-800/90 bg-[#020617]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open admin navigation"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-slate-800 hover:bg-slate-900 hover:text-white lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
                Admin Dashboard
              </h1>
            </div>

            <p className="hidden truncate text-xs text-slate-500 sm:block">
              Smart-P Analytics management centre
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* System status */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 sm:flex">
            <ShieldCheck
              size={15}
              className="text-emerald-400"
            />

            <span className="text-xs font-semibold text-emerald-400">
              System Online
            </span>
          </div>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#020617]" />
          </button>

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              aria-label="Open admin profile"
              aria-expanded={isProfileOpen}
              onClick={openProfile}
              className={`flex items-center gap-2 rounded-xl p-1.5 transition ${
                isProfileOpen
                  ? "bg-slate-900"
                  : "hover:bg-slate-900"
              }`}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                onError={(event) => {
                  event.currentTarget.src =
                    FALLBACK_AVATAR;
                }}
                className="h-9 w-9 rounded-full border border-slate-700 object-cover"
              />

              <div className="hidden min-w-0 text-left lg:block">
                <p className="max-w-[145px] truncate text-sm font-semibold text-white">
                  {profile.fullName}
                </p>

                <p className="text-[11px] text-slate-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`hidden text-slate-500 transition-transform lg:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[300px] overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl shadow-black/50">
                {/* Identity */}
                <div className="border-b border-slate-800 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName}
                      onError={(event) => {
                        event.currentTarget.src =
                          FALLBACK_AVATAR;
                      }}
                      className="h-12 w-12 rounded-full border border-slate-700 object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {profile.fullName}
                      </p>

                      <div className="mt-1 flex min-w-0 items-center gap-1.5">
                        <Mail
                          size={12}
                          className="shrink-0 text-slate-500"
                        />

                        <p className="truncate text-xs text-slate-500">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-800/80"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                      <User
                        size={17}
                        className="text-blue-400"
                      />
                    </span>

                    <span>
                      <span className="block text-sm font-medium text-slate-200">
                        Admin Profile
                      </span>

                      <span className="block text-xs text-slate-500">
                        View account information
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={openSettings}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-800/80"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                      <Settings
                        size={17}
                        className="text-slate-400"
                      />
                    </span>

                    <span>
                      <span className="block text-sm font-medium text-slate-200">
                        Profile Settings
                      </span>

                      <span className="block text-xs text-slate-500">
                        Manage your profile
                      </span>
                    </span>
                  </button>
                </div>

                {/* Status */}
                <div className="border-t border-slate-800 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Account status
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile settings */}
      <AdminProfileSettings
        isOpen={isSettingsOpen}
        onClose={closeSettings}
        onProfileUpdated={() => {
          void loadProfile();
        }}
      />
    </>
  );
}
