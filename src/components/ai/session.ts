const SESSION_KEY =
  "smart-p-ai-session-id";

export function getSessionId(): string {
  const existingSessionId =
    localStorage.getItem(
      SESSION_KEY
    );

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId =
    crypto.randomUUID();

  localStorage.setItem(
    SESSION_KEY,
    newSessionId
  );

  return newSessionId;
}
