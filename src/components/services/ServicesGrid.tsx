import { motion } from "framer-motion";

import ServiceCard from "./ServicesCard";
import { staggerContainer } from "./ServicesAnimation";

import {
  BarChart3,
  Database,
  LayoutDashboard,
  BrainCircuit,
  FileSpreadsheet,
  ChartNoAxesCombined,
} from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Data Analysis",
    description:
      "Transform raw business data into meaningful insights that support confident decision-making.",
  },
  {
    icon: LayoutDashboard,
    title: "Power BI Dashboards",
    description:
      "Design interactive dashboards that help organizations monitor KPIs and performance in real time.",
  },
  {
    icon: Database,
    title: "SQL Analytics",
    description:
      "Query, clean and manage relational databases for reporting, analysis and business intelligence.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel Automation",
    description:
      "Build advanced Excel reports, automate repetitive tasks and improve productivity.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Analytics",
    description:
      "Leverage modern AI tools to accelerate analysis, reporting and business insights.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Business Intelligence",
    description:
      "Convert complex business data into executive-ready reports that drive strategic growth.",
  },
];

export default function ServicesGrid() {
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
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          icon={service.icon}
          title={service.title}
          description={service.description}
        />
      ))}
    </motion.div>
  );
}