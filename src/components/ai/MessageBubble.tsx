import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageBubbleProps = {
  sender: "assistant" | "user";
  text: string;
  time?: string;
  onClose?: () => void;
};

export default function MessageBubble({
  sender,
  text,
  time,
  onClose,
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

      /*
       * Close Smart-P AI first so the Contact section
       * is completely visible and usable.
       */
      onClose?.();

      /*
       * Give the chat window a moment to close before
       * scrolling to the destination.
       */
      window.setTimeout(() => {
        target?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.replaceState(
          null,
          "",
          href
        );
      }, 250);
    }
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.22,
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
          lg:max-w-[74%]
          rounded-2xl
          px-4
          py-3
          shadow-md
          transition-all
          duration-150

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
        <div
          className="
            text-[15px]
            leading-[1.45]

            [&_p]:mb-1.5
            [&_p:last-child]:mb-0

            [&_ul]:my-1.5
            [&_ul]:space-y-0.5
            [&_ul]:pl-5

            [&_ol]:my-1.5
            [&_ol]:space-y-0.5
            [&_ol]:pl-5

            [&_li]:leading-[1.45]

            [&_strong]:font-semibold

            [&_a]:font-medium
            [&_a]:text-cyan-400
            [&_a]:underline
            [&_a]:decoration-cyan-400/50
            [&_a]:underline-offset-2

            [&_a:hover]:text-cyan-300
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({
                href,
                children,
              }) => {
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
            className={`
              mt-2
              text-[10px]
              leading-none

              ${
                isAssistant
                  ? "text-slate-500"
                  : "text-blue-100/80"
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
