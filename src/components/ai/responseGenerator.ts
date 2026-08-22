import { matchIntent } from "./intentMatcher";
import { getConversationHistory } from "./conversationMemory";
import { createContactLink } from "./contactLink";

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
  /* Contact / Collaboration Intent */
  /* ---------------------------------------- */

  const contactIntentKeywords = [
    "hire pam",
    "hire him",
    "work with pam",
    "work with him",
    "collaborate with pam",
    "collaborate with him",
    "contact pam",
    "reach pam",
    "talk to pam",
    "speak to pam",
    "project",
    "my project",
    "our project",
    "business project",
    "need a dashboard",
    "need a power bi",
    "need data analysis",
    "need data analytics",
    "need a data analyst",
    "need help with data",
    "data consulting",
    "analytics consulting",
    "dashboard development",
    "business intelligence solution",
    "business intelligence",
    "looking for a data analyst",
    "looking for a data scientist",
    "looking for an analyst",
    "looking for collaboration",
  ];

  const hasContactIntent =
    contactIntentKeywords.some((keyword) =>
      input.includes(keyword)
    );

  if (hasContactIntent) {
    const contactLink = createContactLink(
      "Project / Collaboration Enquiry",
      `Hello Pam,

I'd like to discuss a project or collaboration opportunity with you.

My enquiry:
${message}`
    );

    return `
I'd be happy to help you connect with Pam. 🤝

Based on what you've described, this sounds like something that may be worth discussing with him directly.

You can send Pam your requirements through the contact form. I've prepared the message for you so you won't have to start from scratch.

[Contact Pam →](${contactLink})

Once you submit the form, your message will be securely forwarded to Pam, and he'll be able to review your requirements and get back to you.

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
  /* Default / Unknown Question */
  /* ---------------------------------------- */

  const contactLink = createContactLink(
    "Question for Pam Sani George",
    `Hello Pam,

I have a question that I would like to discuss with you.

My question:
${message}`
  );

  return `
I don't currently have enough information in my knowledge base to give you a reliable answer to that question, and I don't want to guess or give you inaccurate information.

If you'd like, you can send your question directly to Pam. I've prepared the contact form with your question so you can submit it quickly.

[Ask Pam Directly →](${contactLink})

Pam can review your message personally and get back to you.

`.trim();
}
