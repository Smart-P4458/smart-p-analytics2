export type AdminStats = {
  totalConversations: number;
  totalMessages: number;
  unansweredQuestions: number;
  totalContacts: number;
  automationFailures: number;
};

export type Conversation = {
  id: string;
  visitor_id: string;
  session_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender: "user" | "assistant" | "admin";
  message_type:
    | "text"
    | "certificate"
    | "resume"
    | "contact";
  content: string;
  is_answered: boolean;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  source: string | null;
  automation_status: string;
  created_at: string;
};

export type UnansweredQuestion = {
  id: string;
  conversation_id: string;
  content: string;
  created_at: string;
};

export type AutomationFailure = {
  id: string;
  name: string;
  email: string;
  subject: string;
  automation_status: string;
  created_at: string;
};