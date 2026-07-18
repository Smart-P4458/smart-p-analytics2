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
  text:
    "Hello 👋 I'm Smart-P AI.\n\nHow can I help you today?",
  timestamp: "Now",
};

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

    // Add user message immediately
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    // Small delay before typing starts
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTyping: true,
      }));

      // AI "thinking" time
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
      }, 1500); // Increase to 1800 or 2000 if you want slower typing
    }, 250);
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