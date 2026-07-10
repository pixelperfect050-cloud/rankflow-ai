-- ============================================================
-- Migration: 0009_indexes
-- Purpose: Performance indexing for FTS and querying
-- ============================================================

CREATE INDEX idx_articles_status_published ON articles(workspace_id, status, published_at DESC);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_featured ON articles(is_featured) WHERE is_featured = TRUE;

CREATE INDEX idx_tools_status ON tools(workspace_id, status);
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_pricing ON tools(pricing_type);

CREATE INDEX idx_articles_search ON articles USING GIN (
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content_html, ''))
);
CREATE INDEX idx_tools_search ON tools USING GIN (
  to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(tagline, '') || ' ' || COALESCE(description, ''))
);
