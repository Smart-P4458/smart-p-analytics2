import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="
          flex
          items-center
          gap-2

          rounded-3xl
          rounded-tl-md

          border
          border-slate-800

          bg-slate-900

          px-5
          py-4

          shadow-md
        "
      >
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="
              h-2
              w-2
              rounded-full
              bg-cyan-400
            "
            animate={{
              y: [0, -5, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        <span className="ml-2 text-sm text-slate-400">
          Smart-P AI is typing...
        </span>
      </div>
    </div>
  );
}