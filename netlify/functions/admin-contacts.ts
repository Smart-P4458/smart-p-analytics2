import type {
  Handler,
  HandlerResponse,
} from "@netlify/functions";

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

export const handler: Handler = async () => {
  try {
    const { data, error } =
      await supabase
        .from("contact_submissions")
        .select(
          "id, name, email, phone, subject, message, source, automation_status, created_at"
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
  } catch (error) {
    console.error(
      "Admin contacts function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};