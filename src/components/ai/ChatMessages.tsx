import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import { useAI } from "./AIContext";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";

export default function ChatMessages() {
  const { state } = useAI();

  const containerRef = useRef<HTMLDivElement>(null);

  const showSuggestions =
    state.messages.length === 1 &&
    state.messages[0].sender === "assistant";

  // Scroll whenever messages change
  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [state.messages]);

  // Keep scrolling while AI is typing
  useEffect(() => {
    if (!state.isTyping) return;

    const container = containerRef.current;

    if (!container) return;

    const interval = setInterval(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }, 40);

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

        {state.isTyping && <TypingIndicator />}

        {showSuggestions && <QuickSuggestions />}
      </div>
    </div>
  );
}