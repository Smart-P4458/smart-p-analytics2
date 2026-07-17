import { motion } from "framer-motion";
import { GitBranch, ExternalLink } from "lucide-react";

import { fadeUp } from "./ProjectsAnimation";

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
};

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className="
        group
        overflow-hidden
        rounded-b-[28px]
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-2xl
        hover:shadow-blue-500/10
      "
    >
      {/* ========================= */}
      {/* Project Image */}
      {/* ========================= */}

      <div
        className="
          relative
          h-64
          overflow-hidden
          rounded-none
          bg-slate-800
        "
      >
        <img
          src={image}
          alt={title}
          className="
            block
            h-full
            w-full
            object-fill
            transition-transform
            duration-500
            group-hover:scale-[1.03]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/25
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* ========================= */}
      {/* Card Content */}
      {/* ========================= */}

      <div className="p-8">
        <h3
          className="
            text-2xl
            font-semibold
            text-white
            transition-colors
            duration-300
            group-hover:text-blue-400
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-5
            leading-8
            text-slate-300
          "
        >
          {description}
        </p>

        {/* ========================= */}
        {/* Tech Stack */}
        {/* ========================= */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              className="
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-3
                py-1
                text-sm
                font-medium
                text-blue-300
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ========================= */}
        {/* Buttons */}
        {/* ========================= */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-4
          "
        >
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-700
              px-5
              py-3
              text-slate-300
              transition-all
              duration-300
              hover:border-blue-500
              hover:bg-blue-500/10
              hover:text-blue-400
            "
          >
            <GitBranch size={18} />
            GitHub
          </a>

          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-blue-700
            "
          >
            <ExternalLink size={18} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}