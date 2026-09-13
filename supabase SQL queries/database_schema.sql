-- =====================================================
-- SMART-P ANALYTICS
-- DATABASE SCHEMA
-- =====================================================


-- =====================================================
-- 1. VISITORS
-- =====================================================

create table public.visitors (
  id uuid primary key default gen_random_uuid(),

  name text,

  email text,

  phone text,

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);


-- =====================================================
-- 2. CHAT CONVERSATIONS
-- =====================================================

create table public.conversations (
  id uuid primary key default gen_random_uuid(),

  visitor_id uuid references public.visitors(id)
    on delete set null,

  session_id text not null unique,

  status text not null default 'active'
    check (
      status in (
        'active',
        'closed',
        'needs_attention'
      )
    ),

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);


-- =====================================================
-- 3. CHAT MESSAGES
-- =====================================================

create table public.messages (
  id uuid primary key default gen_random_uuid(),

  conversation_id uuid not null
    references public.conversations(id)
    on delete cascade,

  sender text not null
    check (
      sender in (
        'visitor',
        'assistant',
        'admin'
      )
    ),

  message_type text not null default 'text'
    check (
      message_type in (
        'text',
        'certificate',
        'resume',
        'contact'
      )
    ),

  content text not null,

  is_answered boolean default true,

  created_at timestamptz default now()
);


-- =====================================================
-- 4. UNANSWERED QUESTIONS
-- =====================================================

create table public.unanswered_questions (
  id uuid primary key default gen_random_uuid(),

  conversation_id uuid
    references public.conversations(id)
    on delete set null,

  message_id uuid
    references public.messages(id)
    on delete set null,

  question text not null,

  status text not null default 'open'
    check (
      status in (
        'open',
        'in_progress',
        'resolved'
      )
    ),

  created_at timestamptz default now(),

  resolved_at timestamptz
);


-- =====================================================
-- 5. CONTACT SUBMISSIONS
-- =====================================================

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  email text not null,

  phone text,

  subject text,

  message text not null,

  source text default 'website',

  automation_status text not null default 'pending'
    check (
      automation_status in (
        'pending',
        'success',
        'failed'
      )
    ),

  created_at timestamptz default now()
);


-- =====================================================
-- 6. AUTOMATION FAILURES
-- =====================================================

create table public.automation_failures (
  id uuid primary key default gen_random_uuid(),

  type text not null
    check (
      type in (
        'contact_form',
        'unanswered_question',
        'email_notification',
        'make_webhook'
      )
    ),

  reference_id uuid,

  error_message text,

  status text not null default 'open'
    check (
      status in (
        'open',
        'resolved'
      )
    ),

  created_at timestamptz default now(),

  resolved_at timestamptz
);


-- =====================================================
-- 7. INDEXES
-- =====================================================

create index conversations_session_id_idx
on public.conversations(session_id);


create index messages_conversation_id_idx
on public.messages(conversation_id);


create index messages_created_at_idx
on public.messages(created_at);


create index unanswered_questions_status_idx
on public.unanswered_questions(status);


create index contact_submissions_created_at_idx
on public.contact_submissions(created_at);


create index automation_failures_status_idx
on public.automation_failures(status);

