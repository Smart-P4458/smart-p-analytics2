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

type ContactRecord = {
  id: string;
  name: string;
  email: string;
  subject: string;
  automation_status: string;
  created_at: string;
};

type AutomationFailureRecord = {
  id: string;
  type: string;
  reference_id: string | null;
  error_message: string;
  status: string;
  created_at: string;
  resolved_at: string | null;
};

export const handler: Handler = async (event) => {
  const auth = await requireAdmin(event);

  if (!auth.authorized) {
    return jsonResponse(auth.statusCode, {
      message: auth.message,
    });
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, {
      message: "Method not allowed.",
    });
  }

  try {
    const {
      data: failedContacts,
      error: failedContactsError,
    } = await supabase
      .from("contact_submissions")
      .select(
        `
          id,
          name,
          email,
          subject,
          automation_status,
          created_at
        `
      )
      .eq("automation_status", "failed");

    if (failedContactsError) {
      console.error(
        "Failed contacts query error:",
        failedContactsError
      );

      return jsonResponse(500, {
        message:
          "Unable to load failed contact records.",
      });
    }

    for (const contact of failedContacts ?? []) {
      const {
        data: existingFailure,
        error: existingFailureError,
      } = await supabase
        .from("automation_failures")
        .select("id")
        .eq("reference_id", contact.id)
        .eq("type", "contact_form")
        .maybeSingle();

      if (existingFailureError) {
        console.error(
          "Automation failure lookup error:",
          existingFailureError
        );

        return jsonResponse(500, {
          message:
            "Unable to verify automation failures.",
        });
      }

      if (!existingFailure) {
        const { error: insertError } =
          await supabase
            .from("automation_failures")
            .insert({
              type: "contact_form",
              reference_id: contact.id,
              error_message: `Contact automation failed for ${contact.email}.`,
              status: "open",
            });

        if (insertError) {
          console.error(
            "Automation failure creation error:",
            insertError
          );

          return jsonResponse(500, {
            message:
              "Unable to create automation failure record.",
          });
        }
      }
    }

    const {
      data: failures,
      error: failuresError,
    } = await supabase
      .from("automation_failures")
      .select(
        `
          id,
          type,
          reference_id,
          error_message,
          status,
          created_at,
          resolved_at
        `
      )
      .order("created_at", {
        ascending: false,
      });

    if (failuresError) {
      console.error(
        "Automation failures query error:",
        failuresError
      );

      return jsonResponse(500, {
        message:
          "Unable to load automation failures.",
      });
    }

    const failureRecords =
      (failures ??
        []) as AutomationFailureRecord[];

    const referenceIds = failureRecords
      .map(
        (failure) =>
          failure.reference_id
      )
      .filter(
        (id): id is string =>
          Boolean(id)
      );

    let contacts: ContactRecord[] = [];

    if (referenceIds.length > 0) {
      const {
        data: contactData,
        error: contactsError,
      } = await supabase
        .from("contact_submissions")
        .select(
          `
            id,
            name,
            email,
            subject,
            automation_status,
            created_at
          `
        )
        .in("id", referenceIds);

      if (contactsError) {
        console.error(
          "Automation failure contacts query error:",
          contactsError
        );

        return jsonResponse(500, {
          message:
            "Unable to load failure contact details.",
        });
      }

      contacts =
        (contactData ??
          []) as ContactRecord[];
    }

    const response = failureRecords
      .map((failure) => {
        const contact =
          contacts.find(
            (item) =>
              item.id ===
              failure.reference_id
          );

        if (!contact) {
          return null;
        }

        return {
          id: failure.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          automation_status:
            failure.status,
          created_at:
            failure.created_at,
        };
      })
      .filter(
        (
          item
        ): item is {
          id: string;
          name: string;
          email: string;
          subject: string;
          automation_status: string;
          created_at: string;
        } => item !== null
      );

    return jsonResponse(
      200,
      response
    );
  } catch (error) {
    console.error(
      "Admin automation failures function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};
