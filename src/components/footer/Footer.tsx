import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterSocials from "./FooterSocials";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-slate-800
        bg-slate-950
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-20
          lg:px-8
        "
      >
        {/* ========================= */}
        {/* Main Footer */}
        {/* ========================= */}

        <div
          className="
            grid
            gap-16
            lg:grid-cols-[1.4fr_1fr_0.8fr]
          "
        >
          {/* Brand */}

          <FooterBrand />

          {/* Navigation */}

          <FooterLinks />

          {/* Social */}

          <FooterSocials />
        </div>

        {/* ========================= */}
        {/* Bottom */}
        {/* ========================= */}

        <FooterBottom />
      </div>
    </footer>
  );
}