import {
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

export default function ConversationDetails() {
  const {
    conversationId,
  } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/admin/conversations"
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to conversations
        </Link>

        <p className="text-sm font-medium text-blue-400">
          Conversation
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Conversation Details
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Conversation ID:
        </p>

        <p className="mt-1 break-all font-mono text-xs text-slate-600">
          {conversationId}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
            <MessageSquare size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Conversation Messages
            </h3>

            <p className="text-xs text-slate-500">
              Messages will be loaded from Supabase.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">
          <p className="text-sm text-slate-500">
            Conversation messages are not connected yet.
          </p>
        </div>
      </div>
    </div>
  );
}