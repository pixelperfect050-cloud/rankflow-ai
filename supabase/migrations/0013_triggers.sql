-- ============================================================
-- Migration: 0013_triggers
-- Purpose: Sync Articles & Tools to Entities table
-- ============================================================

CREATE OR REPLACE FUNCTION sync_tool_to_entity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO entities (id, workspace_id, entity_type, title, slug, status, created_at, updated_at)
    VALUES (NEW.id, NEW.workspace_id, 'tool', NEW.name, NEW.slug, NEW.status, NEW.created_at, NEW.updated_at);
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.deleted_at IS NOT NULL THEN
       UPDATE entities SET deleted_at = NEW.deleted_at, deleted_by = NEW.deleted_by WHERE id = NEW.id;
    ELSE
       UPDATE entities
       SET title = NEW.name, slug = NEW.slug, status = NEW.status, updated_at = NEW.updated_at
       WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_tool_change
  AFTER INSERT OR UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION sync_tool_to_entity();

CREATE OR REPLACE FUNCTION sync_article_to_entity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO entities (id, workspace_id, entity_type, title, slug, status, created_at, updated_at)
    VALUES (NEW.id, NEW.workspace_id, 'article', NEW.title, NEW.slug, NEW.status, NEW.created_at, NEW.updated_at);
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.deleted_at IS NOT NULL THEN
       UPDATE entities SET deleted_at = NEW.deleted_at, deleted_by = NEW.deleted_by WHERE id = NEW.id;
    ELSE
       UPDATE entities
       SET title = NEW.title, slug = NEW.slug, status = NEW.status, updated_at = NEW.updated_at
       WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_article_change
  AFTER INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION sync_article_to_entity();
