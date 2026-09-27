export default function AdminLoading({
  message = "Loading dashboard...",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

        <p className="text-sm text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}