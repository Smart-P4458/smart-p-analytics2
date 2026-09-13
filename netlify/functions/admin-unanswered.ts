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
        .from("messages")
        .select(
          "id, conversation_id, content, created_at"
        )
        .eq("sender", "user")
        .eq("is_answered", false)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Admin unanswered query error:",
        error
      );

      return jsonResponse(500, {
        message:
          "Unable to load unanswered questions.",
      });
    }

    return jsonResponse(200, data ?? []);
  } catch (error) {
    console.error(
      "Admin unanswered function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};
