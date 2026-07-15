import Section from "../common/Section";
import BackgroundEffects from "./HeroBackgroundEffects";
import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";

export default function Hero() {
  return (
    <Section
      id="home"
      className="
        relative
        overflow-hidden
        bg-slate-950
        text-white
        py-16
        lg:py-24
      "
    >
      <BackgroundEffects />

      <div
        className="
          relative
          z-10
          grid
          min-h-[calc(100vh-80px)]
          items-center
          gap-16
          lg:grid-cols-2
        "
      >
        {/* LEFT COLUMN */}

   <div className="max-w-2xl">
  <HeroBadge />

  <HeroHeading />

  <HeroDescription />
    </div>

        {/* RIGHT COLUMN */}

        <div className="flex justify-center lg:justify-end">
          <div
            className="
              flex
              h-80
              w-80
              items-center
              justify-center
              rounded-full
              border-2
              border-dashed
              border-slate-600
            "
          >
            Image Placeholder
          </div>
        </div>
      </div>
    </Section>
  );
}