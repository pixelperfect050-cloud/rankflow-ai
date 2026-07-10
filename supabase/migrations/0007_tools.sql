-- ============================================================
-- Migration: 0007_tools
-- Purpose: Tools Directory
-- ============================================================

CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description_html TEXT,
  logo_id UUID, -- FK to media added in 0011
  website_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  pricing_type TEXT DEFAULT 'free',
  pricing_details TEXT,
  starting_price TEXT,
  features TEXT[] DEFAULT '{}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  rating_avg REAL DEFAULT 0,
  rating_count INT DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  views_count INT NOT NULL DEFAULT 0,
  launch_date DATE,
  has_api BOOLEAN DEFAULT FALSE,
  is_open_source BOOLEAN DEFAULT FALSE,
  has_free_trial BOOLEAN DEFAULT FALSE,
  platforms TEXT[] DEFAULT '{}',
  supported_languages TEXT[] DEFAULT '{}',
  integration_tools TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID,
  UNIQUE(workspace_id, slug)
);

CREATE TABLE tool_tags (
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, tag_id)
);
