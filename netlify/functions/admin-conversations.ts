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

const allowedStatuses = [
  "active",
  "closed",
] as const;

type ConversationStatus =
  (typeof allowedStatuses)[number];

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
     * GET conversations
     */
    if (event.httpMethod === "GET") {
      const conversationId =
        event.queryStringParameters?.conversationId;

      if (conversationId) {
        const { data, error } = await supabase
          .from("conversations")
          .select(
            `
              id,
              visitor_id,
              session_id,
              status,
              created_at,
              updated_at
            `
          )
          .eq("id", conversationId)
          .maybeSingle();

        if (error) {
          console.error(
            "Admin conversation query error:",
            error
          );

          return jsonResponse(500, {
            message:
              "Unable to load conversation.",
          });
        }

        if (!data) {
          return jsonResponse(404, {
            message: "Conversation not found.",
          });
        }

        return jsonResponse(200, data);
      }

      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
            id,
            visitor_id,
            session_id,
            status,
            created_at,
            updated_at
          `
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
          message: "Unable to load conversations.",
        });
      }

      return jsonResponse(200, data ?? []);
    }

    /*
     * PATCH conversation status
     */
    const conversationId =
      event.queryStringParameters?.conversationId;

    if (!conversationId) {
      return jsonResponse(400, {
        message: "conversationId is required.",
      });
    }

    if (!event.body) {
      return jsonResponse(400, {
        message: "Request body is required.",
      });
    }

    let body: {
      status?: ConversationStatus;
    };

    try {
      body = JSON.parse(event.body) as {
        status?: ConversationStatus;
      };
    } catch {
      return jsonResponse(400, {
        message: "Invalid JSON request body.",
      });
    }

    const status = body.status;

    if (
      !status ||
      !allowedStatuses.includes(status)
    ) {
      return jsonResponse(400, {
        message:
          "Invalid conversation status. Use active or closed.",
      });
    }

    const { data, error } = await supabase
      .from("conversations")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId)
      .select(
        `
          id,
          visitor_id,
          session_id,
          status,
          created_at,
          updated_at
        `
      )
      .maybeSingle();

    if (error) {
      console.error(
        "Admin conversation status update error:",
        error
      );

      return jsonResponse(500, {
        message:
          "Unable to update conversation status.",
        details: error.message,
      });
    }

    if (!data) {
      return jsonResponse(404, {
        message: "Conversation not found.",
      });
    }

    return jsonResponse(200, data);
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
