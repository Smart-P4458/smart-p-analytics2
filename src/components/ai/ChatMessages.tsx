import {
  useEffect,
  useRef,
} from "react";

import { useAI } from "./AIContext";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";
import ResumeCard from "./ResumeCard";
import CertificateCard from "./CertificateCard";

type ChatMessagesProps = {
  onClose?: () => void;
};

export default function ChatMessages({
  onClose,
}: ChatMessagesProps) {
  const { state } = useAI();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const showSuggestions =
    state.messages.length === 1 &&
    state.messages[0].sender ===
      "assistant";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [state.messages]);

  useEffect(() => {
    if (!state.isTyping) return;

    const interval =
      window.setInterval(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }, 40);

    return () =>
      window.clearInterval(interval);
  }, [state.isTyping]);

  return (
    <div
      ref={containerRef}
      className="
        flex-1
        overflow-y-auto
        px-5
        py-4
        scroll-smooth
      "
    >
      <div className="space-y-3">
        {state.messages.map(
          (message) => (
            <div
              key={message.id}
              className="space-y-2"
            >
              <MessageBubble
                sender={message.sender}
                text={message.text}
                time={message.timestamp}
                onClose={onClose}
              />

              {message.sender ===
                "assistant" &&
                message.type ===
                  "resume" &&
                message.text.length >
                  0 && (
                  <div className="flex justify-start">
                    <ResumeCard />
                  </div>
                )}

              {message.sender ===
                "assistant" &&
                message.type ===
                  "certificate" &&
                message.text.length >
                  0 && (
                  <div className="flex justify-start">
                    <CertificateCard />
                  </div>
                )}
            </div>
          )
        )}

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
