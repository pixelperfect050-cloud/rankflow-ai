-- ============================================================
-- Migration: 0004_entities
-- Purpose: Knowledge Graph Foundation Layer
-- ============================================================

CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL, 
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    icon TEXT,
    thumbnail TEXT,
    search_vector TSVECTOR,
    popularity_score DECIMAL DEFAULT 0,
    quality_score DECIMAL DEFAULT 0,
    authority_score DECIMAL DEFAULT 0,
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    deleted_by UUID,
    UNIQUE(workspace_id, entity_type, slug)
);

CREATE TABLE slug_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  old_slug TEXT NOT NULL,
  new_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
