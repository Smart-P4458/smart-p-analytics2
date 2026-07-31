import {
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

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let animationId: number;

    const followConversation = () => {
      container.scrollTop = container.scrollHeight;
      animationId = requestAnimationFrame(followConversation);
    };

    animationId = requestAnimationFrame(followConversation);

    return () => cancelAnimationFrame(animationId);
  }, [state.messages]);

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
