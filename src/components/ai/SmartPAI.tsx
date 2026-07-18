import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ChatWindow from "./ChatWindow";

import { AIProvider } from "./AIContext";

export default function SmartPAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <AnimatePresence>
  {isOpen && (
    <AIProvider>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </AIProvider>
  )}
</AnimatePresence>

      {/* Floating Button */}

      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setIsOpen(true)}
        className="
          group
          fixed
          bottom-8
          right-8
          z-[997]

          flex
          h-20
          w-20
          items-center
          justify-center

          overflow-hidden

          rounded-full

          border-4
          border-blue-500

          bg-slate-900

          shadow-2xl
          shadow-blue-500/30

          transition-all
          duration-300

          hover:shadow-blue-500/60
        "
      >
        {/* Your Profile */}

        <img
          src="/images/profile/psg.jpg"
          alt="Pam Sani George"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {/* Glow */}

        <span
          className="
            absolute
            inset-0
            rounded-full
            ring-2
            ring-blue-400/30
            animate-pulse
          "
        />

        {/* Online Indicator */}

        <span
          className="
            absolute
            bottom-2
            right-2

            h-5
            w-5

            rounded-full

            border-2
            border-slate-900

            bg-green-400
          "
        />

        <span
          className="
            absolute
            bottom-2
            right-2

            h-5
            w-5

            animate-ping

            rounded-full

            bg-green-400
          "
        />
      </motion.button>
    </>
  );
}