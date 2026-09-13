import { useEffect, useState } from "react";
import {
  AlertTriangle,
  HelpCircle,
  Mail,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

import StatCard from "./StatCard";

import {
  getAdminStats,
  getConversations,
} from "../../services/admin/adminApi";

import type {
  AdminStats,
  Conversation,
} from "../../services/admin/adminTypes";

export default function DashboardOverview() {
  const [stats, setStats] =
    useState<AdminStats | null>(null);

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);

      const [statsData, conversationsData] =
        await Promise.all([
          getAdminStats(),
          getConversations(),
        ]);

      setStats(statsData);
      setConversations(conversationsData);
    } catch (err) {
      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <p className="text-sm font-medium text-blue-400">
          Overview
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome to Smart-P Admin
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor Smart-P AI conversations,
              contact submissions, unanswered
              questions and automation activity
              from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadDashboard()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-medium text-red-400">
            Dashboard data could not be loaded.
          </p>

          <p className="mt-1 text-xs text-red-400/80">
            {error}
          </p>
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value={
            loading
              ? "..."
              : String(
                  stats?.totalConversations ?? 0
                )
          }
          description="All AI conversations"
          icon={MessageSquare}
        />

        <StatCard
          title="Contact Submissions"
          value={
            loading
              ? "..."
              : String(
                  stats?.totalContacts ?? 0
                )
          }
          description="Website enquiries"
          icon={Mail}
        />

        <StatCard
          title="Unanswered Questions"
          value={
            loading
              ? "..."
              : String(
                  stats?.unansweredQuestions ?? 0
                )
          }
          description="Questions requiring review"
          icon={HelpCircle}
        />

        <StatCard
          title="Automation Failures"
          value={
            loading
              ? "..."
              : String(
                  stats?.automationFailures ?? 0
                )
          }
          description="Issues requiring attention"
          icon={AlertTriangle}
        />
      </section>

      {/* Recent conversations */}
      <section>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
          <div className="flex flex-col gap-4 border-b border-slate-800 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">
                Recent Conversations
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Latest Smart-P AI conversation
                activity.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              {conversations.length} total
            </span>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <RefreshCw
                size={28}
                className="mx-auto animate-spin text-slate-600"
              />

              <p className="mt-3 text-sm text-slate-500">
                Loading conversations...
              </p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-10 text-center">
              <MessageSquare
                size={32}
                className="mx-auto text-slate-700"
              />

              <p className="mt-3 text-sm text-slate-500">
                No conversation data available.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-medium">
                      Conversation
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Visitor
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {conversations
                    .slice(0, 5)
                    .map((conversation) => (
                      <tr
                        key={conversation.id}
                        className="border-b border-slate-800/70 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-white">
                            Conversation
                          </p>

                          <p className="mt-1 max-w-[280px] truncate text-xs text-slate-500">
                            {conversation.id}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-400">
                          <span className="block max-w-[220px] truncate">
                            {conversation.visitor_id}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              conversation.status ===
                              "active"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {conversation.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                          {new Date(
                            conversation.created_at
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
