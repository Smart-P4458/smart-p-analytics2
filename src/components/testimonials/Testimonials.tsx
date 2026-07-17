import Section from "../common/Section";
import { motion } from "framer-motion";

import TestimonialsBackgroundEffects from "./TestimonialsBackgroundEffects";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsGrid from "./TestimonialsGrid";
import { staggerContainer } from "./TestimonialsAnimation";

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative"
      >
        <TestimonialsBackgroundEffects />

        <div className="relative z-10">
          <TestimonialsHeader />

          <TestimonialsGrid />
        </div>
      </motion.div>
    </Section>
  );
}