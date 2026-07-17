export default function FooterBrand() {
  return (
    <div className="max-w-md">
      {/* Logo & Brand */}

      <div className="group flex items-center gap-4">
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-blue-500/20
            bg-slate-900
            shadow-lg
            transition-all
            duration-300
            group-hover:border-blue-500/50
            group-hover:shadow-blue-500/20
          "
        >
          <img
            src="/branding/Smart-P-Logo.png"
            alt="Smart-P Analytics Logo"
            className="
              h-14
              w-14
              object-contain
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-3
            "
          />
        </div>

        <div>
          <h3
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Smart-P Analytics
          </h3>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-blue-400
            "
          >
            Data • Intelligence • Innovation
          </p>
        </div>
      </div>

      {/* Description */}

      <p
        className="
          mt-8
          leading-8
          text-slate-400
        "
      >
        Empowering businesses with actionable insights through
        Data Analytics, Business Intelligence, Power BI, SQL,
        Python, and AI-powered solutions that transform data into
        confident decisions.
      </p>

      {/* Motto */}

      <blockquote
        className="
          mt-8
          border-l-4
          border-blue-500
          pl-5
          italic
          text-blue-400
        "
      >
        "Built on Resilience. Powered by Data."
      </blockquote>
    </div>
  );
}