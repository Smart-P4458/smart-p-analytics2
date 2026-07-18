import { X } from "lucide-react";
import { motion } from "framer-motion";

type ChatHeaderProps = {
  onClose: () => void;
};

export default function ChatHeader({
  onClose,
}: ChatHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        bg-slate-950/95
        px-6
        py-4
        backdrop-blur-xl
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        {/* Avatar */}

        <div className="relative">
          <img
            src="/images/profile/psg.jpg"
            alt="Smart-P AI"
            className="
              h-14
              w-14
              rounded-full
              border-2
              border-blue-500/40
              object-cover
              shadow-lg
              shadow-blue-500/20
            "
          />

          {/* Online Indicator */}

          <span
            className="
              absolute
              bottom-0
              right-0
              h-4
              w-4
              rounded-full
              border-2
              border-slate-950
              bg-green-400
            "
          />

          <span
            className="
              absolute
              bottom-0
              right-0
              h-4
              w-4
              animate-ping
              rounded-full
              bg-green-400
            "
          />
        </div>

        {/* Title */}

        <div>
          <h2
            className="
              text-xl
              font-bold
              text-white
            "
          >
            Smart-P AI
          </h2>

          <p
            className="
              mt-1
              flex
              items-center
              gap-2
              text-sm
              text-green-400
            "
          >
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Online
          </p>
        </div>
      </div>

      {/* Right */}

      <button
        onClick={onClose}
        aria-label="Close Smart-P AI"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          text-slate-400
          transition-all
          duration-300
          hover:bg-slate-800
          hover:text-white
        "
      >
        <X size={24} />
      </button>
    </motion.header>
  );
}