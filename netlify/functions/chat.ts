import type {
  Handler,
  HandlerEvent,
} from "@netlify/functions";

import {
  createClient,
} from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables."
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

type Sender =
  | "user"
  | "assistant";

type ChatRequest = {
  sessionId: string;
  message: string;
  sender: Sender;
  messageType?: string;
  isAnswered?: boolean;
};

type ConversationRecord = {
  id: string;
  visitor_id: string;
};

function jsonResponse(
  statusCode: number,
  body: unknown
) {
  return {
    statusCode,

    headers: {
      "Content-Type":
        "application/json",

      Allow: "POST",
    },

    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (
  event: HandlerEvent
) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(
      405,
      {
        success: false,
        message:
          "Method not allowed.",
      }
    );
  }

  try {
    const body =
      JSON.parse(
        event.body || "{}"
      ) as ChatRequest;

    const sessionId =
      body.sessionId?.trim();

    const message =
      body.message?.trim();

    const sender =
      body.sender;

    if (
      !sessionId ||
      !message ||
      !sender
    ) {
      return jsonResponse(
        400,
        {
          success: false,

          message:
            "sessionId, message and sender are required.",
        }
      );
    }

    if (
      sender !== "user" &&
      sender !== "assistant"
    ) {
      return jsonResponse(
        400,
        {
          success: false,

          message:
            "Invalid sender.",
        }
      );
    }

    /*
     * Find the existing
     * conversation for this session.
     */

    const {
      data: existingConversation,
      error:
        existingConversationError,
    } = await supabase
      .from("conversations")
      .select(
        "id, visitor_id"
      )
      .eq(
        "session_id",
        sessionId
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle<
        ConversationRecord
      >();

    if (
      existingConversationError
    ) {
      throw existingConversationError;
    }

    let conversationId: string;

    if (existingConversation) {
      conversationId =
        existingConversation.id;
    } else {
      /*
       * Create visitor.
       */

      const {
        data: visitor,
        error: visitorError,
      } = await supabase
        .from("visitors")
        .insert({
          name: null,
          email: null,
          phone: null,
        })
        .select("id")
        .single();

      if (visitorError) {
        throw visitorError;
      }

      /*
       * Create conversation.
       */

      const {
        data: conversation,
        error:
          conversationError,
      } = await supabase
        .from("conversations")
        .insert({
          visitor_id:
            visitor.id,

          session_id:
            sessionId,

          status:
            "active",
        })
        .select("id")
        .single();

      if (
        conversationError
      ) {
        throw conversationError;
      }

      conversationId =
        conversation.id;
    }

    /*
     * Save message.
     */

    const {
      data: savedMessage,
      error: messageError,
    } = await supabase
      .from("messages")
      .insert({
        conversation_id:
          conversationId,

        sender,

        message_type:
          body.messageType ||
          "text",

        content:
          message,

        is_answered:
          body.isAnswered ??
          sender === "assistant",
      })
      .select("id")
      .single();

    if (messageError) {
      throw messageError;
    }

    /*
     * Update conversation.
     */

    const {
      error: updateError,
    } = await supabase
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

    return jsonResponse(
      200,
      {
        success: true,

        conversationId,

        messageId:
          savedMessage.id,
      }
    );
  } catch (error) {
    console.error(
      "Chat function error:",
      error
    );

    return jsonResponse(
      500,
      {
        success: false,

        message:
          "Unable to save chat message.",
      }
    );
  }
};
