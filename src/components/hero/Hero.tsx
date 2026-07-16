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
        py-0
      "
    >
      <BackgroundEffects />

      <div
        className="
          relative
          z-10
          grid
          h-[calc(100vh-80px)]
          items-center
          gap-16
          lg:grid-cols-2
        "
      >
        {/* LEFT */}

        <div
          className="
            max-w-xl
          "
        >
          <HeroBadge />

          <HeroHeading />

          <HeroDescription />

          <HeroButtons />


          <HeroStats />
        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            justify-end
          "
        >
          <ProfileSection />
        </div>
      </div>
    </Section>
  );
}