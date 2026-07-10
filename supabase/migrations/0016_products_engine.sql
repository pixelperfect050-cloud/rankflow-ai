-- ============================================================
-- Migration: 0016_products_engine
-- Purpose: Enterprise Software Intelligence Platform
-- ============================================================

-- 1. Core Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Basic Info
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  website_url TEXT,
  affiliate_url TEXT,
  github_url TEXT,
  api_available BOOLEAN DEFAULT false,
  open_source BOOLEAN DEFAULT false,
  
  -- Identity
  launch_date DATE,
  company_name TEXT,
  founder TEXT,
  headquarters TEXT,
  employee_size TEXT,
  funding_stage TEXT,
  
  -- Media (strict FKs)
  logo_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  featured_image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  
  -- JSONB Config
  languages JSONB DEFAULT '[]'::jsonb,
  platforms JSONB DEFAULT '[]'::jsonb,
  browser_support JSONB DEFAULT '[]'::jsonb,
  
  -- AI/RAG Readiness
  embedding vector(1536),
  vector_id TEXT,
  embedding_id TEXT,
  summary_embedding vector(1536),
  keyword_embedding vector(1536),
  
  -- Engine Architecture
  blocks_json JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  visibility TEXT NOT NULL DEFAULT 'public',
  health_score INT DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  deleted_by TEXT
);

-- 2. Intelligence Scores
CREATE TABLE product_intelligence_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  quality_score INT DEFAULT 0,
  completeness_score INT DEFAULT 0,
  trust_score INT DEFAULT 0,
  freshness_score INT DEFAULT 0,
  popularity_score INT DEFAULT 0,
  seo_score INT DEFAULT 0,
  overall_score INT DEFAULT 0,
  
  last_calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(product_id)
);

-- 3. Pricing Engine
CREATE TABLE product_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  billing_cycle TEXT, -- 'monthly', 'yearly', 'one-time', 'free'
  features_json JSONB DEFAULT '[]'::jsonb,
  limits_json JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_pricing_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Features
CREATE TABLE product_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0
);

-- 5. Integrations & Relationships
-- Assuming integrations are products themselves, or categories.
-- We will link product to another product that acts as the integration (e.g. Zapier product).
CREATE TABLE product_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  integration_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(product_id, integration_product_id)
);

-- 6. Alternatives & Comparisons
CREATE TABLE product_alternatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  alternative_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(product_id, alternative_product_id)
);

CREATE TABLE product_comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  compared_with_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  compare_score INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(product_id, compared_with_id)
);

-- 7. Ecosystem (Templates, Prompts, Workflows)
CREATE TABLE product_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  thumbnail_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  use_case TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  automation_steps JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Reviews
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  rating DECIMAL(2, 1) NOT NULL,
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,
  is_verified BOOLEAN DEFAULT false,
  source TEXT, -- 'internal', 'g2', 'capterra'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Sync Trigger for Knowledge Graph
-- ============================================================
CREATE OR REPLACE FUNCTION sync_product_to_entity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO entities (
      id, workspace_id, entity_type, title, slug, status, created_at, updated_at
    )
    VALUES (
      NEW.id, NEW.workspace_id, 'product', NEW.name, NEW.slug, NEW.status, NEW.created_at, NOW()
    );
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.deleted_at IS NOT NULL THEN
       UPDATE entities SET deleted_at = NEW.deleted_at, deleted_by = NEW.deleted_by WHERE id = NEW.id;
    ELSE
       UPDATE entities
       SET title = NEW.name, slug = NEW.slug, status = NEW.status, updated_at = NOW()
       WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_product_change
  AFTER INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION sync_product_to_entity();
