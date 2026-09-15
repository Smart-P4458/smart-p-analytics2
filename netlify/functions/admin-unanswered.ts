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
    const {
      data,
      error,
    } = await supabase
      .from("unanswered_questions")
      .select(
        `
        id,
        conversation_id,
        question,
        status,
        created_at,
        message_id
        `
      )
      .eq("status", "open")
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

    const questions =
      (data ?? []).map(
        (item) => ({
          id: item.id,
          conversation_id:
            item.conversation_id,
          content:
            item.question,
          created_at:
            item.created_at,
        })
      );

    return jsonResponse(
      200,
      questions
    );
  } catch (error) {
    console.error(
      "Admin unanswered function error:",
      error
    );

    return jsonResponse(500, {
      message:
        "Internal server error.",
    });
  }
};
