import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { supabase } from "../lib/supabase";

const ADMIN_EMAIL = "sanismartp1@gmail.com";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (data.session?.user) {
        const currentEmail =
          data.session.user.email?.toLowerCase();

        if (currentEmail === ADMIN_EMAIL) {
          navigate("/admin", { replace: true });
          return;
        }

        await supabase.auth.signOut();
      }

      setLoading(false);
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== ADMIN_EMAIL) {
      setError("This account is not authorized to access the admin dashboard.");
      setSubmitting(false);
      return;
    }

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (signInError) {
      setError(
        signInError.message ||
          "Unable to sign in. Please check your credentials."
      );
      setSubmitting(false);
      return;
    }

    const { data } = await supabase.auth.getSession();

    const authenticatedEmail =
      data.session?.user.email?.toLowerCase();

    if (authenticatedEmail !== ADMIN_EMAIL) {
      await supabase.auth.signOut();

      setError(
        "This account is not authorized to access the admin dashboard."
      );
      setSubmitting(false);
      return;
    }

    navigate("/admin", { replace: true });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="text-sm text-slate-400">
          Checking authentication...
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_35%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <ShieldCheck
              size={32}
              className="text-blue-400"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Smart-P Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Secure administrator access
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Admin Login
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to manage Smart-P Analytics.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-300">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-800 pt-5 text-center">
            <p className="text-xs text-slate-500">
              Authorized administrator access only.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
