import type {
  AdminStats,
  Conversation,
  Message,
  ContactSubmission,
  UnansweredQuestion,
  AutomationFailure,
} from "./adminTypes";

const FUNCTIONS_BASE = "/.netlify/functions";

async function request<T>(
  functionName: string
): Promise<T> {
  const response = await fetch(
    `${FUNCTIONS_BASE}/${functionName}`
  );

  const contentType =
    response.headers.get("content-type");

  if (!response.ok) {
    const errorText =
      contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

    const message =
      typeof errorText === "object" &&
      errorText !== null &&
      "message" in errorText
        ? String(errorText.message)
        : "Unable to load admin data.";

    throw new Error(message);
  }

  if (!contentType?.includes("application/json")) {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  return response.json() as Promise<T>;
}

export async function getAdminStats(): Promise<AdminStats> {
  return request<AdminStats>("admin-stats");
}

export async function getConversations(): Promise<
  Conversation[]
> {
  return request<Conversation[]>(
    "admin-conversations"
  );
}

export async function getConversationMessages(
  conversationId: string
): Promise<Message[]> {
  const response = await fetch(
    `${FUNCTIONS_BASE}/admin-messages?conversationId=${encodeURIComponent(
      conversationId
    )}`
  );

  const contentType =
    response.headers.get("content-type");

  if (!response.ok) {
    const errorText =
      contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

    const message =
      typeof errorText === "object" &&
      errorText !== null &&
      "message" in errorText
        ? String(errorText.message)
        : "Unable to load conversation messages.";

    throw new Error(message);
  }

  if (!contentType?.includes("application/json")) {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  return response.json() as Promise<Message[]>;
}

export async function getContacts(): Promise<
  ContactSubmission[]
> {
  return request<ContactSubmission[]>(
    "admin-contacts"
  );
}

export async function getUnansweredQuestions(): Promise<
  UnansweredQuestion[]
> {
  return request<UnansweredQuestion[]>(
    "admin-unanswered"
  );
}

export async function getAutomationFailures(): Promise<
  AutomationFailure[]
> {
  return request<AutomationFailure[]>(
    "admin-failures"
  );
}