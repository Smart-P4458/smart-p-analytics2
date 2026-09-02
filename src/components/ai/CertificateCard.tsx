import {
  Award,
  Download,
  ExternalLink,
  FileText,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
} from "lucide-react";

import { useState } from "react";

type Certificate = {
  id: number;
  title: string;
  organization: string;
  certificateUrl: string;
  verificationUrl?: string;
  featured: boolean;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "3MTT DeepTech Skills Certificate",
    organization: "Federal Government 3MTT Programme",
    certificateUrl:
      "/images/certificates/Pam-Sani-George-Advanced-Data-Cert.pdf",
    verificationUrl:
      "https://app.3mtt.training/verify?id=FE/23/2802316",
    featured: true,
  },

  {
    id: 2,
    title: "Data Analytics Professional Certificate",
    organization: "Professional Training Programme",
    certificateUrl:
      "/images/certificates/Pam-Sani-George-Advanced-Data-Cert.pdf",
    featured: true,
  },

  {
    id: 3,
    title: "Business Intelligence Certificate",
    organization: "Professional Training Programme",
    certificateUrl:
      "/images/certificates/Pam-Sani-George-Advanced-Data-Cert.pdf",
    featured: false,
  },

  {
    id: 4,
    title: "Power BI Data Analytics Certificate",
    organization: "Professional Training Programme",
    certificateUrl:
      "/images/certificates/Pam-Sani-George-Advanced-Data-Cert.pdf",
    featured: false,
  },

  {
    id: 5,
    title: "SQL and Data Analysis Certificate",
    organization: "Professional Training Programme",
    certificateUrl:
      "/images/certificates/Pam-Sani-George-Advanced-Data-Cert.pdf",
    featured: false,
  },
];

export default function CertificateCard() {
  const [showAll, setShowAll] = useState(false);

  const visibleCertificates = showAll
    ? certificates
    : certificates.filter(
        (certificate) => certificate.featured
      );

  return (
    <div className="mt-4 w-full max-w-2xl">
      {/* Header */}

      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-600/20
              text-blue-400
            "
          >
            <Award size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Professional Certifications
            </h3>

            <p className="text-sm text-slate-400">
              Selected professional certifications and
              credentials
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Grid */}

      <div className="grid gap-4 sm:grid-cols-2">
        {visibleCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="
              rounded-2xl
              border
              border-slate-700
              bg-slate-800/80
              p-4
              shadow-lg
              transition-all
              duration-300
              hover:border-blue-500/60
            "
          >
            {/* Certificate Header */}

            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600/20
                  text-blue-400
                "
              >
                <Award size={20} />
              </div>

              <div className="min-w-0">
                <h4 className="font-semibold leading-6 text-white">
                  {certificate.title}
                </h4>

                <p className="mt-1 text-sm text-slate-400">
                  {certificate.organization}
                </p>
              </div>
            </div>

            {/* Certificate Preview */}

            <a
              href={certificate.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4
                flex
                h-28
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                transition-all
                duration-300
                hover:border-blue-500
                hover:bg-slate-900
              "
            >
              <div className="flex flex-col items-center gap-2">
                <FileText
                  size={32}
                  className="text-blue-400"
                />

                <span className="text-sm text-slate-300">
                  View Certificate
                </span>
              </div>
            </a>

            {/* Actions */}

            <div className="mt-4 flex gap-2">
              {/* Download */}

              <a
                href={certificate.certificateUrl}
                download
                className="
                  inline-flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-3
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <Download size={16} />
                Download
              </a>

              {/* Verification */}

              {certificate.verificationUrl ? (
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-slate-600
                    px-3
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-200
                    transition
                    hover:border-blue-500
                    hover:text-blue-400
                  "
                >
                  <BadgeCheck size={16} />
                  Verify
                </a>
              ) : (
                <div
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-slate-700
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-500
                  "
                  title="Online verification is not available"
                >
                  <ExternalLink size={16} />
                  Credential
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View More / Less */}

      {certificates.length > 2 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="
            mt-5
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-900/70
            px-5
            py-3
            text-sm
            font-semibold
            text-slate-300
            transition-all
            duration-300
            hover:border-blue-500
            hover:text-blue-400
          "
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              Show Featured Certificates
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              View All Certifications ({certificates.length})
            </>
          )}
        </button>
      )}
    </div>
  );
}
