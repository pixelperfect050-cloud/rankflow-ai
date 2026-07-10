-- ============================================================
-- Migration: 0010_rls
-- Purpose: Row Level Security for Workspace Isolation
-- ============================================================

-- Function to get the current user's active workspaces
CREATE OR REPLACE FUNCTION user_workspaces()
RETURNS SETOF UUID AS $$
  SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Enable RLS on core tables
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Workspaces Policies
CREATE POLICY "Users can view their workspaces" 
  ON workspaces FOR SELECT 
  USING (id IN (SELECT user_workspaces()));

-- Workspace Members Policies
CREATE POLICY "Users can view members of their workspaces"
  ON workspace_members FOR SELECT
  USING (workspace_id IN (SELECT user_workspaces()));

-- Articles Policies
CREATE POLICY "Users can view articles in their workspaces"
  ON articles FOR SELECT
  USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can insert articles in their workspaces"
  ON articles FOR INSERT
  WITH CHECK (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can update articles in their workspaces"
  ON articles FOR UPDATE
  USING (workspace_id IN (SELECT user_workspaces()));

-- Tools Policies
CREATE POLICY "Users can view tools in their workspaces"
  ON tools FOR SELECT
  USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can insert tools in their workspaces"
  ON tools FOR INSERT
  WITH CHECK (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can update tools in their workspaces"
  ON tools FOR UPDATE
  USING (workspace_id IN (SELECT user_workspaces()));
