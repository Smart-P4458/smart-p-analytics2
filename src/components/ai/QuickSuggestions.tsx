import { motion } from "framer-motion";
import { useAI } from "./AIContext";

const suggestions = [
  {
    label: "👋 About Pam",
    prompt: "Tell me about yourself",
  },
  {
    label: "📊 Projects",
    prompt: "Tell me about your projects",
  },
  {
    label: "💼 Services",
    prompt: "What services do you offer?",
  },
  {
    label: "🧠 Skills",
    prompt: "What are your technical skills?",
  },
  {
    label: "🎓 Certifications",
    prompt: "Tell me about your certifications",
  },
  {
    label: "📄 Resume",
    prompt: "How can I download your resume?",
  },
];

export default function QuickSuggestions() {
  const { sendMessage } = useAI();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        px-6
        pb-5
      "
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
        Try asking
      </p>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button
            key={item.label}
            onClick={() => sendMessage(item.prompt)}
            className="
              rounded-full
              border
              border-slate-700
              bg-slate-900
              px-4
              py-2
              text-sm
              text-slate-300

              transition-all
              duration-300

              hover:border-cyan-400
              hover:bg-cyan-500/10
              hover:text-white
            "
          >
            {item.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}