import {
  Mail,
} from "lucide-react";

import AdminEmptyState from "./AdminEmptyState";

export default function ContactInbox() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-400">
          Website
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Contact Inbox
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Manage messages submitted through the Smart-P
          Analytics contact form.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
            <Mail size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Contact Submissions
            </h3>

            <p className="text-xs text-slate-500">
              Website enquiries and project requests
            </p>
          </div>
        </div>

        <div className="p-5">
          <AdminEmptyState
            title="No contact submissions loaded"
            description="Contact form submissions from Supabase will appear here after the admin API is connected."
          />
        </div>
      </div>
    </div>
  );
}