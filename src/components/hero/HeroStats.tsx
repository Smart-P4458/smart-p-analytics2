const stats = [
  {
    value: "5+",
    label: "Projects Delivered",
  },
  {
    value: "3MTT",
    label: "DeepTech Certified",
  },
  {
    value: "SQL • Python",
    label: "Core Analytics",
  },
  {
    value: "Power BI",
    label: "BI & Dashboards",
  },
];

export default function HeroStats() {
  return (
    <div
      className="
        mt-5
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
            rounded-lg
            border
            border-slate-700
            bg-slate-900/70
            p-2
            text-center
            backdrop-blur-lg
          "
        >
          <h3 className="text-md font-bold text-blue-400">
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