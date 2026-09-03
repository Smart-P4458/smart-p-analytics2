import {
  useState,
  type SyntheticEvent,
} from "react";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

import { fadeRight } from "./ContactAnimation";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormStatus =
  | "idle"
  | "success"
  | "error";

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] =
    useState<FormData>(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch(
        "/.netlify/functions/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            source:
              "Smart-P Analytics Portfolio Website",
          }),
        }
      );

      /*
        Read the response safely as text first.

        This prevents:
        "Unexpected end of JSON input"

        when the Netlify function returns an
        empty response body.
      */
      const responseText =
        await response.text();

      let result: {
        message?: string;
      } = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Unable to send your message. Server responded with status ${response.status}.`
        );
      }

      setStatus("success");

      setStatusMessage(
        result.message ||
          "Thank you! Your message has been sent successfully."
      );

      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
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
          type="text"
          required
          value={formData.fullName}
          onChange={(event) =>
            updateField(
              "fullName",
              event.target.value
            )
          }
          placeholder="Your Full Name"
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
          type="email"
          required
          value={formData.email}
          onChange={(event) =>
            updateField(
              "email",
              event.target.value
            )
          }
          placeholder="your@email.com"
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
        </label>

        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(event) =>
            updateField(
              "phone",
              event.target.value
            )
          }
          placeholder="+234 800 000 0000"
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
          type="text"
          required
          value={formData.subject}
          onChange={(event) =>
            updateField(
              "subject",
              event.target.value
            )
          }
          placeholder="What's Your Discussion Topic?"
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
          rows={6}
          required
          value={formData.message}
          onChange={(event) =>
            updateField(
              "message",
              event.target.value
            )
          }
          placeholder="Tell me about your project..."
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
          "
        />
      </div>

      {/* Status Message */}

      {status !== "idle" && (
        <div
          role="status"
          className={`
            rounded-xl
            border
            px-4
            py-3
            text-sm
            ${
              status === "success"
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }
          `}
        >
          {statusMessage}
        </div>
      )}

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
          disabled:opacity-60
          disabled:hover:scale-100
        "
      >
        <Send size={20} />

        {isSubmitting
          ? "Sending..."
          : "Send Message"}
      </button>
    </motion.form>
  );
}
