import Section from "../common/Section";

import AboutBackgroundEffects from "./AboutBackgroundEffects";
import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";

export default function About() {
  return (
    <Section
      id="about"
      className="
        relative
        overflow-hidden
        bg-slate-900
        text-white
      "
    >
      <AboutBackgroundEffects />

      <div
        className="
          relative
          z-10
          grid
          items-center
          gap-20
          lg:grid-cols-2
        "
      >
        {/* LEFT */}

        <div className="flex justify-center lg:justify-start">
          <AboutImage />
        </div>

        {/* RIGHT */}

        <AboutContent />
      </div>
    </Section>
  );
}