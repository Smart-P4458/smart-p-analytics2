import { ArrowRight, Download } from "lucide-react";

export default function HeroButtons() {
  return (
    <div
      className="
        mt-10
        flex
        flex-col
        gap-4
        sm:flex-row
      "
    >
      {/* Primary Button */}

      <a
        href="#projects"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-blue-600
          px-6
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-blue-700
        "
      >
        View My Projects

        <ArrowRight size={18} />
      </a>

      {/* Secondary Button */}

      <a
        href="/documents/Pam-George-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-slate-600
          px-6
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:border-blue-500
          hover:text-blue-400
        "
      >
        Download Resume

        <Download size={18} />
      </a>
    </div>
  );
}