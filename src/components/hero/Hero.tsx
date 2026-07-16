import Section from "../common/Section";

import BackgroundEffects from "./HeroBackgroundEffects";
import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import ProfileSection from "./ProfileSection";


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
          gap-12
          lg:grid-cols-2
          lg:gap-16
        "
      >
        {/* LEFT COLUMN */}

        <div
          className="
            mx-auto
            max-w-2xl
            text-center
            lg:mx-0
            lg:text-left
          "
        >
            <HeroBadge />

            <HeroHeading />

            <HeroDescription />

            <HeroButtons />

            <HeroStats />
        </div>

        {/* RIGHT COLUMN */}

        <div
          className="
            flex
            items-center
            justify-center
            lg:justify-end
          "
        >
          <ProfileSection />
        </div>
      </div>
    </Section>
  );
}