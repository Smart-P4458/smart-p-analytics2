import Section from "../common/Section";
import { motion } from "framer-motion";

import SkillsBackgroundEffects from "./SkillsBackgroundEffects";
import SkillsHeader from "./SkillsHeader";
import SkillsGrid from "./SkillsGrid";
import { staggerContainer } from "./SkillsAnimation";

export default function Skills() {
  return (
    <Section
      id="skills"
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
        <SkillsBackgroundEffects />

        <div className="relative z-10">
          <SkillsHeader />

          <SkillsGrid />
        </div>
      </motion.div>
    </Section>
  );
}