import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { fadeRight } from "./ContactAnimation";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] =
    useState<FormData>({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);

  const [error, setError] = useState("");

  /*
   * ----------------------------------------
   * AI CONTACT PREFILL
   * ----------------------------------------
   *
   * Smart-P AI can send the visitor here with:
   *
   * ?contact=1
   * &subject=...
   * &message=...
   *
   * The form reads those values and pre-fills
   * the Subject and Message fields.
   */

  useEffect(() => {
  const params = new URLSearchParams(
    window.location.search
  );

  const shouldPrefill =
    params.get("contact") === "1";

  if (!shouldPrefill) return;

  const subject =
    params.get("subject") || "";

  const message =
    params.get("message") || "";

  setFormData((prev) => ({
    ...prev,
    subject,
    message,
  }));

  const cleanUrl =
    window.location.pathname +
    window.location.hash;

  window.history.replaceState(
    {},
    document.title,
    cleanUrl
  );
}, []);

  /*
   * ----------------------------------------
   * FORM INPUT HANDLER
   * ----------------------------------------
   */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setIsSuccess(false);
  };

  /*
   * ----------------------------------------
   * FORM SUBMISSION
   * ----------------------------------------
   */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setIsSuccess(false);

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!formData.subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
  "/.netlify/functions/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName:
              formData.fullName.trim(),

            email:
              formData.email.trim(),

            phone:
              formData.phone.trim(),

            subject:
              formData.subject.trim(),

            notes:
              formData.message.trim(),

            source:
              "Smart-P Analytics Portfolio",

            submittedAt:
              new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to submit the form."
        );
      }

      setIsSuccess(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(
        "Contact form submission error:",
        err
      );

      setError(
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={fadeRight}
      onSubmit={handleSubmit}
      className="
        space-y-6
        rounded-[32px]
        border
        border-slate-800
        bg-slate-900/70
        p-8
        backdrop-blur-sm
      "
    >
      {/* Success */}

      {isSuccess && (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-emerald-500/30
            bg-emerald-500/10
            p-4
            text-emerald-300
          "
        >
          <CheckCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Message sent successfully!
            </p>

            <p className="mt-1 text-sm text-emerald-300/80">
              Thank you for reaching out.
              Pam has received your message
              and will get back to you as soon
              as possible.
            </p>
          </div>
        </div>
      )}

      {/* Error */}

      {error && (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-red-300
          "
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm">
            {error}
          </p>
        </div>
      )}

      {/* Full Name */}

      <div>
        <label
          htmlFor="fullName"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Full Name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your Full Name"
          autoComplete="name"
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-3
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Email */}

      <div>
        <label
          htmlFor="email"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          autoComplete="email"
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-3
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Phone */}

      <div>
        <label
          htmlFor="phone"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Phone Number
          <span className="ml-2 text-xs text-slate-500">
            Optional
          </span>
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          autoComplete="tel"
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-3
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Subject */}

      <div>
        <label
          htmlFor="subject"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's Your Discussion Topic?"
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-3
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Message */}

      <div>
        <label
          htmlFor="message"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-300
          "
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          disabled={isSubmitting}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            px-5
            py-3
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-500
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-blue-600
          px-6
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:bg-blue-700
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:scale-100
          disabled:opacity-60
        "
      >
        <Send
          size={20}
          className={
            isSubmitting
              ? "animate-pulse"
              : ""
          }
        />

        {isSubmitting
          ? "Sending..."
          : "Send Message"}
      </button>
    </motion.form>
  );
}
