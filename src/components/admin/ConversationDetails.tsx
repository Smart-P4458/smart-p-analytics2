import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  MessageSquare,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getConversation,
  getConversationMessages,
  updateConversationStatus,
} from "../../services/admin/adminApi";

import type {
  Conversation,
  ConversationStatus,
  Message,
} from "../../services/admin/adminTypes";

export default function ConversationDetails() {
  const { conversationId } =
    useParams<{
      conversationId: string;
    }>();

  const navigate = useNavigate();

  const [conversation, setConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function loadConversation() {
    if (!conversationId) {
      setError("Conversation ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [
        conversationData,
        messagesData,
      ] = await Promise.all([
        getConversation(conversationId),
        getConversationMessages(
          conversationId
        ),
      ]);

      setConversation(conversationData);
      setMessages(messagesData);
    } catch (err) {
      console.error(
        "Conversation loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load conversation."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadConversation();
  }, [conversationId]);

  async function handleStatusChange(
    nextStatus: ConversationStatus
  ) {
    if (!conversationId || updatingStatus) {
      return;
    }

    const action =
      nextStatus === "closed"
        ? "close this conversation"
        : "reopen this conversation";

    const confirmed = window.confirm(
      `Are you sure you want to ${action}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingStatus(true);
      setError(null);

      const updatedConversation =
        await updateConversationStatus(
          conversationId,
          nextStatus
        );

      setConversation(
        updatedConversation
      );
    } catch (err) {
      console.error(
        "Conversation status update error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update conversation status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  }

  const answeredMessages =
    messages.filter(
      (message) => message.is_answered
    ).length;

  const lastMessage =
    messages[messages.length - 1];

  const isClosed =
    conversation?.status === "closed";

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-7">
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

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                    isClosed
                      ? "bg-slate-800 text-slate-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {isClosed
                    ? "Closed"
                    : "Active"}
                </span>
              </div>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Conversation Details
              </h2>

              <p className="mt-2 max-w-[760px] truncate font-mono text-xs text-slate-500">
                {conversationId}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                void loadConversation()
              }
              disabled={
                loading || updatingStatus
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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

            {conversation && (
              <button
                type="button"
                onClick={() =>
                  void handleStatusChange(
                    isClosed
                      ? "active"
                      : "closed"
                  )
                }
                disabled={
                  updatingStatus
                }
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isClosed
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                }`}
              >
                {updatingStatus ? (
                  <RefreshCw
                    size={16}
                    className="animate-spin"
                  />
                ) : isClosed ? (
                  <CheckCircle2
                    size={16}
                  />
                ) : (
                  <XCircle size={16} />
                )}

                {updatingStatus
                  ? "Updating..."
                  : isClosed
                    ? "Reopen Conversation"
                    : "Close Conversation"}
              </button>
            )}
          </div>
        </div>

        {/* Conversation metadata */}
        {conversation && (
          <div className="grid border-t border-slate-800 sm:grid-cols-2 xl:grid-cols-4">
            <div className="border-b border-slate-800 px-5 py-4 xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <User size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wide text-slate-600">
                    Visitor ID
                  </p>

                  <p className="mt-1 truncate font-mono text-xs text-slate-300">
                    {conversation.visitor_id}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-800 px-5 py-4 sm:border-l xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <MessageSquare
                    size={17}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wide text-slate-600">
                    Session ID
                  </p>

                  <p className="mt-1 truncate font-mono text-xs text-slate-300">
                    {conversation.session_id}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-800 px-5 py-4 xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  <Clock3 size={17} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-600">
                    Created
                  </p>

                  <p className="mt-1 text-xs text-slate-300">
                    {new Date(
                      conversation.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock3 size={17} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-600">
                    Updated
                  </p>

                  <p className="mt-1 text-xs text-slate-300">
                    {new Date(
                      conversation.updated_at
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-medium text-red-400">
            Conversation action failed.
          </p>

          <p className="mt-1 text-xs text-red-400/80">
            {error}
          </p>
        </div>
      )}

      {/* Conversation statistics */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <MessageSquare size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Messages
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {loading
                  ? "..."
                  : messages.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <CheckCircle2
                size={19}
              />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Answered Messages
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {loading
                  ? "..."
                  : answeredMessages}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
              <Clock3 size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                Last Activity
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-white">
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

      {/* Messages */}
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
