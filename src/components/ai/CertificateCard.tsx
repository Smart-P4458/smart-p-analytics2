import {
  Download,
  ExternalLink,
  Award,
} from "lucide-react";

const CERTIFICATE_URL =
  "/images/certificates/Pam-Sani-George-Advanced-Data-Cert.pdf";

const VERIFICATION_URL =
  "https://app.3mtt.training/verify?id=FE/23/2802316";

export default function CertificateCard() {
  return (
    <div
      className="
        mt-4
        w-full
        max-w-sm
        overflow-hidden
        rounded-2xl
        border
        border-slate-700
        bg-slate-800/80
        p-4
        shadow-lg
      "
    >
      {/* Certificate Header */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-600/20
            text-blue-400
          "
        >
          <Award size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-white">
            3MTT DeepTech Skills Certificate
          </h3>

          <p className="text-sm text-slate-400">
            Federal Government 3MTT Programme
          </p>
        </div>
      </div>

      {/* Certificate Preview */}

      <div
        className="
          mt-4
          overflow-hidden
          rounded-xl
          border
          border-slate-700
          bg-slate-950
        "
      >
        <iframe
          src={CERTIFICATE_URL}
          title="Pam Sani George 3MTT Certificate"
          className="
            h-72
            w-full
            border-0
          "
        />
      </div>

      {/* Actions */}

      <div className="mt-4 flex gap-2">
        {/* Download Certificate */}

        <a
          href={CERTIFICATE_URL}
          download="Pam-Sani-George-Advanced-Data-Cert.pdf"
          className="
            inline-flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-blue-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Download size={17} />
          Download
        </a>

        {/* Verify Certificate */}

        <a
          href={VERIFICATION_URL}
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
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-200
            transition
            hover:border-blue-500
            hover:text-blue-400
          "
        >
          <ExternalLink size={17} />
          Verify
        </a>
      </div>
    </div>
  );
}
