-- ====================================================================
-- Ordering conversations according to the time it happened
-- ====================================================================
SELECT id,
    conversation_id,
    sender,
    message_type,
    content,
    is_answered,
    created_at
FROM messages
ORDER BY created_at ASC;
-- ====================================================================
-- Verify Updated Sender Check Constraints Good one.
-- ====================================================================
SELECT conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'messages'::regclass;
-- ====================================================================
-- Viewing Conversions in ascending order.
-- ====================================================================
SELECT *
FROM conversations
ORDER BY created_at DESC;
-- ====================================================================
-- Viewing conversations by conversation_id
-- ====================================================================
SELECT *
FROM messages
WHERE conversation_id = 'b6cbad4b-b4c3-442e-9bfc-b89de56b5273'
ORDER BY created_at ASC;
-- ====================================================================
-- Conversation grouping
-- ====================================================================
SELECT c.id AS conversation_id,
    c.session_id,
    c.status,
    c.created_at AS conversation_started,
    c.updated_at,
    COUNT(m.id) AS total_messages
FROM conversations c
    LEFT JOIN messages m ON m.conversation_id = c.id
GROUP BY c.id,
    c.session_id,
    c.status,
    c.created_at,
    c.updated_at
ORDER BY c.updated_at DESC;
-- ====================================================================
-- Proper Conversations History
-- ====================================================================
SELECT m.sender,
    m.message_type,
    m.content,
    m.is_answered,
    m.created_at
FROM messages m
WHERE m.conversation_id = 'b6cbad4b-b4c3-442e-9bfc-b89de56b5273'
ORDER BY m.created_at ASC;
-- ====================================================================
-- Checking for unanswered Questions
-- ====================================================================
SELECT *
FROM unanswered_questions
ORDER BY created_at DESC;
SELECT m.conversation_id,
    m.sender,
    m.message_type,
    m.content,
    m.is_answered,
    m.created_at
FROM messages AS m
WHERE m.conversation_id IN (
        'b6cbad4b-b4c3-442e-9bfc-b89de56b5273',
        'bbbd1cd6-c4a5-4a66-befb-a4110f46fbea',
        '2f75e312-0478-4a9a-8201-d4dbe0a19eed'
    )
ORDER BY m.conversation_id,
    m.created_at DESC;
--- ====================================================================
---Checking for recent conversations The User vs Assistant
--- ====================================================================
SELECT m.conversation_id,
    m.sender,
    m.message_type,
    m.content,
    m.is_answered,
    m.created_at
FROM messages AS m
ORDER BY m.conversation_id ASC,
    m.created_at ASC;