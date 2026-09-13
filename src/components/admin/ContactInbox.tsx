import { useEffect, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";

import { getContacts } from "../../services/admin/adminApi";
import type { ContactSubmission } from "../../services/admin/adminTypes";

export default function ContactInbox() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadContacts() {
    try {
      setLoading(true);
      setError(null);

      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error("Contact inbox error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load contact submissions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadContacts();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            Communication
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Contact Inbox
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Review enquiries submitted through the Smart-P
            Analytics website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadContacts()}
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
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Summary */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Mail size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total enquiries
            </p>

            <p className="text-2xl font-bold text-white">
              {loading ? "..." : contacts.length}
            </p>
          </div>
        </div>
      </div>

      {/* Inbox */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4 font-medium">
                  Contact
                </th>

                <th className="px-5 py-4 font-medium">
                  Subject
                </th>

                <th className="px-5 py-4 font-medium">
                  Message
                </th>

                <th className="px-5 py-4 font-medium">
                  Status
                </th>

                <th className="px-5 py-4 font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading contact submissions...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No contact submissions found.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-slate-800/70 last:border-0 hover:bg-slate-900"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        {contact.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {contact.email}
                      </p>

                      {contact.phone && (
                        <p className="mt-1 text-xs text-slate-500">
                          {contact.phone}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[220px] truncate text-sm text-slate-300">
                        {contact.subject}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[360px] truncate text-sm text-slate-400">
                        {contact.message}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
                        {contact.automation_status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {new Date(
                        contact.created_at
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
