import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  User,
  X,
} from "lucide-react";

import {
  getContacts,
  updateContactAutomationStatus,
} from "../../services/admin/adminApi";

import type {
  ContactSubmission,
} from "../../services/admin/adminTypes";

const STATUS_OPTIONS = [
  "pending",
  "sent",
  "failed",
];

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getStatusClasses(status: string) {
  const normalized =
    status.toLowerCase();

  if (
    normalized === "sent" ||
    normalized === "success" ||
    normalized === "completed"
  ) {
    return "bg-green-500/10 text-green-400 border-green-500/20";
  }

  if (
    normalized === "failed" ||
    normalized === "error"
  ) {
    return "bg-red-500/10 text-red-400 border-red-500/20";
  }

  if (
    normalized === "pending" ||
    normalized === "processing"
  ) {
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }

  return "bg-slate-800 text-slate-400 border-slate-700";
}

export default function ContactInbox() {
  const [contacts, setContacts] =
    useState<ContactSubmission[]>([]);

  const [selectedContactId, setSelectedContactId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function loadContacts() {
    try {
      setLoading(true);
      setError(null);

      const data = await getContacts();

      setContacts(data);

      setSelectedContactId((currentId) => {
        if (
          currentId &&
          data.some(
            (contact) =>
              contact.id === currentId
          )
        ) {
          return currentId;
        }

        return data[0]?.id ?? null;
      });
    } catch (err) {
      console.error(
        "Contact inbox error:",
        err
      );

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

  const selectedContact = useMemo(
    () =>
      contacts.find(
        (contact) =>
          contact.id === selectedContactId
      ) ?? null,
    [contacts, selectedContactId]
  );

  const pendingCount = contacts.filter(
    (contact) => {
      const status =
        contact.automation_status.toLowerCase();

      return (
        status === "pending" ||
        status === "processing"
      );
    }
  ).length;

  const failedCount = contacts.filter(
    (contact) => {
      const status =
        contact.automation_status.toLowerCase();

      return (
        status === "failed" ||
        status === "error"
      );
    }
  ).length;

  async function handleStatusChange(
    status: string
  ) {
    if (
      !selectedContact ||
      updatingStatus
    ) {
      return;
    }

    try {
      setUpdatingStatus(true);
      setError(null);

      const updated =
        await updateContactAutomationStatus(
          selectedContact.id,
          status
        );

      setContacts((current) =>
        current.map((contact) =>
          contact.id === updated.id
            ? updated
            : contact
        )
      );
    } catch (err) {
      console.error(
        "Contact status update error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update contact status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            Communication
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Contact Inbox
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review and manage enquiries submitted
            through the Smart-P Analytics website.
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
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh Inbox
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <div>
            <p className="text-sm font-medium text-red-400">
              Contact inbox action failed.
            </p>

            <p className="mt-1 text-xs text-red-400/80">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setError(null)
            }
            className="rounded-lg p-1 text-red-400 transition hover:bg-red-500/10"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Mail size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Enquiries
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {loading
                  ? "..."
                  : contacts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Pending Automation
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {loading
                  ? "..."
                  : pendingCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <MessageSquare size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Failed Automation
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {loading
                  ? "..."
                  : failedCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Inbox */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="grid min-h-[650px] lg:grid-cols-[minmax(0,1fr)_430px]">
          {/* Contact List */}
          <div className="min-w-0 border-b border-slate-800 lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-800 px-5 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Enquiries
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Select an enquiry to view its
                    full details.
                  </p>
                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  {contacts.length}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[520px] items-center justify-center p-8">
                <div className="text-center">
                  <RefreshCw
                    size={28}
                    className="mx-auto animate-spin text-slate-600"
                  />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading contact submissions...
                  </p>
                </div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="flex min-h-[520px] items-center justify-center p-8">
                <div className="text-center">
                  <Mail
                    size={36}
                    className="mx-auto text-slate-700"
                  />

                  <p className="mt-4 text-sm font-medium text-slate-400">
                    No contact submissions found
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    New website enquiries will
                    appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-h-[700px] overflow-y-auto">
                {contacts.map((contact) => {
                  const isSelected =
                    contact.id ===
                    selectedContactId;

                  return (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() =>
                        setSelectedContactId(
                          contact.id
                        )
                      }
                      className={`flex w-full items-start gap-4 border-b border-slate-800/70 px-5 py-5 text-left transition ${
                        isSelected
                          ? "bg-blue-500/5"
                          : "hover:bg-slate-900"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isSelected
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        <User size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              {contact.name}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {contact.email}
                            </p>
                          </div>

                          <ChevronRight
                            size={17}
                            className={`mt-0.5 shrink-0 ${
                              isSelected
                                ? "text-blue-400"
                                : "text-slate-700"
                            }`}
                          />
                        </div>

                        <p className="mt-3 truncate text-sm font-medium text-slate-300">
                          {contact.subject}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-600">
                          {contact.message}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClasses(
                              contact.automation_status
                            )}`}
                          >
                            {
                              contact.automation_status
                            }
                          </span>

                          <span className="text-[10px] text-slate-600">
                            {formatDate(
                              contact.created_at
                            )}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact Details */}
          <aside className="min-w-0 bg-slate-950/30">
            {!selectedContact ? (
              <div className="flex min-h-[520px] items-center justify-center p-8">
                <div className="max-w-xs text-center">
                  <Mail
                    size={38}
                    className="mx-auto text-slate-700"
                  />

                  <p className="mt-4 text-sm font-medium text-slate-400">
                    Select an enquiry
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Contact details and the complete
                    enquiry message will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col">
                {/* Details Header */}
                <div className="border-b border-slate-800 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <User size={19} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-white">
                          {selectedContact.name}
                        </h3>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {selectedContact.email}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClasses(
                        selectedContact.automation_status
                      )}`}
                    >
                      {
                        selectedContact.automation_status
                      }
                    </span>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="border-b border-slate-800 px-5 py-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <Mail size={15} />
                      Email
                      <ExternalLink size={12} />
                    </a>

                    {selectedContact.phone ? (
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                      >
                        <Phone size={15} />
                        Call
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-slate-600">
                        <Phone size={15} />
                        No phone number
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Metadata */}
                <div className="space-y-5 overflow-y-auto px-5 py-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Subject
                    </p>

                    <p className="mt-2 text-sm font-semibold text-white">
                      {selectedContact.subject}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                        Automation Status
                      </p>

                      {updatingStatus && (
                        <RefreshCw
                          size={13}
                          className="animate-spin text-slate-600"
                        />
                      )}
                    </div>

                    <select
                      value={
                        selectedContact.automation_status
                      }
                      onChange={(event) =>
                        void handleStatusChange(
                          event.target.value
                        )
                      }
                      disabled={updatingStatus}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {!STATUS_OPTIONS.includes(
                        selectedContact.automation_status
                      ) && (
                        <option
                          value={
                            selectedContact.automation_status
                          }
                        >
                          {
                            selectedContact.automation_status
                          }
                        </option>
                      )}

                      {STATUS_OPTIONS.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status
                              .charAt(0)
                              .toUpperCase() +
                              status.slice(1)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={15}
                          className="text-slate-600"
                        />

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                          Received
                        </p>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {formatDate(
                          selectedContact.created_at
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={15}
                          className="text-slate-600"
                        />

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                          Source
                        </p>
                      </div>

                      <p className="mt-2 truncate text-xs leading-5 text-slate-400">
                        {selectedContact.source ??
                          "Website"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <MessageSquare
                        size={15}
                        className="text-blue-400"
                      />

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                        Enquiry Message
                      </p>
                    </div>

                    <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      Contact Information
                    </p>

                    <div className="mt-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail
                          size={15}
                          className="shrink-0 text-slate-600"
                        />

                        <a
                          href={`mailto:${selectedContact.email}`}
                          className="truncate text-xs text-slate-400 transition hover:text-blue-400"
                        >
                          {selectedContact.email}
                        </a>
                      </div>

                      {selectedContact.phone && (
                        <div className="flex items-center gap-3">
                          <Phone
                            size={15}
                            className="shrink-0 text-slate-600"
                          />

                          <a
                            href={`tel:${selectedContact.phone}`}
                            className="text-xs text-slate-400 transition hover:text-blue-400"
                          >
                            {selectedContact.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
