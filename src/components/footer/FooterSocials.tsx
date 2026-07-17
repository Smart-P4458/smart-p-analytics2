import {
  Mail,
  Globe,
  GitBranch,
} from "lucide-react";

const socials = [
  {
    name: "GitHub",
    icon: GitBranch,
    href: "https://github.com/Smart-P4458",
  },

  {
    name: "LinkedIn",
    icon: Globe,
    href: "https://linkedin.com/",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@smartpanalytics.com",
  },
];

export default function FooterSocials() {
  return (
    <div>
      <h3
        className="
          mb-6
          text-xl
          font-semibold
          text-white
        "
      >
        Connect
      </h3>

      <div className="flex flex-wrap gap-4">
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="
                group
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                border
                border-slate-800
                bg-slate-900/70
                text-slate-400
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500
                hover:bg-blue-600
                hover:text-white
              "
            >
              <Icon
                size={22}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          );
        })}
      </div>

      <p
        className="
          mt-8
          text-sm
          leading-7
          text-slate-400
        "
      >
        Follow Smart-P Analytics for insights on Data Analytics,
        Power BI, SQL, Python, Artificial Intelligence, and Business
        Intelligence.
      </p>
    </div>
  );
}