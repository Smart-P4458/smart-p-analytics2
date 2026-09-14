import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  MessageSquare,
  RefreshCw,
  User,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getConversationMessages } from "../../services/admin/adminApi";

import type { Message } from "../../services/admin/adminTypes";

export default function ConversationDetails() {
  const { conversationId } =
    useParams<{
      conversationId: string;
    }>();

  const navigate = useNavigate();

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadMessages() {
    if (!conversationId) {
      setError("Conversation ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data =
        await getConversationMessages(
          conversationId
        );

      setMessages(data);
    } catch (err) {
      console.error(
        "Conversation messages error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load conversation messages."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMessages();
  }, [conversationId]);

  const answeredMessages = messages.filter(
    (message) => message.is_answered
  ).length;

  const lastMessage =
    messages[messages.length - 1];

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6">
      {/* Conversation header */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/conversations"
                )
              }
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
              aria-label="Back to conversations"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-blue-400">
                  Conversation
                </p>

                <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-400">
                  Live record
                </span>
              </div>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Conversation Details
              </h2>

              <p className="mt-2 max-w-[700px] truncate font-mono text-xs text-slate-500">
                {conversationId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void loadMessages()}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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

        {/* Conversation summary */}
        <div className="grid border-t border-slate-800 sm:grid-cols-3">
          <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4 sm:border-b-0 sm:border-r">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <MessageSquare size={17} />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-600">
                Messages
              </p>

              <p className="text-sm font-semibold text-white">
                {loading
                  ? "..."
                  : messages.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4 sm:border-b-0 sm:border-r">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-600">
                Answered
              </p>

              <p className="text-sm font-semibold text-white">
                {loading
                  ? "..."
                  : answeredMessages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
              <Clock3 size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-600">
                Last activity
              </p>

              <p className="truncate text-sm font-semibold text-white">
                {loading
                  ? "..."
                  : lastMessage
                    ? new Date(
                        lastMessage.created_at
                      ).toLocaleString()
                    : "No activity"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-medium text-red-400">
            Unable to load this conversation.
          </p>

          <p className="mt-1 text-xs text-red-400/80">
            {error}
          </p>
        </div>
      )}

      {/* Conversation workspace */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="border-b border-slate-800 px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <MessageSquare size={19} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Conversation Messages
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Complete message history between
                the visitor and Smart-P AI.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[420px] items-center justify-center p-10">
            <div className="text-center">
              <RefreshCw
                size={30}
                className="mx-auto animate-spin text-slate-600"
              />

              <p className="mt-4 text-sm text-slate-500">
                Loading conversation messages...
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-[420px] items-center justify-center p-10">
            <div className="text-center">
              <MessageSquare
                size={36}
                className="mx-auto text-slate-700"
              />

              <p className="mt-4 text-sm font-medium text-slate-400">
                No messages found
              </p>

              <p className="mt-1 text-xs text-slate-600">
                This conversation does not contain
                any message records.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/30 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            <div className="mx-auto max-w-[1050px] space-y-7">
              {messages.map((message) => {
                const isUser =
                  message.sender === "user";

                const isAdmin =
                  message.sender === "admin";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <article
                      className={`w-full max-w-[760px] overflow-hidden rounded-2xl border ${
                        isUser
                          ? "border-slate-800 bg-slate-900"
                          : isAdmin
                            ? "border-amber-500/20 bg-amber-500/5"
                            : "border-blue-500/20 bg-blue-500/5"
                      }`}
                    >
                      {/* Message header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/70 px-4 py-3 sm:px-5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                              isUser
                                ? "bg-slate-800 text-slate-400"
                                : isAdmin
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            {isUser ? (
                              <User size={15} />
                            ) : (
                              <Bot size={15} />
                            )}
                          </div>

                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wide ${
                                isUser
                                  ? "text-slate-300"
                                  : isAdmin
                                    ? "text-amber-400"
                                    : "text-blue-400"
                              }`}
                            >
                              {message.sender}
                            </p>

                            <p className="text-[10px] text-slate-600">
                              {message.message_type}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {message.is_answered && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-400">
                              <CheckCircle2
                                size={11}
                              />
                              Answered
                            </span>
                          )}

                          <span className="text-[10px] text-slate-600">
                            {new Date(
                              message.created_at
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Message body */}
                      <div className="px-4 py-5 sm:px-5 sm:py-6">
                        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                          {message.content}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
