import { matchIntent } from "./intentMatcher";
import { getConversationHistory } from "./conversationMemory";

export function generateResponse(message: string): string {
  const input = message.toLowerCase().trim();

  /* ----------------------------------------
     Conversation Memory
  ---------------------------------------- */

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

  /* ----------------------------------------
     Greetings
  ---------------------------------------- */

  const greetings = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
  ];

  if (
    greetings.some(
      (greeting) =>
        input === greeting ||
        input.startsWith(`${greeting} `)
    )
  ) {
    return `
Hello! 👋

Welcome to Pam Sani George's Portfolio.

I'm Smart-P AI, Pam Sani George's intelligent portfolio assistant.

I can help you explore:

• 👤 About Pam Sani George
• 📊 Projects
• 💼 Services
• 🧠 Skills
• 🎓 Certifications
• 📄 Resume
• 📞 Contact Information
• 🚀 Career Goals

How can I help you today?
`.trim();
  }

  /* ----------------------------------------
     How are you
  ---------------------------------------- */

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

  /* ----------------------------------------
     Contact / Hire Intent
  ---------------------------------------- */

  const contactIntent = [
    "contact pam",
    "contact him",
    "contact george",
    "get in touch",
    "reach pam",
    "reach him",
    "hire pam",
    "hire george",
    "work with pam",
    "work with him",
    "work with george",
    "collaborate with pam",
    "collaboration",
    "send a message",
    "send him a message",
    "talk to pam",
    "speak to pam",
    "email pam",
  ];

  if (
    contactIntent.some((item) =>
      input.includes(item)
    )
  ) {
    return `
I'd be happy to help you get in touch with Pam. 🤝

If you'd like to discuss a project, collaboration, data analytics, business intelligence, dashboard development, or another professional opportunity, please use the contact form.

You can share your requirements and contact details there, and Pam will get back to you as soon as possible.

👉 [Contact Pam](#contact)
`.trim();
  }

  /* ----------------------------------------
     Farewell
  ---------------------------------------- */

  const farewells = [
    "bye",
    "goodbye",
    "see you",
    "thanks",
    "thank you",
    "later",
  ];

  if (
    farewells.some(
      (item) =>
        input === item ||
        input.startsWith(`${item} `)
    )
  ) {
    return `
You're most welcome! 😊

Thank you for visiting Pam Sani George's Portfolio.

It was a pleasure assisting you.

Have a wonderful day, and feel free to come back anytime! 👋
`.trim();
  }

  /* ----------------------------------------
     Knowledge Base
  ---------------------------------------- */

  const match = matchIntent(message);

  if (match) {
    return match.response.trim();
  }

  /* ----------------------------------------
     Professional AI Fallback
  ---------------------------------------- */

  return `
I don't currently have enough information in my knowledge base to give you a reliable answer about that.

If your question is related to a project, business requirement, collaboration, or a service you would like to discuss with Pam, I'd be happy to connect you with him.

Please use the contact form below and briefly describe what you need. You can include your name, email, subject, and message, and Pam will get back to you as soon as possible.

👉 [Contact Pam](#contact)

I'm always happy to help you explore the information available in this portfolio.
`.trim();
}
