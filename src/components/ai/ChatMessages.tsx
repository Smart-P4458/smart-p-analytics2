import { useState } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const messages = [
  {
    id: 1,
    sender: "assistant" as const,
    text:
      "Hello 👋 I'm Smart-P AI. I can help you answer questions about Pam Sani George, Smart-P Analytics, his projects, skills, certifications and his services. How can I help you today?",
  },
];

export default function ChatMessages() {
  const [isTyping] = useState(false);

  return (
    <div
      className="
        flex
        flex-col
        gap-5
        px-6
        py-6
      "
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          sender={message.sender}
          text={message.text}
        />
      ))}

      {isTyping && <TypingIndicator />}
    </div>
  );
}