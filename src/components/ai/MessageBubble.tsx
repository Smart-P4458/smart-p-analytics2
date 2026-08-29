import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href?: string
  ) => {
    if (!href) return;

    if (href.startsWith("#")) {
      event.preventDefault();

      const target = document.querySelector(href);

      target?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(
        null,
        "",
        href
      );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${
        isAssistant
          ? "justify-start"
          : "justify-end"
      }`}
    >
      <div
        className={`
          max-w-[88%]
          lg:max-w-[72%]
          rounded-3xl
          px-5
          py-4
          shadow-md
          transition-all
          duration-150

          ${
            isAssistant
              ? "rounded-tl-md border border-slate-800 bg-slate-900 text-slate-200"
              : "rounded-tr-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          }
        `}
      >
        <div
          className="
            text-[15px]
            leading-6
            [&_p]:mb-2
            [&_p:last-child]:mb-0
            [&_strong]:font-semibold
            [&_a]:font-medium
            [&_a]:underline
            [&_a]:underline-offset-2
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                const isInternal =
                  href?.startsWith("#");

                return (
                  <a
                    href={href}
                    target={
                      isInternal
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      isInternal
                        ? undefined
                        : "noopener noreferrer"
                    }
                    onClick={(event) =>
                      handleLinkClick(
                        event,
                        href
                      )
                    }
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </div>

        {time && (
          <p
            className={`mt-3 text-[11px] ${
              isAssistant
                ? "text-slate-500"
                : "text-blue-100"
            }`}
          >
            {time}
          </p>
        )}
      </div>
    </motion.div>
  );
}
