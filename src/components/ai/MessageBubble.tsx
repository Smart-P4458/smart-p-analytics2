import { motion } from "framer-motion";

type MessageBubbleProps = {
  sender: "assistant" | "user";
  text: string;
  time?: string;
};

export default function MessageBubble({
  sender,
  text,
  time,
}: MessageBubbleProps) {
  const isAssistant = sender === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`
          max-w-[88%]
          lg:max-w-[72%]

          rounded-3xl

          px-5
          py-4

          shadow-md

          ${
            isAssistant
              ? `
                rounded-tl-md
                border
                border-slate-800
                bg-slate-900
                text-slate-200
              `
              : `
                rounded-tr-md
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-white
              `
          }
        `}
      >
        <p
          className="
            whitespace-pre-wrap
            text-[14px]
            leading-5
          "
        >
          {text}
        </p>

        {time && (
          <p
            className={`
              mt-2
              text-[11px]

              ${
                isAssistant
                  ? "text-slate-500"
                  : "text-blue-100"
              }
            `}
          >
            {time}
          </p>
        )}
      </div>
    </motion.div>
  );
}