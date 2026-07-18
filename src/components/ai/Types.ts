export interface SmartPAIProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface Message {
  id: number;
  sender: "user" | "assistant";
  text: string;
}