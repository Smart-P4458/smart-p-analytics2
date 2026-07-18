import { matchIntent } from "./intentMatcher";

export function generateResponse(message: string): string {
  const input = message.toLowerCase().trim();

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

Welcome to Smart-P Analytics.

I'm Smart-P AI, Pam Sani George's intelligent portfolio assistant.

I can help you explore:

• 👤 About Pam

• 📊 Projects

• 💼 Services

• 🧠 Skills

• 🎓 Certifications

• 📄 Resume

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

Thank you for visiting Smart-P Analytics.

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

• 📊 Projects

• 💼 Services

• 🧠 Skills

• 🎓 Certifications

• 📄 Resume

• 📞 Contact Information

• 🚀 Career Goals

I'm continuously learning and becoming smarter.
`.trim();
}