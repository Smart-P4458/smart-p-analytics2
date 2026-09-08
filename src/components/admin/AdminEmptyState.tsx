import {
  Inbox,
} from "lucide-react";

type AdminEmptyStateProps = {
  title: string;
  description: string;
};

export default function AdminEmptyState({
  title,
  description,
}: AdminEmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
        <Inbox size={22} />
      </div>

      <h3 className="text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}