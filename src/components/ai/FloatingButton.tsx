import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { floatAnimation, scaleIn } from "./AIAnimations";

type FloatingButtonProps = {
  onClick: () => void;
};

export default function FloatingButton({
  onClick,
}: FloatingButtonProps) {
  return (
    <motion.button
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className="
        group
        fixed
        bottom-8
        right-8
        z-[999]
      "
    >
      <motion.div
        variants={floatAnimation}
        animate="animate"
        className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-blue-600
          via-cyan-500
          to-indigo-600
          shadow-2xl
          shadow-blue-500/40
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-blue-500
            opacity-30
            blur-2xl
            transition-all
            duration-500
            group-hover:scale-125
          "
        />

        {/* Icon */}

        <Sparkles
          size={34}
          className="relative z-10 text-white"
        />
      </motion.div>

      {/* Label */}

      <div
        className="
          absolute
          right-24
          top-1/2
          -translate-y-1/2
          whitespace-nowrap
          rounded-xl
          bg-slate-900/90
          px-4
          py-2
          text-sm
          font-medium
          text-white
          opacity-0
          backdrop-blur
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        Ask Smart-P AI
      </div>
    </motion.button>
  );
}