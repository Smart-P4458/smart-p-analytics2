const stats = [
  {
    value: "10+",
    label: "Projects",
  },
  {
    value: "SQL",
    label: "Python",
  },
  {
    value: "Power BI",
    label: "Excel",
  },
  {
    value: "AI",
    label: "Analytics",
  },
];

export default function HeroStats() {
  return (
    <div
      className="
        mt-12
        grid
        grid-cols-2
        gap-4
        lg:grid-cols-4
      "
    >
      {stats.map((item) => (
        <div
          key={item.value}
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900/70
            p-5
            text-center
            backdrop-blur-sm
          "
        >
          <h3 className="text-xl font-bold text-blue-400">
            {item.value}
          </h3>

          <p className="mt-2 text-sm text-slate-300">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}