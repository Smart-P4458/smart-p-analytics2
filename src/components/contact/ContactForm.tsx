import { motion } from "framer-motion";
import { Send } from "lucide-react";

import { fadeRight } from "./ContactAnimation";

export default function ContactForm() {
  return (
    <motion.form
      variants={fadeRight}
      className="
        space-y-6
        rounded-[32px]
        border
        border-slate-800
        bg-slate-900/70
        p-8
        backdrop-blur-sm
      "
    >
      {/* Name */}

      <div>
        <label
          htmlFor="name"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Full Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Pam Sani George"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
          "
        />
      </div>

      {/* Email */}

      <div>
        <label
          htmlFor="email"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
          "
        />
      </div>

      {/* Subject */}

      <div>
        <label
          htmlFor="subject"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Subject
        </label>

        <input
          id="subject"
          type="text"
          placeholder="Project Discussion"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
          "
        />
      </div>

      {/* Message */}

      <div>
        <label
          htmlFor="message"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Message
        </label>

        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-4
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
          "
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-blue-600
          px-6
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:bg-blue-700
          active:scale-[0.98]
        "
      >
        <Send size={20} />

        Send Message
      </button>
    </motion.form>
  );
}