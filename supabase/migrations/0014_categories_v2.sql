-- ============================================================
-- Migration: 0014_categories_v2
-- Purpose: Enterprise Categories (Nesting, SEO, Landing Pages, Analytics)
-- ============================================================

CREATE TABLE category_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, slug)
);

-- Note: In a production DB with data, we would migrate data first. 
-- Assuming development phase where we can safely replace the column.
ALTER TABLE categories DROP COLUMN type;

ALTER TABLE categories 
  ADD COLUMN category_type_id UUID REFERENCES category_types(id) ON DELETE SET NULL,
  ADD COLUMN status TEXT NOT NULL DEFAULT 'published',
  ADD COLUMN visibility TEXT NOT NULL DEFAULT 'public',
  ADD COLUMN depth INT NOT NULL DEFAULT 0,
  ADD COLUMN path TEXT,
  ADD COLUMN breadcrumb_json JSONB, -- Array of {title, slug}
  
  -- Landing Page Blocks (mini page builder)
  ADD COLUMN blocks_json JSONB, 
  
  -- Featured Content (arrays of UUIDs or objects)
  ADD COLUMN featured_tools JSONB,
  ADD COLUMN featured_articles JSONB,
  
  -- SEO
  ADD COLUMN seo_title TEXT,
  ADD COLUMN seo_description TEXT,
  ADD COLUMN canonical_url TEXT,
  ADD COLUMN og_image TEXT,
  ADD COLUMN schema_json JSONB,
  ADD COLUMN extra_metadata JSONB,
  
  -- Analytics & Health
  ADD COLUMN total_views INT DEFAULT 0,
  ADD COLUMN organic_clicks INT DEFAULT 0,
  ADD COLUMN ctr DECIMAL DEFAULT 0,
  ADD COLUMN avg_ranking DECIMAL DEFAULT 0,
  ADD COLUMN top_keywords JSONB,
  ADD COLUMN health_score INT DEFAULT 0;

-- Function to sync categories to entities (Knowledge Graph)
CREATE OR REPLACE FUNCTION sync_category_to_entity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO entities (
      id, workspace_id, entity_type, title, slug, status, created_at, updated_at, health_score
    )
    VALUES (
      NEW.id, NEW.workspace_id, 'category', NEW.name, NEW.slug, NEW.status, NEW.created_at, NOW(), NEW.health_score
    );
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.deleted_at IS NOT NULL THEN
       UPDATE entities SET deleted_at = NEW.deleted_at, deleted_by = NEW.deleted_by WHERE id = NEW.id;
    ELSE
       UPDATE entities
       SET title = NEW.name, slug = NEW.slug, status = NEW.status, health_score = NEW.health_score, updated_at = NOW()
       WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_category_change
  AFTER INSERT OR UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION sync_category_to_entity();
