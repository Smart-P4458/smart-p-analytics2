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
          "id, name, email, subject, automation_status, created_at"
        )
        .eq("automation_status", "failed")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Admin failures query error:",
        error
      );

      return jsonResponse(500, {
        message:
          "Unable to load automation failures.",
      });
    }

    return jsonResponse(200, data ?? []);
  } catch (error) {
    console.error(
      "Admin failures function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};