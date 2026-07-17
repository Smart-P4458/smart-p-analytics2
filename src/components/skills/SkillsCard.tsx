import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp } from "./SkillsAnimation";

type SkillCardProps = {
  icon: LucideIcon;
  title: string;
  level: number;
};

export default function SkillCard({
  icon: Icon,
  title,
  level,
}: SkillCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="
        group
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        p-6
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-xl
        hover:shadow-blue-500/10
      "
    >
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

      {/* Skill */}

      <h3
        className="
          text-xl
          font-semibold
          text-white
        "
      >
        {title}
      </h3>

      {/* Percentage */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          text-sm
          text-slate-400
        "
      >
        <span>Proficiency</span>

        <span>{level}%</span>
      </div>

      {/* Progress Bar */}

      <div
        className="
          mt-3
          h-2
          overflow-hidden
          rounded-full
          bg-slate-800
        "
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-cyan-400
          "
        />
      </div>
    </motion.div>
  );
}