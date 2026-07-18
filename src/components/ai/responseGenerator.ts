import { matchIntent } from "./intentMatcher";

/**
 * Generates a response for Smart-P AI.
 * It first searches the local knowledge base.
 * If no match is found, it returns a friendly fallback message.
 */
export function generateResponse(message: string): string {
  const match = matchIntent(message);

  if (match) {
    return match.response.trim();
  }

  return `
I'm sorry, I don't have information about that yet.

You can ask me about:

• 👤 Pam Sani George
• 🏢 Smart-P Analytics
• 📊 His Projects
• 💼 HisServices
• 🧠 His Skills
• 🎓 His Certifications
• 📄 His Resume
• 📞 Contact Information
• 🚀 Career Goals

I'm continuously learning and becoming smarter.
`.trim();
}