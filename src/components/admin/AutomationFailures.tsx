import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Mail,
  RefreshCw,
  Clock3,
  X,
} from "lucide-react";

import AdminEmptyState from "./AdminEmptyState";

import {
  getAutomationFailures,
} from "../../services/admin/adminApi";

import type {
  AutomationFailure,
} from "../../services/admin/adminTypes";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getStatusClasses(status: string) {
  const normalized =
    status.toLowerCase();

  if (
    normalized === "open" ||
    normalized === "failed" ||
    normalized === "error"
  ) {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  if (
    normalized === "resolved" ||
    normalized === "completed" ||
    normalized === "success"
  ) {
    return "border-green-500/20 bg-green-500/10 text-green-400";
  }

  return "border-slate-700 bg-slate-800 text-slate-400";
}

export default function AutomationFailures() {
  const [failures, setFailures] =
    useState<AutomationFailure[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadFailures() {
    try {
      setLoading(true);
      setError(null);

      const data =
        await getAutomationFailures();

      setFailures(data);
    } catch (err) {
      console.error(
        "Automation failures error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load automation failures."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFailures();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            System Monitoring
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Automation Failures
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor failed automations and system
            events that require attention.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadFailures()}
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

      {/* Error */}
      {error && (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <div>
            <p className="text-sm font-medium text-red-400">
              Unable to load automation failures.
            </p>

            <p className="mt-1 text-xs text-red-400/80">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
            className="rounded-lg p-1 text-red-400 transition hover:bg-red-500/10"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Failures
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {failures.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <AlertTriangle size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Open
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {
                  failures.filter(
                    (failure) =>
                      failure.automation_status.toLowerCase() ===
                        "open" ||
                      failure.automation_status.toLowerCase() ===
                        "failed"
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <Clock3 size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {
                  failures.filter(
                    (failure) => {
                      const status =
                        failure.automation_status.toLowerCase();

                      return (
                        status ===
                          "resolved" ||
                        status ===
                          "completed" ||
                        status ===
                          "success"
                      );
                    }
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Mail size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Failure List */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h3 className="font-semibold text-white">
              Failure Records
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Automation failures retrieved from Supabase.
            </p>
          </div>

          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
            {failures.length} records
          </span>
        </div>

        {loading ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Loading automation failures...
            </div>
          </div>
        ) : failures.length === 0 ? (
          <div className="p-5">
            <AdminEmptyState
              title="No automation failures"
              description="There are currently no automation failure records in Supabase."
            />
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {failures.map((failure) => (
              <div
                key={failure.id}
                className="p-5 transition hover:bg-slate-800/30"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-semibold text-white">
                        {failure.name}
                      </h4>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          failure.automation_status
                        )}`}
                      >
                        {failure.automation_status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-4">
                      <span>
                        {failure.email}
                      </span>

                      <span className="hidden sm:inline">
                        •
                      </span>

                      <span>
                        {failure.subject}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-left lg:text-right">
                    <p className="text-xs text-slate-600">
                      Created
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {formatDate(
                        failure.created_at
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
