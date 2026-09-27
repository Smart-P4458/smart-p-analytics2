-- ===================================================
-- Checking for tables that were successully created
-- ===================================================
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
-- ===================================================
-- Checking whether RLS was enabled
-- ===================================================
SELECT
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
-- ====================================================================
-- Confirming table names and their columns
-- ====================================================================
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
-- ====================================================================
-- Inspecting Sender Check Constraints
-- ====================================================================
SELECT
    conname,
    pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conname = 'messages_sender_check';
-- ====================================================================
-- Update Messages Sender Check Constraints
-- ====================================================================
ALTER TABLE messages
DROP CONSTRAINT messages_sender_check;

ALTER TABLE messages
ADD CONSTRAINT messages_sender_check
CHECK (
    sender IN ('user', 'assistant', 'admin')
);
-- ====================================================================
-- Verify Updated Sender Check Constraints 
-- ====================================================================
SELECT
    conname,
    pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conname = 'messages_sender_check';
