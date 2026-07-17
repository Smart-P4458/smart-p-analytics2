import { motion } from "framer-motion";

import SkillCard from "./SkillsCard";
import { staggerContainer } from "./SkillsAnimation";

import {
  FileSpreadsheet,
  Database,
  BarChart3,
  BrainCircuit,
  Code2,
  GitBranch,
  MonitorSmartphone,
  ChartNoAxesCombined,
  Bot,
} from "lucide-react";

const skills = [
  {
    icon: FileSpreadsheet,
    title: "Microsoft Excel",
    level: 95,
  },
  {
    icon: Database,
    title: "SQL",
    level: 90,
  },
  {
    icon: BarChart3,
    title: "Power BI",
    level: 92,
  },
  {
    icon: BrainCircuit,
    title: "Python",
    level: 85,
  },
  {
    icon: ChartNoAxesCombined,
    title: "Data Visualization",
    level: 92,
  },
  {
    icon: MonitorSmartphone,
    title: "Business Intelligence",
    level: 90,
  },
  {
    icon: Code2,
    title: "React & TypeScript",
    level: 82,
  },
  {
    icon: GitBranch,
    title: "Git & GitHub",
    level: 84,
  },
  {
    icon: Bot,
    title: "AI Productivity Tools",
    level: 94,
  },
];

export default function SkillsGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      className="
        grid
        gap-8
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {skills.map((skill) => (
        <SkillCard
          key={skill.title}
          icon={skill.icon}
          title={skill.title}
          level={skill.level}
        />
      ))}
    </motion.div>
  );
}