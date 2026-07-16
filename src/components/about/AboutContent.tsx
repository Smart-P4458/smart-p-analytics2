export default function AboutContent() {
  return (
    <div
      className="
        max-w-xl
      "
    >
      <span
        className="
          inline-block
          rounded-full
          border
          border-blue-500/30
          bg-blue-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-blue-400
        "
      >
        About Me
      </span>

      <h2
        className="
          mt-6
          text-4xl
          font-semibold
          leading-tight
        "
      >
        Turning Business Problems into
        <span className="block text-blue-500">
          Data-Driven Solutions
        </span>
      </h2>

      <p
        className="
          mt-8
          text-lg
          leading-9
          text-slate-300
        "
      >
        I am <strong className="text-white">Pam Sani George</strong>,
        a Data Analyst with an Accounting background who enjoys
        helping organizations make confident business decisions
        through clean data, insightful dashboards and actionable
        analytics.
      </p>

      <p
        className="
          mt-6
          text-lg
          leading-9
          text-slate-300
        "
      >
        My expertise spans SQL, Python, Power BI, Excel,
        Business Intelligence and Data Visualization,
        enabling me to transform raw business data into
        meaningful insights that improve performance,
        efficiency and strategic decision-making.
      </p>
    </div>
  );
}