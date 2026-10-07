import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { saveChatMessage } from "./chatApi";
import { getSessionId } from "./session";
import { generateResponse } from "./responseGenerator";

import type {
  AIContextType,
  AIState,
  Message,
  MessageType,
} from "./Types";

const AIContext = createContext<AIContextType | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

const WELCOME_MESSAGE: Message = {
  id: 1,
  sender: "assistant",
  text: "Hello 👋 I'm Smart-P AI.\n\nHow can I help you today?",
  timestamp: "Now",
  type: "text",
};

/*
 * Smart-P AI response animation settings
 *
 * RESPONSE_START_DELAY:
 * Natural pause before Smart-P AI begins responding.
 *
 * TARGET_STREAM_DURATION:
 * Approximate time used to visibly present a normal response.
 *
 * FRAME_DELAY:
 * Controls how often the visible response is updated.
 *
 * MIN_CHUNK_SIZE / MAX_CHUNK_SIZE:
 * Controls how many characters appear during each update.
 *
 * These values are intentionally slower than the previous
 * configuration to create a more natural conversational rhythm.
 */

const RESPONSE_START_DELAY = 350;
const TARGET_STREAM_DURATION = 2600;
const FRAME_DELAY = 45;
const MIN_CHUNK_SIZE = 2;
const MAX_CHUNK_SIZE = 8;

export function AIProvider({
  children,
}: ProviderProps) {
  const [state, setState] = useState<AIState>({
    messages: [WELCOME_MESSAGE],
    isTyping: false,
  });

  /*
   * Keeps track of the active response animation.
   * This prevents old animations from continuing after
   * the chat has been cleared or a new message is sent.
   */

  const streamTimerRef = useRef<number | null>(null);
  const responseDelayRef = useRef<number | null>(null);

  const stopActiveStream = () => {
    if (streamTimerRef.current !== null) {
      window.clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    if (responseDelayRef.current !== null) {
      window.clearTimeout(responseDelayRef.current);
      responseDelayRef.current = null;
    }
  };

  const sendMessage = (message: string) => {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    /*
     * Prevent a previous unfinished animation from
     * interfering with the next response.
     */

    stopActiveStream();

    const sessionId = getSessionId();

    /* ----------------------------------------
       Save User Message
    ---------------------------------------- */

    void saveChatMessage({
      sessionId,
      message: cleanMessage,
      sender: "user",
      messageType: "text",
    }).catch((error) => {
      console.error(
        "Failed to save user chat message:",
        error
      );
    });

    /* ----------------------------------------
       Add User Message to UI
    ---------------------------------------- */

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: cleanMessage,
      timestamp: "Now",
      type: "text",
    };

    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        userMessage,
      ],
      isTyping: true,
    }));

    /* ----------------------------------------
       Generate Smart-P AI Response
    ---------------------------------------- */

    const rawResponse =
      generateResponse(cleanMessage);

    let responseType: MessageType = "text";

    if (
      rawResponse.includes(
        "[CERTIFICATE_CARD]"
      )
    ) {
      responseType = "certificate";
    } else if (
      rawResponse.includes(
        "[RESUME_CARD]"
      )
    ) {
      responseType = "resume";
    }

    /* ----------------------------------------
       Remove Internal Card Commands
    ---------------------------------------- */

    const fullResponse = rawResponse
      .replace(
        "[CERTIFICATE_CARD]",
        ""
      )
      .replace(
        "[RESUME_CARD]",
        ""
      )
      .trim();

    /* ----------------------------------------
       Create Assistant Message
    ---------------------------------------- */

    const assistantId =
      Date.now() + 1;

    /*
     * Calculate the streaming chunk dynamically.
     *
     * The slower frame interval and smaller chunks
     * create a more natural conversational typing rhythm.
     */

    const estimatedFrames = Math.max(
      1,
      Math.floor(
        TARGET_STREAM_DURATION /
          FRAME_DELAY
      )
    );

    const calculatedChunkSize =
      Math.ceil(
        fullResponse.length /
          estimatedFrames
      );

    const chunkSize = Math.min(
      MAX_CHUNK_SIZE,
      Math.max(
        MIN_CHUNK_SIZE,
        calculatedChunkSize
      )
    );

    /* ----------------------------------------
       Start Smart-P AI Response
    ---------------------------------------- */

    responseDelayRef.current =
      window.setTimeout(() => {
        responseDelayRef.current = null;

        setState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: assistantId,
              sender: "assistant",
              text: "",
              timestamp: "Now",
              type: responseType,
            },
          ],
        }));

        let index = 0;

        streamTimerRef.current =
          window.setInterval(() => {
            index = Math.min(
              index + chunkSize,
              fullResponse.length
            );

            setState((prev) => ({
              ...prev,
              messages:
                prev.messages.map(
                  (msg) =>
                    msg.id ===
                    assistantId
                      ? {
                          ...msg,
                          text:
                            fullResponse.slice(
                              0,
                              index
                            ),
                        }
                      : msg
                ),
            }));

            /* ----------------------------------------
               Response Completed
            ---------------------------------------- */

            if (
              index >=
              fullResponse.length
            ) {
              if (
                streamTimerRef.current !==
                null
              ) {
                window.clearInterval(
                  streamTimerRef.current
                );

                streamTimerRef.current =
                  null;
              }

              /*
               * Save the COMPLETE assistant response.
               * Only the visual presentation was streamed.
               */

              void saveChatMessage({
                sessionId,
                message: fullResponse,
                sender: "assistant",
                messageType:
                  responseType,
              }).catch((error) => {
                console.error(
                  "Failed to save assistant response:",
                  error
                );
              });

              setState((prev) => ({
                ...prev,
                isTyping: false,
              }));
            }
          }, FRAME_DELAY);
      }, RESPONSE_START_DELAY);
  };

  /* ----------------------------------------
     Clear Chat
  ---------------------------------------- */

  const clearChat = () => {
    stopActiveStream();

    setState({
      messages: [
        WELCOME_MESSAGE,
      ],
      isTyping: false,
    });
  };

  return (
    <AIContext.Provider
      value={{
        state,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context =
    useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAI must be used inside AIProvider"
    );
  }

  return context;
}
