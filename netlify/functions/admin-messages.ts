import type { Handler } from "@netlify/functions";
import { supabase } from "./_supabase";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Method not allowed.",
      }),
    };
  }

  const conversationId =
    event.queryStringParameters?.conversationId;

  if (!conversationId) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "conversationId is required.",
      }),
    };
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        id,
        conversation_id,
        sender,
        message_type,
        content,
        is_answered,
        created_at
        `
      )
      .eq("conversation_id", conversationId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error("Admin messages query error:", error);

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Unable to load conversation messages.",
          details: error.message,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(data ?? []),
    };
  } catch (error) {
    console.error("Admin messages function error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Unexpected error loading conversation messages.",
      }),
    };
  }
};
