import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type AuthMode = "login" | "forgot" | "reset";

const ADMIN_EMAIL = "sanismartp1@gmail.com";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState<AuthMode>("login");

  const [email, setEmail] =
    useState(ADMIN_EMAIL);

  const [password, setPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [checkingSession, setCheckingSession] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =========================================================
     SESSION CHECK
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        const authenticatedEmail =
          session?.user?.email
            ?.trim()
            .toLowerCase();

        if (
          authenticatedEmail ===
          ADMIN_EMAIL.toLowerCase()
        ) {
          navigate("/admin", {
            replace: true,
          });

          return;
        }
      } catch (sessionError) {
        console.error(
          "Admin session check failed:",
          sessionError,
        );
      }

      if (mounted) {
        setCheckingSession(false);
      }
    };

    void checkSession();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (event, session) => {
          if (!mounted) {
            return;
          }

          const authenticatedEmail =
            session?.user?.email
              ?.trim()
              .toLowerCase();

          if (
            event === "PASSWORD_RECOVERY" &&
            authenticatedEmail ===
              ADMIN_EMAIL.toLowerCase()
          ) {
            setMode("reset");
            setError("");

            setMessage(
              "Create a new password for your admin account.",
            );

            setCheckingSession(false);

            return;
          }

          if (
            event === "SIGNED_IN" &&
            authenticatedEmail ===
              ADMIN_EMAIL.toLowerCase()
          ) {
            navigate("/admin", {
              replace: true,
            });
          }

          setCheckingSession(false);
        },
      );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const clearFeedback = () => {
    setError("");
    setMessage("");
  };

  const switchMode = (
    nextMode: AuthMode,
  ) => {
    clearFeedback();
    setMode(nextMode);
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    clearFeedback();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (
      !normalizedEmail ||
      !password
    ) {
      setError(
        "Please enter your email address and password.",
      );

      return;
    }

    if (
      normalizedEmail !==
      ADMIN_EMAIL.toLowerCase()
    ) {
      setError(
        "You are not authorized to access the admin dashboard.",
      );

      return;
    }

    setLoading(true);

    try {
      const {
        data,
        error: signInError,
      } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (
        signInError ||
        !data.user
      ) {
        setError(
          "Unable to sign in. Please check your email and password.",
        );

        return;
      }

      const authenticatedEmail =
        data.user.email
          ?.trim()
          .toLowerCase();

      if (
        authenticatedEmail !==
        ADMIN_EMAIL.toLowerCase()
      ) {
        await supabase.auth.signOut();

        setError(
          "You are not authorized to access the admin dashboard.",
        );

        return;
      }

      navigate("/admin", {
        replace: true,
      });
    } catch {
      setError(
        "Unable to sign in. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FORGOT PASSWORD
  ========================================================= */

  const handleForgotPassword = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    clearFeedback();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError(
        "Please enter your email address.",
      );

      return;
    }

    if (
      normalizedEmail !==
      ADMIN_EMAIL.toLowerCase()
    ) {
      setError(
        "Password reset is only available for the authorized admin account.",
      );

      return;
    }

    setLoading(true);

    try {
      const redirectTo =
        `${window.location.origin}/admin/login`;

      const {
        error: resetError,
      } =
        await supabase.auth.resetPasswordForEmail(
          normalizedEmail,
          {
            redirectTo,
          },
        );

      if (resetError) {
        setError(
          "Unable to send the password reset email. Please try again.",
        );

        return;
      }

      setMessage(
        "Password reset instructions have been sent to your email address.",
      );
    } catch {
      setError(
        "Unable to send the password reset email. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESET PASSWORD
  ========================================================= */

  const handlePasswordReset = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    clearFeedback();

    if (
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        "Please complete both password fields.",
      );

      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Your new password must contain at least 8 characters.",
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "The passwords do not match.",
      );

      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      const authenticatedEmail =
        user?.email
          ?.trim()
          .toLowerCase();

      if (
        !user ||
        authenticatedEmail !==
          ADMIN_EMAIL.toLowerCase()
      ) {
        setError(
          "This password reset session is not authorized.",
        );

        return;
      }

      const {
        error: updateError,
      } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) {
        setError(
          "Unable to update your password. Please try again.",
        );

        return;
      }

      await supabase.auth.signOut();

      setMode("login");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage(
        "Your password has been updated successfully. You can now sign in.",
      );
    } catch {
      setError(
        "Unable to update your password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (checkingSession) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#020817] text-white">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-400" />
          </div>

          <p className="text-sm font-semibold">
            Smart-P Analytics
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Checking secure admin access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-[#020817] text-white">
      <div className="flex h-full w-full flex-col lg:flex-row">

        {/* =====================================================
            LEFT PANEL
        ====================================================== */}

        <section className="relative hidden min-h-0 overflow-hidden lg:flex lg:w-[57%] xl:w-[58%]">

          {/* Background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(37,99,235,0.28),transparent_42%),radial-gradient(circle_at_80%_75%,rgba(14,165,233,0.15),transparent_38%),linear-gradient(135deg,#03133b_0%,#031b52_50%,#020817_100%)]" />

          {/* Grid */}

          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(96,165,250,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.45) 1px, transparent 1px)",
              backgroundSize:
                "42px 42px",
            }}
          />

          {/* Glow */}

          <div className="absolute -left-32 top-[28%] h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[110px]" />

          <div className="absolute -bottom-40 right-[-80px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px]" />

          {/* Content */}

          <div className="relative z-10 flex h-full min-h-0 w-full flex-col px-8 py-7 xl:px-12 xl:py-8">

            {/* BRAND */}

            <div className="shrink-0">

              <div className="flex items-center gap-4">

                <img
                  src="/branding/Smart-P-Logo.png"
                  alt="Smart-P Analytics"
                  className="h-14 w-14 object-contain xl:h-16 xl:w-16"
                />

                <div className="min-w-0">

                  <h1 className="text-[32px] font-bold leading-none tracking-tight xl:text-[38px]">

                    <span className="text-white">
                      Smart-P{" "}
                    </span>

                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      Analytics
                    </span>

                  </h1>

                  <p className="mt-2 text-sm font-medium tracking-wide text-blue-200/90 xl:text-base">
                    Built On Resilience. Powered By Data.
                  </p>

                </div>
              </div>

              <p className="mt-5 max-w-[610px] text-sm leading-6 text-blue-100/75 xl:text-base xl:leading-7">
                Track conversations, monitor performance,
                and automate workflows — all in one
                powerful platform.
              </p>

            </div>

            {/* FEATURES */}

            <div className="mt-5 grid shrink-0 max-w-[690px] grid-cols-4 gap-2.5 xl:mt-6 xl:gap-3">

              <FeatureItem
                icon={
                  <BarChart3 className="h-5 w-5" />
                }
                label={
                  <>
                    Real-Time
                    <br />
                    Analytics
                  </>
                }
              />

              <FeatureItem
                icon={
                  <MessageSquareIcon />
                }
                label={
                  <>
                    Conversation
                    <br />
                    Insights
                  </>
                }
              />

              <FeatureItem
                icon={
                  <Zap className="h-5 w-5" />
                }
                label={
                  <>
                    Smart
                    <br />
                    Automation
                  </>
                }
              />

              <FeatureItem
                icon={
                  <ShieldCheck className="h-5 w-5" />
                }
                label={
                  <>
                    Secure
                    <br />
                    & Reliable
                  </>
                }
              />

            </div>

            {/* DASHBOARD */}

            <div className="relative min-h-0 flex-1">

              <div className="absolute inset-x-0 bottom-0 top-2 flex items-center justify-center">

                <AnalyticsDashboardGraphic />

              </div>

            </div>

            {/* SLOGAN */}

            <div className="mt-2 flex shrink-0 items-center justify-center gap-3 text-[10px] font-semibold tracking-[0.25em] text-blue-300 xl:gap-4 xl:text-[12px]">

              <span className="h-px w-14 bg-gradient-to-r from-transparent to-blue-500 xl:w-20" />

              <span>ANALYZE</span>

              <span>/</span>

              <span>AUTOMATE</span>

              <span>/</span>

              <span>GROW</span>

              <span className="h-px w-14 bg-gradient-to-l from-transparent to-blue-500 xl:w-20" />

            </div>

          </div>
        </section>

        {/* =====================================================
            RIGHT AUTH PANEL
        ====================================================== */}

        <section className="relative flex h-full min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#020b1b] px-4 py-4 sm:px-7 lg:px-6 xl:px-10">

          {/* Background glow */}

          <div className="pointer-events-none absolute inset-0">

            <div className="absolute -right-40 -top-40 h-[430px] w-[430px] rounded-full bg-blue-600/10 blur-[110px]" />

            <div className="absolute -bottom-40 -left-40 h-[430px] w-[430px] rounded-full bg-cyan-500/5 blur-[110px]" />

          </div>

          {/* AUTH CARD */}

          <div className="relative z-10 flex max-h-full w-full max-w-[590px] items-center">

            <div className="w-full rounded-[22px] border border-blue-400/20 bg-[#061329]/90 px-6 py-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-8 sm:py-7 xl:px-9 xl:py-8">

              {/* LOGO */}

              <div className="text-center">

                <img
                  src="/branding/Smart-P-Logo.png"
                  alt="Smart-P Analytics"
                  className="mx-auto h-14 w-14 object-contain xl:h-16 xl:w-16"
                />

                <h2 className="mt-2 text-[25px] font-bold tracking-tight xl:text-[28px]">

                  <span className="text-white">
                    Smart-P{" "}
                  </span>

                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Analytics
                  </span>

                </h2>

                <p className="mt-1 text-xs text-slate-400 xl:text-sm">
                  Admin Access
                </p>

              </div>

              {/* HEADING */}

              {mode === "login" && (
                <div className="mt-6">

                  <h3 className="text-[24px] font-bold tracking-tight xl:text-[26px]">
                    Welcome Back
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Sign in to access your admin dashboard
                  </p>

                </div>
              )}

              {mode === "forgot" && (
                <div className="mt-6">

                  <h3 className="text-[24px] font-bold tracking-tight xl:text-[26px]">
                    Reset Password
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Enter your admin email and we'll
                    send you instructions to reset your
                    password.
                  </p>

                </div>
              )}

              {mode === "reset" && (
                <div className="mt-6">

                  <h3 className="text-[24px] font-bold tracking-tight xl:text-[26px]">
                    Create New Password
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Choose a secure password for your
                    admin account.
                  </p>

                </div>
              )}

              {/* ERROR */}

              {error && (
                <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {message && (
                <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm leading-5 text-emerald-300">

                  <div className="flex gap-2">

                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>
                      {message}
                    </span>

                  </div>

                </div>
              )}

              {/* =================================================
                  LOGIN
              ================================================== */}

              {mode === "login" && (
                <form
                  onSubmit={handleLogin}
                  className="mt-5 space-y-4 xl:mt-6 xl:space-y-5"
                >

                  <InputField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="admin@example.com"
                    icon={
                      <Mail className="h-5 w-5" />
                    }
                    autoComplete="email"
                  />

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <label
                        htmlFor="admin-password"
                        className="text-sm font-semibold text-slate-200"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          switchMode("forgot")
                        }
                        className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                      >
                        Forgot password?
                      </button>

                    </div>

                    <PasswordInput
                      id="admin-password"
                      value={password}
                      onChange={setPassword}
                      visible={showPassword}
                      setVisible={
                        setShowPassword
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-base font-bold shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                      </>
                    )}

                  </button>

                </form>
              )}

              {/* =================================================
                  FORGOT PASSWORD
              ================================================== */}

              {mode === "forgot" && (
                <form
                  onSubmit={
                    handleForgotPassword
                  }
                  className="mt-5 space-y-4 xl:mt-6 xl:space-y-5"
                >

                  <InputField
                    label="Admin email address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="sanismartp1@gmail.com"
                    icon={
                      <Mail className="h-5 w-5" />
                    }
                    autoComplete="email"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-base font-bold shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send reset link

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                      </>
                    )}

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      switchMode("login")
                    }
                    className="w-full text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    ← Back to sign in
                  </button>

                </form>
              )}

              {/* =================================================
                  RESET PASSWORD
              ================================================== */}

              {mode === "reset" && (
                <form
                  onSubmit={
                    handlePasswordReset
                  }
                  className="mt-5 space-y-4 xl:mt-6 xl:space-y-5"
                >

                  <PasswordInput
                    id="new-password"
                    label="New password"
                    value={newPassword}
                    onChange={setNewPassword}
                    visible={showNewPassword}
                    setVisible={
                      setShowNewPassword
                    }
                    autoComplete="new-password"
                  />

                  <PasswordInput
                    id="confirm-password"
                    label="Confirm new password"
                    value={confirmPassword}
                    onChange={
                      setConfirmPassword
                    }
                    visible={
                      showConfirmPassword
                    }
                    setVisible={
                      setShowConfirmPassword
                    }
                    autoComplete="new-password"
                  />

                  <p className="text-xs text-slate-500">
                    Use at least 8 characters for your
                    new password.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-base font-bold shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        Update password

                        <CheckCircle2 className="h-5 w-5" />
                      </>
                    )}

                  </button>

                </form>
              )}

              {/* =================================================
                  SECURITY FOOTER
              ================================================== */}

              <div className="mt-5 border-t border-blue-200/10 pt-4 xl:mt-6 xl:pt-5">

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 xl:text-sm">

                  <ShieldCheck className="h-5 w-5 text-blue-400/80" />

                  <span>
                    Secure admin access only
                  </span>

                </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ===============================================================
   FEATURE ITEM
================================================================ */

function FeatureItem({
  icon,
  label,
}: {
  icon: ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-blue-300/10 bg-blue-950/25 px-2.5 py-2.5 backdrop-blur-sm xl:gap-3 xl:px-3 xl:py-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-600/20 text-blue-400 xl:h-10 xl:w-10">

        {icon}

      </div>

      <span className="text-[10px] font-medium leading-4 text-blue-100/80 xl:text-[11px] xl:leading-5">
        {label}
      </span>

    </div>
  );
}

/* ===============================================================
   INPUT FIELD
================================================================ */

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: ReactNode;
  autoComplete?: string;
}) {
  return (
    <div>

      <label
        htmlFor={label}
        className="mb-2 block text-sm font-semibold text-slate-200"
      >
        {label}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          id={label}
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-[52px] w-full rounded-xl border border-blue-300/20 bg-[#031025] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10"
        />

      </div>

    </div>
  );
}

/* ===============================================================
   PASSWORD INPUT
================================================================ */

function PasswordInput({
  id,
  label,
  value,
  onChange,
  visible,
  setVisible,
  autoComplete,
  placeholder,
}: {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  setVisible: Dispatch<
    SetStateAction<boolean>
  >;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>

      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {label}
        </label>
      )}

      <div className="relative">

        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          id={id}
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-[52px] w-full rounded-xl border border-blue-300/20 bg-[#031025] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10"
        />

        <button
          type="button"
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
          onClick={() =>
            setVisible(
              (current) => !current,
            )
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>

      </div>
    </div>
  );
}

/* ===============================================================
   MESSAGE ICON
================================================================ */

function MessageSquareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
      />
    </svg>
  );
}

/* ===============================================================
   DASHBOARD GRAPHIC
================================================================ */

function AnalyticsDashboardGraphic() {
  return (
    <div className="relative flex w-full items-center justify-center">

      <div className="relative w-[82%] max-w-[650px] -rotate-[3deg] xl:w-[84%] xl:max-w-[700px]">

        {/* Glow */}

        <div className="absolute -inset-5 rounded-[30px] bg-blue-500/10 blur-3xl" />

        {/* Outer frame */}

        <div className="relative rounded-[22px] border border-blue-400/50 bg-[#03122f]/95 p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">

          <div className="rounded-[18px] border border-blue-300/10 bg-[#061735] p-3 xl:p-3.5">

            {/* HEADER */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <img
                  src="/branding/Smart-P-Logo.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />

                <div>

                  <div className="text-[10px] font-semibold text-white">
                    Smart-P Analytics
                  </div>

                  <div className="text-[7px] text-slate-500">
                    Performance overview
                  </div>

                </div>

              </div>

              <div className="rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[7px] font-semibold text-emerald-400">
                LIVE
              </div>

            </div>

            {/* KPI */}

            <div className="mt-3 grid grid-cols-4 gap-1.5">

              <MiniKpi
                title="Conversations"
                value="4"
                change="+25%"
              />

              <MiniKpi
                title="Contacts"
                value="10"
                change="+42%"
              />

              <MiniKpi
                title="Unanswered"
                value="0"
                change="100%"
              />

              <MiniKpi
                title="Automation"
                value="0"
                change="100%"
              />

            </div>

            {/* CHARTS */}

            <div className="mt-2 grid grid-cols-[1.25fr_1fr] gap-2">

              {/* LINE */}

              <div className="rounded-lg border border-blue-200/10 bg-[#071c43] p-2.5">

                <div className="flex items-center justify-between">

                  <span className="text-[8px] font-semibold text-white">
                    Conversation Activity
                  </span>

                  <span className="rounded-full bg-blue-500/15 px-1.5 py-0.5 text-[6px] text-blue-300">
                    +25%
                  </span>

                </div>

                <div className="mt-2 h-[76px]">

                  <svg
                    viewBox="0 0 420 130"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >

                    <defs>

                      <linearGradient
                        id="chartFill"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#1683ff"
                          stopOpacity="0.3"
                        />

                        <stop
                          offset="100%"
                          stopColor="#1683ff"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    <path
                      d="M0 108 C35 88, 40 116, 70 90 S115 92, 140 62 S185 92, 220 57 S265 82, 300 46 S340 72, 375 26 S405 34, 420 12 L420 130 L0 130 Z"
                      fill="url(#chartFill)"
                    />

                    <path
                      d="M0 108 C35 88, 40 116, 70 90 S115 92, 140 62 S185 92, 220 57 S265 82, 300 46 S340 72, 375 26 S405 34, 420 12"
                      fill="none"
                      stroke="#1683ff"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="420"
                      cy="12"
                      r="5"
                      fill="#38bdf8"
                    />

                  </svg>

                </div>

              </div>

              {/* BAR */}

              <div className="rounded-lg border border-blue-200/10 bg-[#071c43] p-2.5">

                <div className="flex items-center justify-between">

                  <span className="text-[8px] font-semibold text-white">
                    Traffic Overview
                  </span>

                  <span className="rounded-full bg-blue-500/15 px-1.5 py-0.5 text-[6px] text-blue-300">
                    +42%
                  </span>

                </div>

                <div className="mt-3 flex h-[72px] items-end justify-between gap-1">

                  {[
                    25,
                    42,
                    32,
                    57,
                    39,
                    68,
                    49,
                    82,
                    60,
                    93,
                  ].map(
                    (
                      height,
                      index,
                    ) => (
                      <div
                        key={index}
                        className="w-full rounded-t-sm bg-gradient-to-t from-blue-700 to-blue-400"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    ),
                  )}

                </div>

              </div>

            </div>

            {/* BOTTOM */}

            <div className="mt-2 grid grid-cols-2 gap-2">

              {/* VISITOR DISTRIBUTION */}

              <div className="flex h-[70px] items-center justify-center overflow-hidden rounded-lg border border-blue-200/10 bg-[#071c43]">

                <div className="relative h-full w-full">

                  <div className="absolute left-[15%] top-[35%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />

                  <div className="absolute left-[29%] top-[52%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />

                  <div className="absolute left-[47%] top-[40%] h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

                  <div className="absolute left-[63%] top-[58%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />

                  <div className="absolute left-[78%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

                  <div className="absolute inset-x-[10%] bottom-[25%] h-px rotate-[7deg] bg-blue-500/30" />

                  <div className="absolute inset-x-[18%] top-[50%] h-px -rotate-[13deg] bg-blue-400/20" />

                  <div className="absolute bottom-2 left-3 text-[6px] font-semibold text-slate-400">
                    Global visitor distribution
                  </div>

                </div>

              </div>

              {/* SMART-P AI */}

              <div className="flex h-[70px] items-center gap-2 rounded-lg border border-blue-200/10 bg-[#071c43] px-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15">

                  <Sparkles className="h-4 w-4 text-cyan-300" />

                </div>

                <div>

                  <div className="text-[8px] font-bold text-white">
                    Smart-P AI
                  </div>

                  <div className="mt-0.5 text-[6px] text-slate-500">
                    Always here to help
                  </div>

                  <div className="mt-1.5 flex gap-0.5">

                    {[
                      3,
                      5,
                      4,
                      7,
                      5,
                      8,
                      4,
                    ].map(
                      (
                        height,
                        index,
                      ) => (
                        <span
                          key={index}
                          className="w-[2px] rounded-full bg-blue-400"
                          style={{
                            height: `${height * 1.5}px`,
                          }}
                        />
                      ),
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* FLOATING BARS */}

        <div className="absolute -bottom-1 -right-12 flex items-end gap-2">

          {[
            28,
            44,
            61,
            80,
          ].map(
            (
              height,
              index,
            ) => (
              <div
                key={index}
                className="w-3.5 rounded-t-sm bg-gradient-to-t from-blue-800 to-blue-400 shadow-[0_0_16px_rgba(37,99,235,0.3)]"
                style={{
                  height: `${height}px`,
                }}
              />
            ),
          )}

        </div>

      </div>
    </div>
  );
}

/* ===============================================================
   MINI KPI
================================================================ */

function MiniKpi({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-md border border-blue-200/10 bg-[#071c43] px-2 py-2">

      <div className="text-[6px] text-slate-500">
        {title}
      </div>

      <div className="mt-0.5 text-[17px] font-bold text-white">
        {value}
      </div>

      <div className="mt-0.5 flex items-center gap-0.5 text-[6px] font-semibold text-emerald-400">

        <TrendingUp className="h-2 w-2" />

        {change}

      </div>

    </div>
  );
}
