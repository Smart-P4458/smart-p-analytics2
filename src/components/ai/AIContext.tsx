import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { generateResponse } from "./responseGenerator";

import {
  addAssistantMessage,
  addUserMessage,
  clearConversationHistory,
} from "./conversationMemory";

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

    addUserMessage(message);

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: "Now",
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTyping: true,
      }));

      setTimeout(() => {
        const response = generateResponse(message);

        addAssistantMessage(response);

        const aiMessage: Message = {
          id: Date.now() + 1,
          sender: "assistant",
          text: response,
          timestamp: "Now",
        };

        setState((prev) => ({
          messages: [...prev.messages, aiMessage],
          isTyping: false,
        }));
      }, 1500);
    }, 250);
  };

  const clearChat = () => {
    clearConversationHistory();

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