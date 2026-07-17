import Section from "../common/Section";
import { motion } from "framer-motion";

import ProjectsBackgroundEffects from "./ProjectsBackgroundEffects";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsGrid from "./ProjectsGrid";
import { staggerContainer } from "./ProjectsAnimation";

export default function Projects() {
  return (
    <Section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-slate-900
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
        <ProjectsBackgroundEffects />

        <div className="relative z-10">
          <ProjectsHeader />

          <ProjectsGrid />
        </div>
      </motion.div>
    </Section>
  );
}