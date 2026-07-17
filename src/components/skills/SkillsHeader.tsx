import { motion } from "framer-motion";

import { fadeUp } from "./SkillsAnimation";

export default function SkillsHeader() {
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
        Technical Skills
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
        Modern Tools for
        <span className="block text-blue-500">
          Data-Driven Decision Making
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
        My technical stack combines data analytics, business
        intelligence, software development and AI tools to
        transform raw data into actionable insights and
        business solutions.
      </p>
    </motion.div>
  );
}