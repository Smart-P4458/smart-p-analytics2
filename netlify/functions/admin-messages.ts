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

export const handler: Handler = async (
  event
) => {
  try {
    const conversationId =
      event.queryStringParameters
        ?.conversationId;

    if (!conversationId) {
      return jsonResponse(400, {
        message:
          "conversationId is required.",
      });
    }

    const { data, error } =
      await supabase
        .from("messages")
        .select(
          "id, conversation_id, sender, message_type, content, is_answered, created_at"
        )
        .eq(
          "conversation_id",
          conversationId
        )
        .order("created_at", {
          ascending: true,
        });

    if (error) {
      console.error(
        "Admin messages query error:",
        error
      );

      return jsonResponse(500, {
        message:
          "Unable to load conversation messages.",
      });
    }

    return jsonResponse(200, data ?? []);
  } catch (error) {
    console.error(
      "Admin messages function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};