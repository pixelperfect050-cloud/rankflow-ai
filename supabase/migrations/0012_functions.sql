-- ============================================================
-- Migration: 0012_functions
-- Purpose: System Functions (Search, Graph, AI usage tracking)
-- ============================================================

CREATE OR REPLACE FUNCTION search_all_content(
  query_text TEXT,
  target_workspace UUID,
  result_limit INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  type TEXT,
  title TEXT,
  slug TEXT,
  rank REAL
) AS $$
DECLARE
  tsquery_val TSQUERY;
BEGIN
  tsquery_val := plainto_tsquery('english', query_text);
  
  RETURN QUERY
  SELECT * FROM (
    SELECT 
      a.id,
      'article'::TEXT AS type,
      a.title,
      a.slug,
      ts_rank(to_tsvector('english', COALESCE(a.title, '') || ' ' || COALESCE(a.excerpt, '')), tsquery_val) AS rank
    FROM articles a
    WHERE a.workspace_id = target_workspace AND a.status = 'published'
      AND to_tsvector('english', COALESCE(a.title, '') || ' ' || COALESCE(a.excerpt, '')) @@ tsquery_val
    UNION ALL
    SELECT
      t.id,
      'tool'::TEXT AS type,
      t.name AS title,
      t.slug,
      ts_rank(to_tsvector('english', COALESCE(t.name, '') || ' ' || COALESCE(t.description, '')), tsquery_val) AS rank
    FROM tools t
    WHERE t.workspace_id = target_workspace AND t.status = 'published'
      AND to_tsvector('english', COALESCE(t.name, '') || ' ' || COALESCE(t.description, '')) @@ tsquery_val
  ) AS combined
  ORDER BY rank DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
