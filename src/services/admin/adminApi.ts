import type {
  AdminStats,
  Conversation,
  ConversationStatus,
  Message,
  ContactSubmission,
  UnansweredQuestion,
  AutomationFailure,
} from "./adminTypes";

import { supabase } from "../../lib/supabase";

const FUNCTIONS_BASE = "/.netlify/functions";

type RequestOptions = {
  method?: "GET" | "PATCH";
  body?: unknown;
};

type ApiErrorBody = {
  message?: unknown;
};

async function request<T>(
  functionName: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error(
      "Your admin session has expired. Please sign in again."
    );
  }

  const response = await fetch(
    `${FUNCTIONS_BASE}/${functionName}`,
    {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
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
    let serverMessage = "";

    if (contentType?.includes("application/json")) {
      try {
        const errorBody =
          (await response.json()) as ApiErrorBody;

        if (
          typeof errorBody.message === "string"
        ) {
          serverMessage = errorBody.message;
        }
      } catch {
        serverMessage = "";
      }
    }

    if (response.status === 401) {
      await supabase.auth.signOut();

      throw new Error(
        "Your admin session has expired. Please sign in again."
      );
    }

    if (response.status === 403) {
      throw new Error(
        "You are not authorized to access this resource."
      );
    }

    throw new Error(
      serverMessage || "Unable to load admin data."
    );
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
