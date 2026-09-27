type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus =
    status.toLowerCase();

  const styles: Record<string, string> = {
    active:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    resolved:
      "bg-green-500/10 text-green-400 border-green-500/20",

    answered:
      "bg-green-500/10 text-green-400 border-green-500/20",

    failed:
      "bg-red-500/10 text-red-400 border-red-500/20",

    error:
      "bg-red-500/10 text-red-400 border-red-500/20",

    unanswered:
      "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };

  const className =
    styles[normalizedStatus] ??
    "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        ${className}
      `}
    >
      {status}
    </span>
  );
}