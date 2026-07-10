-- ============================================================
-- RankFlow AI — Complete Database Schema (Enterprise SaaS Ready)
-- ============================================================
-- Architecture Rules Enforced:
-- 1. Multi-Tenant (workspace_id)
-- 2. Soft Deletes (deleted_at, deleted_by)
-- 3. Extensible TEXT types (No ENUMs for domains)
-- 4. Audit Logging & Slug History
-- 5. AI Usage Tracking & Feature Flags
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- 0. CORE SAAS & TENANCY
-- ============================================================

CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RBAC: owner, admin, editor, author, reviewer, viewer
CREATE TABLE workspace_members (
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer', 
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (workspace_id, user_id)
);

-- System Configurations per tenant
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- e.g., 'seo', 'theme', 'ai', 'affiliate'
  settings_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, category)
);

CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  flag_name TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(workspace_id, flag_name)
);

-- ============================================================
-- 1. AUDIT & LOGGING
-- ============================================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  provider TEXT NOT NULL, -- 'openai', 'anthropic'
  model TEXT NOT NULL,
  prompt_tokens INT DEFAULT 0,
  completion_tokens INT DEFAULT 0,
  cost_usd DECIMAL(10, 6) DEFAULT 0,
  duration_ms INT,
  is_success BOOLEAN NOT NULL DEFAULT TRUE,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. KNOWLEDGE GRAPH ENGINE
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
CREATE INDEX idx_entities_search_vector ON entities USING GIN(search_vector);
CREATE INDEX idx_entities_title_trgm ON entities USING GIN (title gin_trgm_ops);

CREATE TABLE entity_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    from_entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    to_entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL, 
    confidence_score DECIMAL DEFAULT 1.0,
    importance_score DECIMAL DEFAULT 1.0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(from_entity_id, to_entity_id, relationship_type)
);

CREATE TABLE entity_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    diff JSONB NOT NULL, -- JSON Patch
    snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(entity_id, version_number)
);

CREATE TABLE activity_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. MEDIA & STORAGE
-- ============================================================

CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  bucket_id TEXT NOT NULL, -- 'media', 'logos', 'screenshots', 'avatars'
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  sha256_hash TEXT UNIQUE, -- Duplicate detection
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

-- ============================================================
-- 4. CATEGORIES & TAGS
-- ============================================================

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  type TEXT NOT NULL, 
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID,
  UNIQUE(workspace_id, type, slug)
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, slug)
);

-- ============================================================
-- 5. ARTICLES (Blog CMS)
-- ============================================================

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content_json JSONB,
  content_html TEXT,
  excerpt TEXT,
  featured_image_id UUID REFERENCES media(id),
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  reading_time INT DEFAULT 0,
  views_count INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  seo_score INT DEFAULT 0,
  readability_score REAL DEFAULT 0,
  ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID,
  UNIQUE(workspace_id, slug)
);

CREATE TABLE article_tags (
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE article_faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- ============================================================
-- 6. TOOLS DIRECTORY
-- ============================================================

CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description_html TEXT,
  logo_id UUID REFERENCES media(id),
  website_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Pricing
  pricing_type TEXT DEFAULT 'free',
  pricing_details TEXT,
  starting_price TEXT,
  
  -- Rich Data
  features TEXT[] DEFAULT '{}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  rating_avg REAL DEFAULT 0,
  rating_count INT DEFAULT 0,

  -- Status & Badges
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  views_count INT NOT NULL DEFAULT 0,

  -- Extended Data
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

CREATE TABLE tool_screenshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0
);

-- ============================================================
-- 7. DEALS & AFFILIATES
-- ============================================================

CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  deal_type TEXT NOT NULL, -- lifetime, discount, coupon, launch
  original_price TEXT,
  deal_price TEXT,
  coupon_code TEXT,
  deal_url TEXT,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID
);

CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  platform TEXT,
  utm_params TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. SYNC TRIGGERS FOR KNOWLEDGE GRAPH
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
