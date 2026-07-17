export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="
        mt-16
        border-t
        border-slate-800
        pt-8
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-4
          text-center
          md:flex-row
        "
      >
        {/* Copyright */}

        <p
          className="
            text-sm
            text-slate-400
          "
        >
          © {currentYear} Smart-P Analytics.
          All Rights Reserved.
        </p>

        {/* Developer Credit */}

        <p
          className="
            text-sm
            text-slate-500
          "
        >
          Designed & Developed with ❤️ by{" "}
          <span className="font-medium text-blue-400">
            Pam Sani George
          </span>
        </p>

        {/* Tech Stack */}

        <p
          className="
            text-sm
            text-slate-500
          "
        >
          React • TypeScript • Tailwind CSS
        </p>
      </div>
    </div>
  );
}