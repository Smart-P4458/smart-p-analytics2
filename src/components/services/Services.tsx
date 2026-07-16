import { motion } from "framer-motion";

import Section from "../common/Section";

import ServicesBackgroundEffects from "./ServicesBackgroundEffects";
import ServicesHeader from "./ServicesHeader";
import ServicesGrid from "./ServicesGrid";
import { staggerContainer } from "./ServicesAnimation";

export default function Services() {
  return (
    <Section
      id="services"
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
        <ServicesBackgroundEffects />

        <div className="relative z-10">
          <ServicesHeader />

          <ServicesGrid />
        </div>
      </motion.div>
    </Section>
  );
}