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
    title: "Real-Time Retail Sales Dashboard",
    description:
      "Interactive Power BI dashboard providing executive KPIs, customer insights and sales performance analysis.",

    image: "./projects/real-time-retail-sales-analysis-dashboard.png",

    technologies: [
      "Power BI",
      "DAX",
      "Power Query",
    ],

    github: "https://github.com/Smart-P4458/Profit-Performance-and-Discount-Optimization-Dashboard",

    demo: "#",
  },

  {
    title: "Udemy Online course Analysis Dashboard",
    description:
      "Advanced Excel reporting solution featuring PivotTables, dashboards and automated reporting.",

    image: "./projects/Udemy-Online-course-Analysis-Dashboard.jpg",

    technologies: [
      "Excel",
      "Power Query",
      "Analytics",
    ],

    github: "https://github.com/Smart-P4458/Profit-Performance-and-Discount-Optimization-Dashboard",

    demo: "#",
  },

  {
    title: "Smart-P Analytics Website",
    description:
      "Responsive personal portfolio built using React, TypeScript and Tailwind CSS showcasing analytics projects and services.",

    image: "./public/projects/Smart-P-Analytics_Portfolio.jpg",

    technologies: [
      "React",
      "TypeScript",
      "Tailwind",
    ],

    github: "https://github.com/Smart-P4458/Profit-Performance-and-Discount-Optimization-Dashboard",

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
