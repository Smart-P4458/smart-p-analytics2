import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

const navItems = [
  "Home",
  "About",
  "Services",
  "Projects",
  "Skills",
  "Testimonials",
  "Contact",
];

export default function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  /* ----------------------------------------
     Close menu when clicking outside
  ---------------------------------------- */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen]);

  /* ----------------------------------------
     Close menu with Escape
  ---------------------------------------- */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* ----------------------------------------
     Prevent background scrolling
  ---------------------------------------- */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ----------------------------------------
     Navigation
  ---------------------------------------- */

  const handleNavigation = (
    item: string
  ) => {
    const targetId =
      `#${item.toLowerCase()}`;

    setIsOpen(false);

    const target =
      document.querySelector(targetId);

    if (!target) return;

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    window.history.replaceState(
      null,
      "",
      targetId
    );
  };

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
        ref={menuRef}
        className="
          relative
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
          onClick={(event) => {
            event.preventDefault();
            handleNavigation("Home");
          }}
          className="
            group
            flex
            items-center
            gap-4
          "
        >
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
        {/* DESKTOP NAVIGATION */}
        {/* ========================= */}

        <nav
          className="
            hidden
            items-center
            gap-10
            lg:flex
          "
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(item);
              }}
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
        {/* MOBILE MENU BUTTON */}
        {/* ========================= */}

        <button
          type="button"
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen((previous) => !previous)
          }
          className="
            relative
            z-[60]
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            text-slate-300
            transition-all
            duration-300
            hover:border-blue-500
            hover:text-blue-400
            lg:hidden
          "
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        {/* ========================= */}
        {/* MOBILE NAVIGATION */}
        {/* ========================= */}

        <div
          className={`
            absolute
            left-4
            right-4
            top-[76px]
            z-50
            overflow-hidden
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/98
            shadow-2xl
            backdrop-blur-xl
            transition-all
            duration-300
            lg:hidden
            ${
              isOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-3 opacity-0"
            }
          `}
        >
          <nav className="p-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigation(item);
                }}
                className="
                  block
                  rounded-xl
                  px-4
                  py-3.5
                  text-sm
                  font-medium
                  text-slate-300
                  transition-all
                  duration-200
                  hover:bg-slate-900
                  hover:text-blue-400
                "
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
