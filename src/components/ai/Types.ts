export type Sender = "user" | "assistant";

export type MessageType =
  | "text"
  | "resume"
  | "certificate";

export type Message = {
  id: number;
  sender: Sender;
  text: string;
  timestamp: string;
  type?: MessageType;
};

export type AIState = {
  messages: Message[];
  isTyping: boolean;
};

export type AIContextType = {
  state: AIState;
  sendMessage: (message: string) => void;
  clearChat: () => void;
};

export type KnowledgeSection = {
  id: number;
  title: string;
  keywords: string[];
  response: string;
};
