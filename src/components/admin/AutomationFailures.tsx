import {
  AlertTriangle,
} from "lucide-react";

import AdminEmptyState from "./AdminEmptyState";

export default function AutomationFailures() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-400">
          System Monitoring
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Automation Failures
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Monitor failed automations and system events that
          require attention.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              System Failures
            </h3>

            <p className="text-xs text-slate-500">
              Automation monitoring
            </p>
          </div>
        </div>

        <div className="pt-5">
          <AdminEmptyState
            title="No automation failures"
            description="Automation failures from Supabase will appear here when the monitoring API is connected."
          />
        </div>
      </div>
    </div>
  );
}