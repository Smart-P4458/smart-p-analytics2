import { useEffect, useState } from "react";
import {
  Clock,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminEmptyState from "./AdminEmptyState";
import { getConversations } from "../../services/admin/adminApi";
import type { Conversation } from "../../services/admin/adminTypes";

export default function ConversationTable() {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadConversations() {
    try {
      setLoading(true);
      setError(null);

      const data = await getConversations();

      setConversations(data);
    } catch (err) {
      console.error(
        "Conversations loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load conversations."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadConversations();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page heading */}
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

      {/* Conversation panel */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        {/* Panel header */}
        <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock size={15} />

              <span>
                {conversations.length} conversation
                {conversations.length === 1 ? "" : "s"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => void loadConversations()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={
                  loading ? "animate-spin" : ""
                }
              />

              Refresh
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          {loading ? (
            <div className="rounded-xl border border-dashed border-slate-800 p-10 text-center">
              <RefreshCw
                size={28}
                className="mx-auto animate-spin text-slate-600"
              />

              <p className="mt-3 text-sm text-slate-500">
                Loading conversations...
              </p>
            </div>
          ) : conversations.length === 0 ? (
            <AdminEmptyState
              title="No conversations found"
              description="There are currently no conversation records in Supabase."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-medium">
                      Conversation
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Session
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Status
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Created
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Updated
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {conversations.map((conversation) => (
                    <tr
                      key={conversation.id}
                      className="transition hover:bg-slate-800/40"
                    >
                      <td className="px-4 py-4">
                        <p className="max-w-[220px] truncate text-sm font-medium text-white">
                          {conversation.id}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          Visitor:{" "}
                          {conversation.visitor_id}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="max-w-[180px] truncate text-sm text-slate-400">
                          {conversation.session_id}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium capitalize text-blue-400">
                          {conversation.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                        {new Date(
                          conversation.created_at
                        ).toLocaleString()}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                        {new Date(
                          conversation.updated_at
                        ).toLocaleString()}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/conversations/${conversation.id}`
                            )
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
