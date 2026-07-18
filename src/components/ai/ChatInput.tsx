import { useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";
import { useAI } from "./AIContext";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useAI();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 180) + "px";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
    resizeTextarea();
  };

  const handleSend = () => {
  if (!message.trim()) return;

  sendMessage(message);

  setMessage("");

  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
  }
};

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="
        border-t
        border-slate-800
        bg-slate-950/95
        p-5
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          items-end
          gap-4

          rounded-2xl

          border
          border-slate-700

          bg-slate-900/70

          px-5
          py-4

          transition-all
          duration-300

          focus-within:border-blue-500
          focus-within:shadow-lg
          focus-within:shadow-blue-500/20
        "
      >
        {/* Textarea */}

        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Smart-P AI anything..."
          className="
            max-h-[180px]
            min-h-[28px]

            flex-1
            resize-none
            overflow-y-auto

            bg-transparent

            text-white

            placeholder:text-slate-500

            outline-none
          "
        />

        {/* Send */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleSend}
          disabled={!message.trim()}
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            rounded-xl

            bg-gradient-to-br
            from-blue-600
            via-blue-500
            to-cyan-500

            text-white

            transition-all
            duration-300

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <SendHorizonal size={20} />
        </motion.button>
      </div>

      <div
        className="
          mt-3
          flex
          items-center
          justify-between

          text-xs
          text-slate-500
        "
      >
        <span>Press Enter to send • Shift + Enter for new line</span>

        <span>Smart-P AI v1.0</span>
      </div>
    </div>
  );
}