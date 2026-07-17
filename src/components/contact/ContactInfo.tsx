import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Globe,
} from "lucide-react";

import { fadeLeft } from "./ContactAnimation";

const contacts = [
  {
    icon: Mail,
    title: "Email",
    value: "smartppalace@gmail.com",
    href: "mailto:smartppalace@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+234 8037684458",
    href: "tel:+2348037684458",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Jos, Plateau State, Nigeria",
    href: "#",
  },
];

const socials = [
  
  {
    icon: GitBranch,
    href: "#",
  },
  {
    icon: Globe,
    href: "#",
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      variants={fadeLeft}
      className="space-y-10"
    >
      {/* Heading */}

      <div>
        <h3 className="text-3xl font-semibold text-white">
          Get in Touch
        </h3>

        <p className="mt-4 leading-8 text-slate-300">
          I'm always open to discussing freelance projects,
          full-time opportunities, collaborations and innovative
          ideas in Data Analytics, Business Intelligence and AI.
        </p>
      </div>

      {/* Contact Cards */}

      <div className="space-y-5">
        {contacts.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.title}
              href={item.href}
              className="group flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                <Icon size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <h4 className="font-medium text-white">
                  {item.value}
                </h4>
              </div>
            </a>
          );
        })}
      </div>

      {/* Social Links */}

      <div>
        <h4 className="mb-5 text-lg font-semibold text-white">
          Connect With Me
        </h4>

        <div className="flex gap-4">
          {socials.map((social, index) => {
            const Icon = social.icon;

            return (
              <a
                key={index}
                href={social.href}
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Icon size={22} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}