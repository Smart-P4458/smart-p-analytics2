export interface SmartPAIProps {
  isOpen: boolean;
  onToggle: () => void;
}

export type Sender = "user" | "assistant";

export interface Message {
  id: number;
  sender: Sender;
  text: string;
  timestamp?: string;
}

export interface SuggestedQuestion {
  id: number;
  title: string;
  prompt: string;
  icon?: string;
}

export interface KnowledgeSection {
  id: number;
  title: string;
  keywords: string[];
  response: string;
}

export interface AIState {
  messages: Message[];
  isTyping: boolean;
}

export interface AIContextType {
  state: AIState;

  sendMessage: (message: string) => void;

  clearChat: () => void;
}