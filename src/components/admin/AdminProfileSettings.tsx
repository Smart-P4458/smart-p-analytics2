import { useEffect, useRef, useState } from "react";
import {
  X,
  Camera,
  User,
  Mail,
  Save,
  Loader2,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

type AdminProfileSettingsProps = {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated?: () => void;
};

type ProfileForm = {
  fullName: string;
  email: string;
  avatarUrl: string;
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export default function AdminProfileSettings({
  isOpen,
  onClose,
  onProfileUpdated,
}: AdminProfileSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    avatarUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;

    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        setError("");
        setMessage("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!mounted || !user) return;

        const metadata = user.user_metadata ?? {};

        setForm({
          fullName:
            typeof metadata.full_name === "string"
              ? metadata.full_name
              : "Pam Sani George",
          email: user.email ?? "",
          avatarUrl:
            typeof metadata.avatar_url === "string"
              ? metadata.avatar_url
              : "",
        });

        setPreviewUrl("");
        setSelectedFile(null);
      } catch (profileError) {
        console.error("Unable to load admin profile:", profileError);

        if (mounted) {
          setError("Unable to load your profile information.");
        }
      } finally {
        if (mounted) {
          setLoadingProfile(false);
        }
      }
    };

    void loadProfile();

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) {
    return null;
  }

  const currentAvatar =
    previewUrl || form.avatarUrl || "/images/admin-profile.jpg";

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Profile image must be 2 MB or smaller.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
  };

  const uploadAvatar = async (
    userId: string,
    file: File,
  ): Promise<string> => {
    const fileExtension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const filePath = `${userId}/profile.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("admin-avatars")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("admin-avatars")
      .getPublicUrl(filePath);

    if (!data.publicUrl) {
      throw new Error("Unable to generate profile image URL.");
    }

    return `${data.publicUrl}?v=${Date.now()}`;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("Admin session not found.");
      }

      let avatarUrl = form.avatarUrl;

      if (selectedFile) {
        avatarUrl = await uploadAvatar(user.id, selectedFile);
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: form.fullName.trim(),
          avatar_url: avatarUrl,
        },
      });

      if (updateError) {
        throw updateError;
      }

      setForm((previous) => ({
        ...previous,
        fullName: form.fullName.trim(),
        avatarUrl,
      }));

      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }

      setMessage("Profile settings saved successfully.");

      onProfileUpdated?.();
    } catch (saveError) {
      console.error("Unable to save admin profile:", saveError);

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save profile settings.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("Admin session not found.");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: "",
        },
      });

      if (updateError) {
        throw updateError;
      }

      setForm((previous) => ({
        ...previous,
        avatarUrl: "",
      }));

      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }

      setMessage("Profile image removed.");

      onProfileUpdated?.();
    } catch (removeError) {
      console.error("Unable to remove profile image:", removeError);

      setError("Unable to remove profile image.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setError("");
    setMessage("");
    setSelectedFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Profile Settings
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage your administrator profile
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close profile settings"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto px-5 py-6">
          {loadingProfile ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <Loader2
                  size={28}
                  className="mx-auto animate-spin text-blue-400"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Loading profile...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Profile image */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={currentAvatar}
                    alt={form.fullName || "Admin profile"}
                    className="h-28 w-28 rounded-full border-4 border-slate-800 object-cover shadow-xl"
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://ui-avatars.com/api/?name=Pam+Sani+George&background=2563eb&color=ffffff&bold=true";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    aria-label="Change profile image"
                    className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-blue-600 text-white shadow-lg transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <p className="mt-3 text-sm font-medium text-slate-200">
                  Profile Photo
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  JPG, PNG or WebP · Maximum 2 MB
                </p>

                {(form.avatarUrl || selectedFile) && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={loading}
                    className="mt-3 inline-flex items-center gap-2 text-xs text-red-400 transition hover:text-red-300 disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    Remove photo
                  </button>
                )}
              </div>

              {/* Form */}
              <div className="mt-8 space-y-5">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="admin-full-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="admin-full-name"
                      type="text"
                      value={form.fullName}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          fullName: event.target.value,
                        }))
                      }
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-10 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="admin-email"
                      type="email"
                      value={form.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-950/60 px-10 py-3 text-sm text-slate-500 outline-none"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    Your administrator email is managed by Supabase
                    Authentication.
                  </p>
                </div>

                {/* Role */}
                <div>
                  <div className="mb-2 block text-sm font-medium text-slate-300">
                    Account role
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                      <ShieldCheck
                        size={18}
                        className="text-blue-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Administrator
                      </p>

                      <p className="text-xs text-slate-500">
                        Smart-P Analytics admin account
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {message && (
                <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  {message}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!loadingProfile && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !form.fullName.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
