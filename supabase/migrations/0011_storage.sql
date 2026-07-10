-- ============================================================
-- Migration: 0011_storage
-- Purpose: Media Table and Foreign Key linking
-- ============================================================

CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  bucket_id TEXT NOT NULL, 
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  sha256_hash TEXT UNIQUE, 
  size_bytes BIGINT DEFAULT 0,
  mime_type TEXT,
  alt_text TEXT,
  width INT,
  height INT,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view media in their workspaces"
  ON media FOR SELECT
  USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can insert media in their workspaces"
  ON media FOR INSERT
  WITH CHECK (workspace_id IN (SELECT user_workspaces()));

-- Link Foreign Keys that were deferred
ALTER TABLE categories ADD CONSTRAINT fk_categories_media FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;
ALTER TABLE articles ADD CONSTRAINT fk_articles_media FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL;
ALTER TABLE tools ADD CONSTRAINT fk_tools_media FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE SET NULL;

-- Note: Actual Storage buckets are often created via Supabase dashboard or seed.sql, 
-- but you can insert them into storage.buckets here if needed.
INSERT INTO storage.buckets (id, name, public) VALUES 
('media', 'media', true),
('logos', 'logos', true),
('screenshots', 'screenshots', true),
('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;
