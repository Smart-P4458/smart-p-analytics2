import { motion } from "framer-motion";

import ProjectsCard from "./ProjectsCard";
import { staggerContainer } from "./ProjectsAnimation";

const projects = [
  {
    title: "Profit Performance & Discount Optimization Analysis",
    description:
      "This project analyzes sales performance, profitability trends, and the impact of discounts on profit margins using the Superstore dataset. The goal is to help business leaders identify revenue drivers and optimize discount strategies.",

    image: "./projects/profit-performance-analysis.jpg",

    technologies: [
      "Python",
      "PostgreSQL",
      "Power BI",
      "SQL",
    ],

    github: "https://github.com/Smart-P4458/Profit-Performance-and-Discount-Optimization-Dashboard",

    demo: "#",
  },

  {
    title: "Customer Sales Dashboard",
    description:
      "Interactive Power BI dashboard providing executive KPIs, customer insights and sales performance analysis.",

    image: "/images/projects/customer-dashboard.jpg",

    technologies: [
      "Power BI",
      "DAX",
      "Power Query",
    ],

    github: "#",

    demo: "#",
  },

  {
    title: "Excel Business Intelligence",
    description:
      "Advanced Excel reporting solution featuring PivotTables, dashboards and automated reporting.",

    image: "/images/projects/excel-dashboard.jpg",

    technologies: [
      "Excel",
      "Power Query",
      "Analytics",
    ],

    github: "#",

    demo: "#",
  },

  {
    title: "Smart-P Analytics Website",
    description:
      "Responsive personal portfolio built using React, TypeScript and Tailwind CSS showcasing analytics projects and services.",

    image: "/images/projects/portfolio.jpg",

    technologies: [
      "React",
      "TypeScript",
      "Tailwind",
    ],

    github: "#",

    demo: "#",
  },
];

export default function ProjectsGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      className="
        grid
        gap-8
        lg:grid-cols-2
      "
    >
      {projects.map((project) => (
        <ProjectsCard
          key={project.title}
          {...project}
        />
      ))}
    </motion.div>
  );
}