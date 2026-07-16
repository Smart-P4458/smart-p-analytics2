import { motion } from "framer-motion";
import { fadeUp } from "./ServicesAnimation";
export default function ServicesHeader() {
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
        My Services
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
        Helping Businesses
        <span className="block text-blue-500">
          Make Smarter Decisions
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
        I help organizations transform raw business data into
        meaningful insights through Data Analytics, Business
        Intelligence, Dashboard Development, SQL, Python,
        Microsoft Excel and AI-powered analytical solutions.
      </p>
    </motion.div>
  );
}