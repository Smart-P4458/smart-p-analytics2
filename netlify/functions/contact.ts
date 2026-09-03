import type {
  Handler,
  HandlerEvent,
} from "@netlify/functions";

import { supabaseAdmin } from "./lib/supabase";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

const jsonResponse = (
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {}
) => ({
  statusCode,
  headers: {
    ...headers,
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async (
  event: HandlerEvent
) => {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(
      204,
      {},
      {
        Allow: "POST, OPTIONS",
      }
    );
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(
      405,
      {
        success: false,
        message: "Method not allowed.",
      },
      {
        Allow: "POST, OPTIONS",
      }
    );
  }

  try {
    if (!event.body) {
      return jsonResponse(400, {
        success: false,
        message: "Request body is required.",
      });
    }

    const payload =
      JSON.parse(event.body) as ContactPayload;

    const name =
      payload.name?.trim() ?? "";

    const email =
      payload.email?.trim().toLowerCase() ?? "";

    const phone =
      payload.phone?.trim() ?? "";

    const subject =
      payload.subject?.trim() ?? "";

    const message =
      payload.message?.trim() ?? "";

    if (!name || !email || !message) {
      return jsonResponse(400, {
        success: false,
        message:
          "Name, email, and message are required.",
      });
    }

    const { data: submission, error: insertError } =
      await supabaseAdmin
        .from("contact_submissions")
        .insert({
          id: crypto.randomUUID(),
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          source: "website_contact_form",
          automation_status: "pending",
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (insertError) {
      console.error(
        "Supabase contact insert error:",
        insertError
      );

      return jsonResponse(500, {
        success: false,
        message:
          "Unable to save your message at this time.",
      });
    }

    const makeWebhookUrl =
      process.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      const errorMessage =
        "MAKE_WEBHOOK_URL environment variable is missing.";

      await supabaseAdmin
        .from("automation_failures")
        .insert({
          id: crypto.randomUUID(),
          type: "contact_automation",
          reference_id: submission.id,
          error_message: errorMessage,
          status: "open",
          created_at: new Date().toISOString(),
        });

      await supabaseAdmin
        .from("contact_submissions")
        .update({
          automation_status: "failed",
        })
        .eq("id", submission.id);

      return jsonResponse(200, {
        success: true,
        automation: "failed",
        message:
          "Your message was received successfully. I will respond as soon as possible.",
      });
    }

    try {
      const makeResponse = await fetch(
        makeWebhookUrl,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            submissionId:
              submission.id,

            name,
            email,
            phone,
            subject,
            message,

            source:
              "Smart-P Analytics Website",

            submittedAt:
              submission.created_at,
          }),
        }
      );

      if (!makeResponse.ok) {
        throw new Error(
          `Make webhook returned status ${makeResponse.status}`
        );
      }

      await supabaseAdmin
        .from("contact_submissions")
        .update({
          automation_status: "completed",
        })
        .eq("id", submission.id);

      return jsonResponse(200, {
        success: true,
        automation: "completed",
        message:
          "Your message has been sent successfully.",
      });
    } catch (automationError) {
      const errorMessage =
        automationError instanceof Error
          ? automationError.message
          : "Unknown automation error.";

      console.error(
        "Make automation failed:",
        automationError
      );

      await supabaseAdmin
        .from("automation_failures")
        .insert({
          id: crypto.randomUUID(),
          type: "contact_automation",
          reference_id: submission.id,
          error_message: errorMessage,
          status: "open",
          created_at: new Date().toISOString(),
        });

      await supabaseAdmin
        .from("contact_submissions")
        .update({
          automation_status: "failed",
        })
        .eq("id", submission.id);

      /*
        IMPORTANT:

        The visitor's message has already been
        safely saved in Supabase.

        Therefore, Make failing does NOT cause
        the visitor's message to be lost.
      */

      return jsonResponse(200, {
        success: true,
        automation: "failed",
        message:
          "Your message was received successfully. I will respond as soon as possible.",
      });
    }
  } catch (error) {
    console.error(
      "Contact function error:",
      error
    );

    return jsonResponse(500, {
      success: false,
      message:
        "Something went wrong. Please try again.",
    });
  }
};
