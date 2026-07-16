import Section from "../common/Section";

import ServicesBackgroundEffects from "./ServicesBackgroundEffects";
import ServicesHeader from "./ServicesHeader";
import ServicesGrid from "./ServicesGrid";

export default function Services() {
  return (
    <Section
      id="services"
      className="
        relative
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      <ServicesBackgroundEffects />

      <div className="relative z-10">
        <ServicesHeader />

        <ServicesGrid />
      </div>
    </Section>
  );
}