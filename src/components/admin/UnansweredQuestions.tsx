import {
  HelpCircle,
} from "lucide-react";

import AdminEmptyState from "./AdminEmptyState";

export default function UnansweredQuestions() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-400">
          Smart-P AI
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Unanswered Questions
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Review questions that Smart-P AI could not answer
          satisfactorily.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <HelpCircle size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Questions Requiring Review
            </h3>

            <p className="text-xs text-slate-500">
              AI knowledge gaps
            </p>
          </div>
        </div>

        <div className="pt-5">
          <AdminEmptyState
            title="No unanswered questions"
            description="Questions requiring review will appear here when the Supabase data layer is connected."
          />
        </div>
      </div>
    </div>
  );
}