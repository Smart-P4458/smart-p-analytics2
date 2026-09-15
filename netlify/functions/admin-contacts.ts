import type {
  Handler,
  HandlerResponse,
} from "@netlify/functions";

import { requireAdmin } from "./_adminAuth";
import { supabase } from "./_supabase";

const jsonResponse = (
  statusCode: number,
  body: unknown
): HandlerResponse => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

async function createAutomationFailure(
  contactId: string,
  errorMessage: string
) {
  const {
    data: existingFailure,
    error: lookupError,
  } = await supabase
    .from("automation_failures")
    .select("id, status")
    .eq("reference_id", contactId)
    .eq("type", "contact_form")
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  if (existingFailure) {
    return existingFailure;
  }

  const { data, error } = await supabase
    .from("automation_failures")
    .insert({
      type: "contact_form",
      reference_id: contactId,
      error_message: errorMessage,
      status: "open",
    })
    .select(
      "id, type, reference_id, error_message, status, created_at, resolved_at"
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function resolveAutomationFailure(
  contactId: string
) {
  const { data, error } = await supabase
    .from("automation_failures")
    .update({
      status: "resolved",
      resolved_at: new Date().toISOString(),
    })
    .eq("reference_id", contactId)
    .neq("status", "resolved")
    .select(
      "id, type, reference_id, error_message, status, created_at, resolved_at"
    );

  if (error) {
    throw error;
  }

  return data ?? [];
}

export const handler: Handler = async (event) => {
  const auth = await requireAdmin(event);

  if (!auth.authorized) {
    return jsonResponse(auth.statusCode, {
      message: auth.message,
    });
  }

  if (
    event.httpMethod !== "GET" &&
    event.httpMethod !== "PATCH"
  ) {
    return jsonResponse(405, {
      message: "Method not allowed.",
    });
  }

  try {
    /*
     * GET
     * Load all contact submissions.
     */
    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select(
          `
            id,
            name,
            email,
            phone,
            subject,
            message,
            source,
            automation_status,
            created_at
          `
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Admin contacts query error:",
          error
        );

        return jsonResponse(500, {
          message:
            "Unable to load contact submissions.",
        });
      }

      return jsonResponse(200, data ?? []);
    }

    /*
     * PATCH
     * Update contact automation status.
     */
    const contactId =
      event.queryStringParameters?.contactId;

    if (!contactId) {
      return jsonResponse(400, {
        message: "contactId is required.",
      });
    }

    if (!event.body) {
      return jsonResponse(400, {
        message: "Request body is required.",
      });
    }

    let body: {
      automation_status?: string;
    };

    try {
      body = JSON.parse(event.body) as {
        automation_status?: string;
      };
    } catch {
      return jsonResponse(400, {
        message: "Invalid JSON request body.",
      });
    }

    const automationStatus =
      body.automation_status?.trim();

    if (!automationStatus) {
      return jsonResponse(400, {
        message:
          "automation_status is required.",
      });
    }

    const { data, error } = await supabase
      .from("contact_submissions")
      .update({
        automation_status: automationStatus,
      })
      .eq("id", contactId)
      .select(
        `
          id,
          name,
          email,
          phone,
          subject,
          message,
          source,
          automation_status,
          created_at
        `
      )
      .maybeSingle();

    if (error) {
      console.error(
        "Admin contact status update error:",
        error
      );

      return jsonResponse(500, {
        message:
          "Unable to update contact status.",
        details: error.message,
      });
    }

    if (!data) {
      return jsonResponse(404, {
        message: "Contact submission not found.",
      });
    }

    /*
     * Failed contact:
     * Create an automation failure record.
     */
    if (automationStatus === "failed") {
      await createAutomationFailure(
        contactId,
        `Contact automation failed for ${data.email}.`
      );
    }

    /*
     * Non-failed contact:
     * Resolve any previous automation failure.
     */
    if (automationStatus !== "failed") {
      await resolveAutomationFailure(
        contactId
      );
    }

    return jsonResponse(200, data);
  } catch (error) {
    console.error(
      "Admin contacts function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
      details:
        error instanceof Error
          ? error.message
          : "Unknown error.",
    });
  }
};
