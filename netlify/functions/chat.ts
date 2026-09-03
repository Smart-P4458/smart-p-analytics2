import type {
  Handler,
  HandlerEvent,
} from "@netlify/functions";

import { supabaseAdmin } from "./lib/supabase";

type ChatPayload = {
  sessionId?: string;
  message?: string;
  response?: string;
  isAnswered?: boolean;
};

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

const jsonResponse = (
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {}
) => ({
  statusCode,
  headers: {
    ...headers,
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async (
  event: HandlerEvent
) => {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(
      204,
      {},
      {
        Allow: "POST, OPTIONS",
      }
    );
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(
      405,
      {
        success: false,
        message: "Method not allowed.",
      },
      {
        Allow: "POST, OPTIONS",
      }
    );
  }

  try {
    if (!event.body) {
      return jsonResponse(400, {
        success: false,
        message: "Request body is required.",
      });
    }

    const payload =
      JSON.parse(event.body) as ChatPayload;

    const sessionId =
      payload.sessionId?.trim();

    const userMessage =
      payload.message?.trim();

    const assistantResponse =
      payload.response?.trim() ?? "";

    const isAnswered =
      payload.isAnswered ?? true;

    if (!sessionId || !userMessage) {
      return jsonResponse(400, {
        success: false,
        message:
          "sessionId and message are required.",
      });
    }

    let conversationId: string;

    const {
      data: existingConversation,
      error: conversationLookupError,
    } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (conversationLookupError) {
      throw conversationLookupError;
    }

    if (existingConversation) {
      conversationId =
        existingConversation.id;

      const { error: updateError } =
        await supabaseAdmin
          .from("conversations")
          .update({
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            conversationId
          );

      if (updateError) {
        throw updateError;
      }
    } else {
      conversationId =
        crypto.randomUUID();

      const { error: createError } =
        await supabaseAdmin
          .from("conversations")
          .insert({
            id: conversationId,
            visitor_id: null,
            session_id: sessionId,
            status: "active",
            created_at:
              new Date().toISOString(),
            updated_at:
              new Date().toISOString(),
          });

      if (createError) {
        throw createError;
      }
    }

    const userMessageId =
      crypto.randomUUID();

    const {
      error: userMessageError,
    } = await supabaseAdmin
      .from("messages")
      .insert({
        id: userMessageId,
        conversation_id:
          conversationId,
        sender: "user",
        message_type: "text",
        content: userMessage,
        is_answered: isAnswered,
        created_at:
          new Date().toISOString(),
      });

    if (userMessageError) {
      throw userMessageError;
    }

    if (!isAnswered) {
      const {
        error: unansweredError,
      } = await supabaseAdmin
        .from("unanswered_questions")
        .insert({
          id: crypto.randomUUID(),
          conversation_id:
            conversationId,
          message_id:
            userMessageId,
          question: userMessage,
          status: "open",
          created_at:
            new Date().toISOString(),
          resolved_at: null,
        });

      if (unansweredError) {
        throw unansweredError;
      }
    }

    if (assistantResponse) {
      const {
        error: assistantMessageError,
      } = await supabaseAdmin
        .from("messages")
        .insert({
          id: crypto.randomUUID(),
          conversation_id:
            conversationId,
          sender: "assistant",
          message_type: "text",
          content:
            assistantResponse,
          is_answered: true,
          created_at:
            new Date().toISOString(),
        });

      if (
        assistantMessageError
      ) {
        throw assistantMessageError;
      }
    }

    return jsonResponse(200, {
      success: true,
      conversationId,
      userMessageId,
    });
  } catch (error) {
    console.error(
      "Chat function error:",
      error
    );

    return jsonResponse(500, {
      success: false,
      message:
        "Unable to save chat history.",
    });
  }
};
