import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { generateResponse } from "./responseGenerator";

import type {
  AIContextType,
  AIState,
  Message,
} from "./types";

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
};

// Smart-P AI streaming settings
const RESPONSE_START_DELAY = 300;
const CHUNK_SIZE = 4;
const CHUNK_DELAY = 15;

export function AIProvider({
  children,
}: ProviderProps) {
  const [state, setState] = useState<AIState>({
    messages: [WELCOME_MESSAGE],
    isTyping: false,
  });

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: "Now",
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    const fullResponse = generateResponse(message);

    const assistantId = Date.now() + 1;

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: assistantId,
            sender: "assistant",
            text: "",
            timestamp: "Now",
          },
        ],
      }));

      let index = 0;

      const interval = setInterval(() => {
        index = Math.min(
          index + CHUNK_SIZE,
          fullResponse.length
        );

        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  text: fullResponse.slice(0, index),
                }
              : msg
          ),
        }));

        if (index >= fullResponse.length) {
          clearInterval(interval);

          setState((prev) => ({
            ...prev,
            isTyping: false,
          }));
        }
      }, CHUNK_DELAY);
    }, RESPONSE_START_DELAY);
  };

  const clearChat = () => {
    setState({
      messages: [WELCOME_MESSAGE],
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
  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAI must be used inside AIProvider"
    );
  }

  return context;
}
