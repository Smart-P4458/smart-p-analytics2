import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useAI } from "./AIContext";
import QuickSuggestions from "./QuickSuggestions";

export default function ChatMessages() {
  const { state } = useAI();
  const showSuggestions = state.messages.length === 1;

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [state.messages, state.isTyping]);

  return (
    <section
      className="
        flex
        flex-col
        gap-6

        px-6
        py-6

        lg:px-8
        lg:py-8
      "
      >
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

      <div ref={bottomRef} />
    </section>
  );
}