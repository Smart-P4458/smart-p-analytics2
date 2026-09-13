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
        .from("conversations")
        .select(
          "id, visitor_id, session_id, status, created_at, updated_at"
        )
        .order("updated_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Admin conversations query error:",
        error
      );

      return jsonResponse(500, {
        message:
          "Unable to load conversations.",
      });
    }

    return jsonResponse(200, data ?? []);
  } catch (error) {
    console.error(
      "Admin conversations function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};