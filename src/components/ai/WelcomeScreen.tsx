import {
  User,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Download,
  Phone,
} from "lucide-react";

const menuItems = [
  {
    icon: User,
    title: "About Me",
  },
  {
    icon: FolderKanban,
    title: "Projects",
  },
  {
    icon: Briefcase,
    title: "Services",
  },
  {
    icon: GraduationCap,
    title: "Certificates",
  },
  {
    icon: Download,
    title: "Resume",
  },
  {
    icon: Phone,
    title: "Contact",
  },
];

export default function WelcomeScreen() {
  return (
    <div className="flex h-full flex-col">
      {/* Profile */}

      <div className="px-8 pt-8 text-center">
        <div className="relative mx-auto h-24 w-24">
          <img
            src="/images/profile/psg.jpg"
            alt="Pam Sani George"
            className="
              h-full
              w-full
              rounded-full
              border-4
              border-blue-500
              object-cover
              shadow-xl
              shadow-blue-500/20
            "
          />

          <span
            className="
              absolute
              bottom-1
              right-1
              h-5
              w-5
              rounded-full
              border-4
              border-slate-950
              bg-green-400
            "
          />

          <span
            className="
              absolute
              bottom-1
              right-1
              h-5
              w-5
              animate-ping
              rounded-full
              bg-green-400
            "
          />
        </div>

        <h2 className="mt-5 text-xl font-bold text-white">
          Pam Sani George
        </h2>

        <p className="mt-1 text-blue-400">
          Smart-P AI
        </p>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-400
          "
        >
          Your intelligent assistant for exploring my
          portfolio, projects, services, certifications
          and professional journey.
        </p>
      </div>

      {/* Divider */}

      <div className="mx-8 my-5 border-t border-slate-800" />

      {/* Menu */}

<div className="flex-1 px-5 overflow-y-auto">
  <div className="space-y-1.5">
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <button
          key={item.title}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            border
            border-slate-800
            bg-slate-900/60
            px-3
            py-2
            text-left
            transition-all
            duration-300
            hover:border-blue-500/40
            hover:bg-slate-800
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-blue-500/10
              text-blue-400
              transition-all
              duration-300
              group-hover:bg-blue-600
              group-hover:text-white
            "
          >
            <Icon size={18} />
          </div>

          <span
            className="
              text-sm
              font-medium
              text-white
            "
          >
            {item.title}
          </span>
        </button>
      );
    })}
  </div>
</div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">
        <div
          className="
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-blue-600
            p-4
            text-center
          "
        >
          <h3 className="font-semibold text-white">
            Smart-P Analytics
          </h3>

          <p className="mt-1 text-xs text-blue-100">
            Built on Resilience.
            Powered by Data.
          </p>
        </div>
      </div>
    </div>
  );
}