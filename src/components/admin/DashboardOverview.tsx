import {
  MessageSquare,
  Mail,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-blue-400">
          Overview
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome to Smart-P Admin
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Monitor Smart-P AI conversations, contact
          submissions, unanswered questions and
          automation activity from one place.
        </p>
      </div>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value="0"
          description="All AI conversations"
          icon={MessageSquare}
        />

        <StatCard
          title="Contact Submissions"
          value="0"
          description="Website enquiries"
          icon={Mail}
        />

        <StatCard
          title="Unanswered Questions"
          value="0"
          description="Questions requiring review"
          icon={HelpCircle}
        />

        <StatCard
          title="Automation Failures"
          value="0"
          description="Issues requiring attention"
          icon={AlertTriangle}
        />
      </section>

      {/* Activity area */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-base font-semibold text-white">
            Recent Conversations
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Your latest Smart-P AI activity will appear here.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-slate-800 p-8 text-center">
            <p className="text-sm text-slate-500">
              No conversation data loaded yet.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-base font-semibold text-white">
            System Activity
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Automation and system events will appear here.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-slate-800 p-8 text-center">
            <p className="text-sm text-slate-500">
              No system activity loaded yet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}