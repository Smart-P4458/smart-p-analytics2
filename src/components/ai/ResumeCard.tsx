import {
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";

const RESUME_URL =
  "/documents/Pam-Sani-George - Data-Analyst-Resume.pdf";

export default function ResumeCard() {
  return (
    <div
      className="
        mt-4
        w-full
        max-w-sm
        rounded-2xl
        border
        border-slate-700
        bg-slate-800/80
        p-4
        shadow-lg
      "
    >
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
          <FileText size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-white">
            Pam Sani George — Resume
          </h3>

          <p className="text-sm text-slate-400">
            Professional Data Analyst Resume
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={RESUME_URL}
          download="Pam-Sani-George-Resume.pdf"
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

        <a
          href={RESUME_URL}
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
          View
        </a>
      </div>
    </div>
  );
}
