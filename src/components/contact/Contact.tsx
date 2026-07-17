import Section from "../common/Section";
import { motion } from "framer-motion";

import ContactBackgroundEffects from "./ContactBackgroundEffects";
import ContactHeader from "./ContactHeader";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

import { staggerContainer } from "./ContactAnimation";

export default function Contact() {
  return (
    <Section
      id="contact"
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
        {/* ========================= */}
        {/* Background Effects */}
        {/* ========================= */}

        <ContactBackgroundEffects />

        <div className="relative z-10">
          {/* ========================= */}
          {/* Section Header */}
          {/* ========================= */}

          <ContactHeader />

          {/* ========================= */}
          {/* Contact Layout */}
          {/* ========================= */}

          <div
            className="
              grid
              gap-16
              lg:grid-cols-2
              lg:items-start
            "
          >
            {/* Left */}

            <ContactInfo />

            {/* Right */}

            <ContactForm />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}