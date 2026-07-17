import { motion } from "framer-motion";

import { fadeUp } from "./TestimonialsAnimation";

export default function TestimonialsHeader() {
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
        Testimonials
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
        Trusted by Clients,
        <span className="block text-blue-500">
          Recognized for Results
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
        Every project is an opportunity to create measurable value.
        These testimonials reflect the confidence, professionalism,
        and impact I bring to every analytics solution I deliver.
      </p>
    </motion.div>
  );
}