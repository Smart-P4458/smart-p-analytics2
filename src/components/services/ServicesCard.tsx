import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        p-8
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/50
        hover:shadow-2xl
        hover:shadow-blue-500/10
      "
    >
      {/* Top Accent */}

      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-0
          bg-gradient-to-r
          from-blue-500
          to-cyan-400
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* Icon */}

      <div
        className="
          mb-6
          inline-flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-blue-500/10
          text-blue-400
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:bg-blue-500
          group-hover:text-white
        "
      >
        <Icon size={30} />
      </div>

      {/* Title */}

      <h3
        className="
          text-2xl
          font-semibold
          text-white
          transition-colors
          duration-300
          group-hover:text-blue-400
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-5
          leading-8
          text-slate-300
        "
      >
        {description}
      </p>

      {/* Hover Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          bg-gradient-to-br
          from-blue-500/5
          via-transparent
          to-cyan-500/5
        "
      />
    </div>
  );
}