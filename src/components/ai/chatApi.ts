type Sender =
  | "user"
  | "assistant";

type SaveChatMessageInput = {
  sessionId: string;
  message: string;
  sender: Sender;
  messageType?: string;
  isAnswered?: boolean;
};

type SaveChatMessageResponse = {
  success: boolean;
  conversationId?: string;
  messageId?: string;
  message?: string;
};

export async function saveChatMessage(
  input: SaveChatMessageInput
): Promise<SaveChatMessageResponse> {
  const response = await fetch(
    "/.netlify/functions/chat",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(input),
    }
  );

  const text =
    await response.text();

  let result:
    | SaveChatMessageResponse
    | undefined;

  if (text) {
    try {
      result =
        JSON.parse(
          text
        ) as SaveChatMessageResponse;
    } catch {
      throw new Error(
        "The server returned an invalid response."
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Unable to save chat message."
    );
  }

  return (
    result ?? {
      success: true,
    }
  );
}
