import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-800/70
        bg-slate-950/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          md:px-8
          lg:px-12
        "
      >
        {/* ========================= */}
        {/* LOGO & BRAND */}
        {/* ========================= */}

        <a
          href="#home"
          className="
            group
            flex
            items-center
            gap-4
          "
        >
          {/* Logo */}

          <img
            src="/branding/Smart-P-Logo.png"
            alt="Smart-P Analytics Logo"
            className="
              h-14
              w-14
              object-contain
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-3
            "
          />

          {/* Brand */}

          <div>
            <h1
              className="
                text-xl
                font-semibold
                tracking-tight
                text-white
                transition-all
                duration-300
                group-hover:text-blue-400
              "
            >
              Smart-P Analytics
            </h1>

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-slate-400
                transition-all
                duration-300
                group-hover:text-cyan-400
                group-hover:tracking-[0.22em]
              "
            >
              Built on Resilience • Powered by Data
            </p>
          </div>
        </a>

        {/* ========================= */}
        {/* Desktop Navigation */}
        {/* ========================= */}

        <nav
          className="
            hidden
            items-center
            gap-10
            lg:flex
          "
        >
          {[
            "Home",
            "About",
            "Projects",
            "Skills",
            "Services",
            "Testimonials",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="
                relative
                text-sm
                font-medium
                text-slate-300
                transition-all
                duration-300
                hover:text-blue-400
                after:absolute
                after:-bottom-2
                after:left-0
                after:h-[2px]
                after:w-0
                after:bg-blue-500
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {item}
            </a>
          ))}
        </nav>

        {/* ========================= */}
        {/* Mobile Menu Button */}
        {/* ========================= */}

        <button
          className="
            rounded-lg
            border
            border-slate-700
            p-2
            text-slate-300
            transition-all
            duration-300
            hover:border-blue-500
            hover:text-blue-400
            lg:hidden
          "
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}