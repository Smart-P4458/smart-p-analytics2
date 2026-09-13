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
    const [
      conversationsResult,
      messagesResult,
      unansweredResult,
      contactsResult,
      failuresResult,
    ] = await Promise.all([
      supabase
        .from("conversations")
        .select("id", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("messages")
        .select("id", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("messages")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("sender", "user")
        .eq("is_answered", false),

      supabase
        .from("contact_submissions")
        .select("id", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("contact_submissions")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("automation_status", "failed"),
    ]);

    const results = [
      conversationsResult,
      messagesResult,
      unansweredResult,
      contactsResult,
      failuresResult,
    ];

    const failedQuery = results.find(
      (result) => result.error
    );

    if (failedQuery?.error) {
      console.error(
        "Admin stats query error:",
        failedQuery.error
      );

      return jsonResponse(500, {
        message: "Unable to load admin statistics.",
      });
    }

    return jsonResponse(200, {
      totalConversations:
        conversationsResult.count ?? 0,

      totalMessages:
        messagesResult.count ?? 0,

      unansweredQuestions:
        unansweredResult.count ?? 0,

      totalContacts:
        contactsResult.count ?? 0,

      automationFailures:
        failuresResult.count ?? 0,
    });
  } catch (error) {
    console.error(
      "Admin stats function error:",
      error
    );

    return jsonResponse(500, {
      message: "Internal server error.",
    });
  }
};