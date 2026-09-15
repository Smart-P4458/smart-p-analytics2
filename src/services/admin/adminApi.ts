import type {
  AdminStats,
  Conversation,
  ConversationStatus,
  Message,
  ContactSubmission,
  UnansweredQuestion,
  AutomationFailure,
} from "./adminTypes";

const FUNCTIONS_BASE = "/.netlify/functions";

type RequestOptions = {
  method?: "GET" | "PATCH";
  body?: unknown;
};

async function request<T>(
  functionName: string,
  options: RequestOptions = {}
): Promise<T> {
  const response = await fetch(
    `${FUNCTIONS_BASE}/${functionName}`,
    {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...(options.body !== undefined
        ? {
            body: JSON.stringify(options.body),
          }
        : {}),
    }
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

export async function getConversation(
  conversationId: string
): Promise<Conversation> {
  const params = new URLSearchParams({
    conversationId,
  });

  return request<Conversation>(
    `admin-conversations?${params.toString()}`
  );
}

export async function updateConversationStatus(
  conversationId: string,
  status: ConversationStatus
): Promise<Conversation> {
  const params = new URLSearchParams({
    conversationId,
  });

  return request<Conversation>(
    `admin-conversations?${params.toString()}`,
    {
      method: "PATCH",
      body: {
        status,
      },
    }
  );
}

export async function getConversationMessages(
  conversationId: string
): Promise<Message[]> {
  const params = new URLSearchParams({
    conversationId,
  });

  return request<Message[]>(
    `admin-messages?${params.toString()}`
  );
}

export async function getContacts(): Promise<
  ContactSubmission[]
> {
  return request<ContactSubmission[]>(
    "admin-contacts"
  );
}

export async function updateContactAutomationStatus(
  contactId: string,
  automationStatus: string
): Promise<ContactSubmission> {
  const params = new URLSearchParams({
    contactId,
  });

  return request<ContactSubmission>(
    `admin-contacts?${params.toString()}`,
    {
      method: "PATCH",
      body: {
        automation_status: automationStatus,
      },
    }
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
    "admin-automation-failures"
  );
}
