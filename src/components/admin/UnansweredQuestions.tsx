import { useEffect, useState } from "react";
import {
  HelpCircle,
  RefreshCw,
} from "lucide-react";

import { getUnansweredQuestions } from "../../services/admin/adminApi";
import type {
  UnansweredQuestion,
} from "../../services/admin/adminTypes";

export default function UnansweredQuestions() {
  const [questions, setQuestions] = useState<
    UnansweredQuestion[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadQuestions() {
    try {
      setLoading(true);
      setError(null);

      const data = await getUnansweredQuestions();

      setQuestions(data);
    } catch (err) {
      console.error(
        "Unanswered questions error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load unanswered questions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadQuestions();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            AI Quality
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Unanswered Questions
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Questions from visitors that require review
            or improved AI responses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadQuestions()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Count */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
            <HelpCircle size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Questions requiring review
            </p>

            <p className="text-2xl font-bold text-white">
              {loading ? "..." : questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <section className="space-y-4">
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading unanswered questions...
            </p>
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center">
            <HelpCircle
              className="mx-auto text-slate-600"
              size={32}
            />

            <p className="mt-3 text-sm text-slate-500">
              No unanswered questions found.
            </p>
          </div>
        ) : (
          questions.map((question) => (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-slate-700"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-300">
                    Unanswered question
                  </p>

                  <p className="mt-2 text-base leading-7 text-white">
                    {question.content}
                  </p>

                  <p className="mt-3 text-xs text-slate-600">
                    Conversation ID:{" "}
                    {question.conversation_id}
                  </p>
                </div>

                <time className="shrink-0 text-xs text-slate-500">
                  {new Date(
                    question.created_at
                  ).toLocaleString()}
                </time>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
