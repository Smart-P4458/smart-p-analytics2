import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ResumeCard from "./ResumeCard";
import CertificateCard from "./CertificateCard";

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

  const hasResumeCard =
    isAssistant && text.includes("[RESUME_CARD]");

  const hasCertificateCard =
    isAssistant &&
    text.includes("[CERTIFICATE_CARD]");

  const displayText = text
    .replace("[RESUME_CARD]", "")
    .replace("[CERTIFICATE_CARD]", "")
    .trim();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${
        isAssistant ? "justify-start" : "justify-end"
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
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {displayText}
          </ReactMarkdown>
        </div>

        {hasResumeCard && <ResumeCard />}

        {hasCertificateCard && (
          <CertificateCard />
        )}

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
