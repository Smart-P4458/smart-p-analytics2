export type ConversationItem = {
  role: "user" | "assistant";
  message: string;
};

const MAX_HISTORY = 12;

let history: ConversationItem[] = [];

export function addUserMessage(message: string) {
  history.push({
    role: "user",
    message,
  });

  trimHistory();
}

export function addAssistantMessage(message: string) {
  history.push({
    role: "assistant",
    message,
  });

  trimHistory();
}

export function getConversationHistory() {
  return history;
}

export function clearConversationHistory() {
  history = [];
}

function trimHistory() {
  if (history.length > MAX_HISTORY) {
    history = history.slice(-MAX_HISTORY);
  }
}