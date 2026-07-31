import { matchIntent } from "./intentMatcher";
import { getConversationHistory } from "./conversationMemory";

export function generateResponse(message: string): string {
  const input = message.toLowerCase().trim();

  /* ---------------------------------------- */
  /* Conversation Memory */
  /* ---------------------------------------- */

  if (
    input.includes("previous") ||
    input.includes("last question") ||
    input.includes("last answer") ||
    input.includes("what did i ask") ||
    input.includes("remember")
  ) {
    const history = getConversationHistory();

    if (history.length === 0) {
      return "This is the beginning of our conversation, so I don't have anything to remember yet.";
    }

    const previous = history
      .slice(-6)
      .reverse()
      .map(
        (item) =>
          `${item.role === "user" ? "🧑 You" : "🤖 Smart-P AI"}: ${item.message}`
      )
      .join("\n\n");

    return `Here's what we've discussed recently:\n\n${previous}`;
  }

  /* ---------------------------------------- */
  /* Greetings */
  /* ---------------------------------------- */

  const greetings = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
  ];

  if (greetings.some((greeting) => input.includes(greeting))) {
    return `
Hello! 👋

Welcome to Pam Sani George Portfolio.

I'm Smart-P AI, Pam Sani George's intelligent portfolio assistant.

I can help you explore:

• 👤 About Pam Sani George

• 📊 His Projects

• 💼 Services

• 🧠 His Skills

• 🎓 His Certifications

• 📄 His Resume

• 📞 Contact Information

How can I help you today?
`.trim();
  }

  /* ---------------------------------------- */
  /* How are you */
  /* ---------------------------------------- */

  const wellbeing = [
    "how are you",
    "how're you",
    "how is it going",
    "how do you do",
    "how you dey",
  ];

  if (wellbeing.some((item) => input.includes(item))) {
    return `
I'm doing great! 😄

Thank you for asking.

I'm always ready to help you learn more about Pam Sani George, Smart-P Analytics and his professional journey.

What would you like to know today?
`.trim();
  }

  /* ---------------------------------------- */
  /* Farewell */
  /* ---------------------------------------- */

  const farewells = [
    "bye",
    "goodbye",
    "see you",
    "thanks",
    "thank you",
    "later",
  ];

  if (farewells.some((item) => input.includes(item))) {
    return `
You're most welcome! 😊

Thank you for visiting Pam Sani George Portfolio.

It was a pleasure assisting you.

Have a wonderful day and feel free to come back anytime! 👋
`.trim();
  }

  /* ---------------------------------------- */
  /* Knowledge Base */
  /* ---------------------------------------- */

  const match = matchIntent(message);

  if (match) {
    return match.response.trim();
  }

  /* ---------------------------------------- */
  /* Default */
  /* ---------------------------------------- */

  return `
I'm sorry, I don't have information about that yet.

You can ask me about:

• 👤 Pam Sani George

• 📊 His Projects

• 💼 His Services

• 🧠 His Skills

• 🎓 Certifications

• 📄 His Resume

• 📞 Contact Information

• 🚀 Career Goals

I'm continuously learning and becoming smarter.
`.trim();
}
