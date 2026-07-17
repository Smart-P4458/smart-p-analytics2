import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { fadeUp } from "./TestimonialsAnimation";

type TestimonialCardProps = {
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
};

export default function TestimonialCard({
  name,
  role,
  company,
  image,
  testimonial,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="
        group
        rounded-[28px]
        border
        border-slate-800
        bg-slate-900/70
        p-8
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-2xl
        hover:shadow-blue-500/10
      "
    >
      {/* Quote Icon */}

      <Quote
        size={34}
        className="
          text-blue-500
          opacity-80
        "
      />

      {/* Testimonial */}

      <p
        className="
          mt-6
          leading-8
          text-slate-300
        "
      >
        "{testimonial}"
      </p>

      {/* Rating */}

      <div
        className="
          mt-6
          flex
          gap-1
        "
      >
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />
        ))}
      </div>

      {/* Client */}

      <div
        className="
          mt-8
          flex
          items-center
          gap-4
        "
      >
        <img
          src={image}
          alt={name}
          className="
            h-16
            w-16
            rounded-full
            object-cover
            ring-2
            ring-blue-500/20
          "
        />

        <div>
          <h3
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            {name}
          </h3>

          <p
            className="
              text-sm
              text-slate-400
            "
          >
            {role}
          </p>

          <p
            className="
              text-sm
              text-blue-400
            "
          >
            {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}