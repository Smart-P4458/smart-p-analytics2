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

export const handler: Handler = async (event) => {
  const auth = await requireAdmin(event);

  if (!auth.authorized) {
    return jsonResponse(auth.statusCode, {
      message: auth.message,
    });
  }

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
        .from("unanswered_questions")
        .select("id", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("contact_submissions")
        .select("id", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("automation_failures")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "open"),
    ]);

    const results = [
      {
        name: "conversations",
        result: conversationsResult,
      },
      {
        name: "messages",
        result: messagesResult,
      },
      {
        name: "unanswered_questions",
        result: unansweredResult,
      },
      {
        name: "contact_submissions",
        result: contactsResult,
      },
      {
        name: "automation_failures",
        result: failuresResult,
      },
    ];

    const failedQuery = results.find(
      ({ result }) => result.error
    );

    if (failedQuery?.result.error) {
      console.error(
        `Admin stats query failed: ${failedQuery.name}`,
        failedQuery.result.error
      );

      return jsonResponse(500, {
        message: "Unable to load admin statistics.",
        query: failedQuery.name,
        details: failedQuery.result.error.message,
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
      details:
        error instanceof Error
          ? error.message
          : "Unknown error.",
    });
  }
};
