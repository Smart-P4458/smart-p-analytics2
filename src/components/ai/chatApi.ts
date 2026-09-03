import { getSessionId } from "./session";

type SaveChatParams = {
  message: string;
  response: string;
  isAnswered: boolean;
};

export async function saveChatMessage({
  message,
  response,
  isAnswered,
}: SaveChatParams) {
  try {
    const sessionId =
      getSessionId();

    await fetch(
      "/.netlify/functions/chat",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message,
          response,
          isAnswered,
        }),
      }
    );
  } catch (error) {
    /*
      Chat saving should never stop
      the AI interface from working.
    */

    console.error(
      "Unable to save chat:",
      error
    );
  }
}
