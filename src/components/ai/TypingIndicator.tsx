import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-6 py-3">
      <div
        className="
          rounded-3xl
          rounded-tl-md
          border
          border-slate-800
          bg-slate-900
          px-5
          py-4
        "
      >
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-blue-400
              "
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}