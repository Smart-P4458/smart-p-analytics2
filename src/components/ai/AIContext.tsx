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

export function AIProvider({
  children,
}: ProviderProps) {
  const [state, setState] = useState<AIState>({
    messages: [
      {
        id: 1,
        sender: "assistant",
        text:
          "Hello 👋 I'm Smart-P AI.\n\nHow can I help you today?",
        timestamp: "Now",
      },
    ],
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

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text: generateResponse(message),
        timestamp: "Now",
      };

      setState((prev) => ({
        messages: [...prev.messages, aiMessage],
        isTyping: false,
      }));
    }, 800);
  };

  const clearChat = () => {
    setState({
      messages: [
        {
          id: 1,
          sender: "assistant",
          text:
            "Hello 👋 I'm Smart-P AI.\n\nHow can I help you today?",
          timestamp: "Now",
        },
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
  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAI must be used inside AIProvider"
    );
  }

  return context;
}