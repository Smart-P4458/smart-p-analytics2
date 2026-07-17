import { motion } from "framer-motion";

import TestimonialCard from "./TestimonialsCard";
import { staggerContainer } from "./TestimonialsAnimation";

const testimonials = [
  {
    name: "John Anderson",
    role: "Operations Manager",
    company: "Retail Solutions Ltd.",
    image: "/images/testimonials/client-1.jpg",
    testimonial:
      "Pam transformed our sales data into an interactive Power BI dashboard that completely changed the way our management team makes decisions.",
  },
  {
    name: "Sarah Johnson",
    role: "Finance Executive",
    company: "Prime Holdings",
    image: "/images/testimonials/client-2.jpg",
    testimonial:
      "His analytical skills and attention to detail are exceptional. The reports delivered were accurate, insightful and easy to understand.",
  },
  {
    name: "Michael Brown",
    role: "Business Consultant",
    company: "Insight Consult",
    image: "/images/testimonials/client-3.jpg",
    testimonial:
      "Working with Pam was seamless. He combined technical expertise with business understanding to deliver exactly what we needed.",
  },
];

export default function TestimonialsGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      className="
        grid
        gap-8
        lg:grid-cols-3
      "
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.name}
          {...testimonial}
        />
      ))}
    </motion.div>
  );
}
