const SESSION_STORAGE_KEY =
  "smart-p-ai-session-id";

function createSessionId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export function getSessionId(): string {
  const existingSessionId =
    localStorage.getItem(
      SESSION_STORAGE_KEY
    );

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId =
    createSessionId();

  localStorage.setItem(
    SESSION_STORAGE_KEY,
    newSessionId
  );

  return newSessionId;
}
