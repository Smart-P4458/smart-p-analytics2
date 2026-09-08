import {
  MessageSquare,
  Clock,
} from "lucide-react";

import AdminEmptyState from "./AdminEmptyState";

export default function ConversationTable() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-400">
          Smart-P AI
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Conversations
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          View and monitor conversations between visitors
          and Smart-P AI.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
              <MessageSquare size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Conversation History
              </h3>

              <p className="text-xs text-slate-500">
                Visitor and AI interactions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={15} />
            <span>Live data coming next</span>
          </div>
        </div>

        <div className="p-5">
          <AdminEmptyState
            title="No conversations loaded"
            description="Real conversation records from Supabase will appear here after the admin API is connected."
          />
        </div>
      </div>
    </div>
  );
}