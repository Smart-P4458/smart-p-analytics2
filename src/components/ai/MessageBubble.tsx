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
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`
        flex
        ${isAssistant ? "justify-start" : "justify-end"}
      `}
    >
      <div
        className={`
          max-w-[90%]
          lg:max-w-[75%]

          rounded-3xl

          px-6
          py-5

          shadow-lg

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
            leading-8
          "
        >
          {text}
        </p>

        {time && (
          <p
            className={`
              mt-4
              text-xs

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