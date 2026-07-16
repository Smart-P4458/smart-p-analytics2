import { motion } from "framer-motion";
import {
  Database,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";

const cards = [
  {
    title: "SQL",
    subtitle: "Modeling",
    icon: Database,
    className: "top-12 left-160",
  },
  {
    title: "Power BI",
    subtitle: "Dashboards",
    icon: BarChart3,
    className: "top-55 right-2",
  },
  {
    title: "Excel",
    subtitle: "Reporting",
    icon: FileSpreadsheet,
    className: "bottom-28 left-160",
  },

];

export default function TechCards() {
  return (
    <>
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
              absolute
              ${card.className}
              z-40
              w-30
              rounded-xl
              border
              border-blue-500/20
              bg-slate-900/90
              p-4
              backdrop-blur-lg
              shadow-lg
            `}
          >
            <div className="sm-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Icon
                size={15}
                className="text-blue-400"
              />
            </div>

            <h3 className="text-lg font-semibold text-white">
              {card.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {card.subtitle}
            </p>
          </motion.div>
        );
      })}
    </>
  );
}