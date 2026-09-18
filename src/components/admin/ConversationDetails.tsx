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

type ConversationExchange = {
  id: string;
  messages: Message[];
  latestTime: number;
};

/**
 * Groups messages into conversation exchanges.
 *
 * Example:
 *
 * User
 * Assistant
 *
 * User
 * Assistant
 *
 * becomes:
 *
 * Exchange 1:
 *   User
 *   Assistant
 *
 * Exchange 2:
 *   User
 *   Assistant
 *
 * The exchanges are then displayed newest first.
 */
function buildConversationExchanges(
  messages: Message[]
): ConversationExchange[] {
  const chronologicalMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() -
      new Date(b.created_at).getTime()
  );

  const exchanges: ConversationExchange[] = [];

  let currentExchange: Message[] = [];

  for (const message of chronologicalMessages) {
    /*
     * Every new user message starts a new exchange.
     *
     * This gives us:
     *
     * User
     * Assistant
     *
     * User
     * Assistant
     */
    if (
      message.sender === "user" &&
      currentExchange.length > 0
    ) {
      exchanges.push({
        id: currentExchange[0].id,
        messages: currentExchange,
        latestTime: new Date(
          currentExchange[
            currentExchange.length - 1
          ].created_at
        ).getTime(),
      });

      currentExchange = [];
    }

    currentExchange.push(message);
  }

  /*
   * Add the final exchange.
   */
  if (currentExchange.length > 0) {
    exchanges.push({
      id: currentExchange[0].id,
      messages: currentExchange,
      latestTime: new Date(
        currentExchange[
          currentExchange.length - 1
        ].created_at
      ).getTime(),
    });
  }

  /*
   * Newest exchange first.
   */
  return exchanges.sort(
    (a, b) => b.latestTime - a.latestTime
  );
}

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

  /*
   * Build exchanges:
   *
   * Exchange 1 = newest User + Assistant
   * Exchange 2 = previous User + Assistant
   * Exchange 3 = older User + Assistant
   *
   * Each exchange itself remains:
   *
   * User → Assistant
   */
  const conversationExchanges =
    buildConversationExchanges(messages);

  const answeredMessages = messages.filter(
    (message) => message.is_answered
  ).length;

  /*
   * Find the actual newest message for the
   * Last activity display.
   */
  const latestMessage =
    [...messages].sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )[0];

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6">

      {/* =====================================================
          CONVERSATION HEADER
      ====================================================== */}
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

        {/* =================================================
            CONVERSATION SUMMARY
        ================================================== */}
        <div className="grid border-t border-slate-800 sm:grid-cols-3">

          {/* Messages */}
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

          {/* Answered */}
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

          {/* Latest activity */}
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
                  : latestMessage
                    ? new Date(
                        latestMessage.created_at
                      ).toLocaleString()
                    : "No activity"}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          ERROR
      ====================================================== */}
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

      {/* =====================================================
          CONVERSATION WORKSPACE
      ====================================================== */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* Workspace Header */}
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
                Latest conversation first · User prompt followed by Smart-P AI response.
              </p>

            </div>

          </div>

        </div>

        {/* Loading */}
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

          /* Empty */
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

          /* =================================================
             CONVERSATION EXCHANGES
          ================================================== */
          <div className="bg-slate-950/30 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">

            <div className="mx-auto max-w-[1050px] space-y-10">

              {conversationExchanges.map(
                (exchange, exchangeIndex) => {

                  const isLatestExchange =
                    exchangeIndex === 0;

                  return (
                    <div
                      key={exchange.id}
                      className="relative"
                    >

                      {/* =====================================
                          EXCHANGE LABEL
                      ====================================== */}
                      <div className="mb-4 flex items-center gap-3">

                        <div className="h-px flex-1 bg-slate-800" />

                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                            isLatestExchange
                              ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                              : "border-slate-800 bg-slate-900 text-slate-600"
                          }`}
                        >
                          {isLatestExchange
                            ? "Latest exchange"
                            : "Previous exchange"}
                        </span>

                        <div className="h-px flex-1 bg-slate-800" />

                      </div>

                      {/* =====================================
                          MESSAGES INSIDE EXCHANGE
                      ====================================== */}
                      <div className="space-y-4">

                        {exchange.messages.map(
                          (message) => {

                            const isUser =
                              message.sender ===
                              "user";

                            const isAdmin =
                              message.sender ===
                              "admin";

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
                                  } ${
                                    isLatestExchange
                                      ? "ring-1 ring-blue-500/10"
                                      : ""
                                  }`}
                                >

                                  {/* Message Header */}
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
                                          <User
                                            size={15}
                                          />
                                        ) : (
                                          <Bot
                                            size={15}
                                          />
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
                                          {isUser
                                            ? "User"
                                            : isAdmin
                                              ? "Admin"
                                              : "Smart-P AI"}
                                        </p>

                                        <p className="text-[10px] text-slate-600">
                                          {
                                            message.message_type
                                          }
                                        </p>

                                      </div>

                                    </div>

                                    <div className="flex items-center gap-2">

                                      {isLatestExchange &&
                                        isUser && (
                                          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-semibold text-blue-400">
                                            Latest prompt
                                          </span>
                                        )}

                                      {isLatestExchange &&
                                        !isUser && (
                                          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-semibold text-blue-400">
                                            Latest response
                                          </span>
                                        )}

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

                                  {/* Message Body */}
                                  <div className="px-4 py-5 sm:px-5 sm:py-6">

                                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                                      {
                                        message.content
                                      }
                                    </p>

                                  </div>

                                </article>

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )}

      </section>
    </div>
  );
}
