import { motion } from "framer-motion";

import { fadeUp } from "./ContactAnimation";

export default function ContactHeader() {
  return (
    <motion.div
      variants={fadeUp}
      className="
        mx-auto
        mb-20
        max-w-3xl
        text-center
      "
    >
      {/* Badge */}

      <span
        className="
          inline-flex
          items-center
          rounded-full
          border
          border-blue-500/30
          bg-blue-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-blue-400
        "
      >
        Contact Me
      </span>

      {/* Heading */}

      <h2
        className="
          mt-6
          text-4xl
          font-semibold
          tracking-tight
          text-white
          md:text-5xl
        "
      >
        Let's Build Something
        <span className="block text-blue-500">
          Meaningful Together
        </span>
      </h2>

      {/* Description */}

      <p
        className="
          mx-auto
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-slate-300
        "
      >
        Whether you need data analysis, interactive dashboards,
        business intelligence solutions, or collaboration on your
        next project, I'd be happy to hear from you. Let's discuss
        how data can help move your business forward.
      </p>
    </motion.div>
  );
}