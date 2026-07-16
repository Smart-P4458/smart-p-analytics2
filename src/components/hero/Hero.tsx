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
        py-12
        lg:py-6
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
    lg:gap-20
  "
    >
        {/* Left */}

        <div
          className="
            order-2
            max-w-xl
            text-center

            lg:order-1
            lg:text-left
          "
        >
          <HeroBadge />

          <HeroHeading />

          <HeroDescription />

          <HeroButtons />

          <HeroStats />
        </div>

        {/* Right */}

        <div
          className="
            order-1
            flex
            justify-center

            lg:order-2
            lg:justify-end
          "
        >
          <ProfileSection />
        </div>
      </div>
    </Section>
  );
}