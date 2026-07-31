import {
  useEffect,
  useRef,
} from "react";

import { useAI } from "./AIContext";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";

export default function ChatMessages() {
  const { state } = useAI();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const showSuggestions =
    state.messages.length === 1 &&
    state.messages[0].sender === "assistant";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [state.messages]);

  useEffect(() => {
    if (!state.isTyping) return;

    const interval = setInterval(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }, 25);

    return () => clearInterval(interval);
  }, [state.isTyping]);

  return (
    <div
      ref={containerRef}
      className="
        flex-1
        overflow-y-auto
        px-5
        py-5
        scroll-smooth
      "
    >
      <div className="space-y-4">
        {state.messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender}
            text={message.text}
            time={message.timestamp}
          />
        ))}

        {state.isTyping && (
          <TypingIndicator />
        )}

        {showSuggestions && (
          <QuickSuggestions />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
