-- ============================================================
-- Migration: 0015_media_assets
-- Purpose: Enterprise Digital Asset Management (DAM) System
-- ============================================================

-- 1. Media Assets (Source of Truth)
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  extension TEXT NOT NULL,
  size BIGINT NOT NULL,
  sha256 TEXT NOT NULL,
  
  bucket TEXT NOT NULL,
  folder_path TEXT DEFAULT '/',
  status TEXT NOT NULL DEFAULT 'published',
  visibility TEXT NOT NULL DEFAULT 'public',
  
  alt_text TEXT,
  caption TEXT,
  credit TEXT,
  dominant_color TEXT,
  
  -- Metadata
  exif_data JSONB,
  camera_data JSONB,
  gps_data JSONB,
  
  -- AI Ready
  ai_description TEXT,
  ai_tags JSONB,
  ocr_text TEXT,
  detected_objects JSONB,
  dominant_subject TEXT,
  
  -- Analytics & Health
  downloads INT DEFAULT 0,
  views INT DEFAULT 0,
  usage_count INT DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  
  created_by TEXT,
  deleted_at TIMESTAMPTZ,
  deleted_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Media Variants (Responsive, WebP, Blur, etc)
CREATE TABLE media_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  variant_type TEXT NOT NULL, -- original, webp, thumbnail, lqip, 1200w, 800w, 400w, avif
  width INT,
  height INT,
  size BIGINT,
  path TEXT NOT NULL,
  public_url TEXT,
  
  UNIQUE(media_asset_id, variant_type)
);

-- 3. Media Versions (Rollbacks)
CREATE TABLE media_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  file_size BIGINT NOT NULL,
  sha256 TEXT NOT NULL,
  path TEXT NOT NULL,
  change_log TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  
  UNIQUE(media_asset_id, version_number)
);

-- 4. Media Usage (Transactional References)
CREATE TABLE media_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  model_type TEXT NOT NULL, -- 'article', 'category', 'tool'
  model_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(media_asset_id, model_type, model_id)
);

-- 5. Media Jobs (Asynchronous Processing Queue)
CREATE TABLE media_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'processing', -- processing, completed, failed, retry
  error_log TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================================
-- 6. Modify Articles and Categories Tables (Strict UUID FKs)
-- ============================================================

-- ARTICLES
ALTER TABLE articles DROP COLUMN featured_image_url;
ALTER TABLE articles ADD COLUMN featured_image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL;

-- CATEGORIES
ALTER TABLE categories DROP COLUMN og_image;
ALTER TABLE categories ADD COLUMN og_image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL;

ALTER TABLE categories DROP COLUMN icon;
ALTER TABLE categories ADD COLUMN icon_id UUID REFERENCES media_assets(id) ON DELETE SET NULL;

ALTER TABLE categories DROP COLUMN image_url;
ALTER TABLE categories ADD COLUMN image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL;

-- ============================================================
-- 7. Sync Trigger for Knowledge Graph
-- ============================================================

CREATE OR REPLACE FUNCTION sync_media_to_entity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO entities (
      id, workspace_id, entity_type, title, slug, status, created_at, updated_at
    )
    VALUES (
      NEW.id, NEW.workspace_id, 'media', NEW.filename, NEW.id::text, NEW.status, NEW.created_at, NOW()
    );
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.deleted_at IS NOT NULL THEN
       UPDATE entities SET deleted_at = NEW.deleted_at, deleted_by = NEW.deleted_by WHERE id = NEW.id;
    ELSE
       UPDATE entities
       SET title = NEW.filename, status = NEW.status, updated_at = NOW()
       WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_media_change
  AFTER INSERT OR UPDATE ON media_assets
  FOR EACH ROW EXECUTE FUNCTION sync_media_to_entity();
