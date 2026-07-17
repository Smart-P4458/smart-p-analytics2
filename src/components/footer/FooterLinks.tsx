const quickLinks = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Skills",
    href: "#skills",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

const serviceLinks = [
  "Data Analytics",
  "Power BI Dashboards",
  "SQL Analytics",
  "Python Automation",
  "Business Intelligence",
  "AI Solutions",
];

export default function FooterLinks() {
  return (
    <div
      className="
        grid
        gap-12
        sm:grid-cols-2
      "
    >
      {/* Quick Links */}

      <div>
        <h3
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >
          Quick Links
        </h3>

        <ul className="space-y-4">
          {quickLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="
                  text-slate-400
                  transition-colors
                  duration-300
                  hover:text-blue-400
                "
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}

      <div>
        <h3
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >
          Services
        </h3>

        <ul className="space-y-4">
          {serviceLinks.map((service) => (
            <li
              key={service}
              className="text-slate-400"
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}