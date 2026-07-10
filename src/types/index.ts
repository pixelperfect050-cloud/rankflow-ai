// ============================================================
// RankFlow AI — TypeScript Interfaces & Types
// ============================================================
// All types mirror the Supabase database schema exactly.
// Convention: interfaces for DB rows, type aliases for unions/utilities.
// ============================================================

// ------------------------------------------------------------
// Enums & Literal Unions
// ------------------------------------------------------------

/** User role within the platform */
export type UserRole = 'admin' | 'user';

/** Category visibility states */
export type CategoryVisibility = 'public' | 'private' | 'hidden' | 'system';

/** Category status states */
export type CategoryStatus = 'published' | 'draft' | 'archived';

/** Article lifecycle states */
export type ArticleStatus = 'draft' | 'review' | 'published' | 'scheduled';

/** Tool lifecycle states */
export type ToolStatus = 'draft' | 'pending' | 'published';

/** Tool pricing model classification */
export type PricingType = 'free' | 'freemium' | 'paid' | 'enterprise' | 'open-source';

/** Comparison page states */
export type ComparisonStatus = 'draft' | 'published';

/** Deal promotional type */
export type DealType = 'lifetime' | 'discount' | 'coupon' | 'launch';

/** Workflow states */
export type WorkflowStatus = 'draft' | 'published';

/** News article states */
export type NewsStatus = 'draft' | 'published';

/** SEO template states */
export type SeoTemplateStatus = 'active' | 'inactive';

/** Generated SEO page states */
export type SeoPageStatus = 'pending' | 'generated' | 'published';

/** Tool submission review states */
export type ToolSubmissionStatus = 'pending' | 'approved' | 'rejected';

/** Trending score time-period buckets */
export type TrendingPeriod = 'daily' | 'weekly';

/** Trending score content types */
export type TrendingItemType = 'tool' | 'article' | 'comparison';

/** Unified search result content types */
export type SearchResultType = 'article' | 'tool' | 'news';

// ------------------------------------------------------------
// 1. PROFILES & AUTH
// ------------------------------------------------------------

export interface Profile {
  id: string;
  full_name: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  website: string | null;
  social_links: Record<string, string>;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// 2. CATEGORIES // 5. MEDIA MANAGEMENT
// ------------------------------------------------------------

export interface MediaAsset {
  id: string;
  workspace_id: string;
  filename: string;
  original_filename: string;
  mime_type: string;
  extension: string;
  size: number;
  sha256: string;
  
  bucket: string;
  folder_path: string;
  status: string;
  visibility: string;
  
  alt_text: string | null;
  caption: string | null;
  credit: string | null;
  dominant_color: string | null;
  
  exif_data: Record<string, unknown> | null;
  camera_data: Record<string, unknown> | null;
  gps_data: Record<string, unknown> | null;
  
  ai_description: string | null;
  ai_tags: Record<string, unknown> | null;
  ocr_text: string | null;
  detected_objects: Record<string, unknown> | null;
  dominant_subject: string | null;
  
  downloads: number;
  views: number;
  usage_count: number;
  last_used_at: string | null;
  
  created_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaVariant {
  id: string;
  media_asset_id: string;
  variant_type: 'original' | 'webp' | 'thumbnail' | 'lqip' | '1200w' | '800w' | '400w' | 'avif';
  width: number | null;
  height: number | null;
  size: number | null;
  path: string;
  public_url: string | null;
}

export interface MediaVersion {
  id: string;
  media_asset_id: string;
  version_number: number;
  file_size: number;
  sha256: string;
  path: string;
  change_log: string | null;
  created_at: string;
  created_by: string | null;
}

export interface MediaUsage {
  id: string;
  media_asset_id: string;
  model_type: string;
  model_id: string;
  created_at: string;
}

export interface MediaJob {
  id: string;
  media_asset_id: string;
  status: 'processing' | 'completed' | 'failed' | 'retry';
  error_log: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  workspace_id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_id: string | null;
  image_id: string | null;
  category_type_id: string | null;
  status: CategoryStatus;
  visibility: CategoryVisibility;
  parent_id: string | null;
  sort_order: number;
  depth: number;
  path: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_id: string | null;
  schema_json: Record<string, unknown> | null;
  extra_metadata: Record<string, unknown> | null;
  
  breadcrumb_json: { title: string; slug: string }[] | null;
  blocks_json: Record<string, unknown>[] | null;
  featured_tools: string[] | null;
  featured_articles: string[] | null;
  
  total_views: number;
  organic_clicks: number;
  ctr: number;
  avg_ranking: number;
  top_keywords: Record<string, unknown> | null;
  health_score: number;
  
  created_at: string;
}

export interface CategoryWithRelations extends Category {
  category_type: CategoryType | null;
  parent: Category | null;
  children: Category[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// ------------------------------------------------------------
// 3. ARTICLES (Blog CMS)
// ------------------------------------------------------------

export interface Article {
  id: string;
  title: string;
  slug: string;
  content_json: Record<string, unknown> | null; // TipTap JSON document
  content_html: string | null;                  // Rendered HTML for SSR
  excerpt: string | null;
  featured_image_id: string | null;
  featured_image_alt: string | null;
  status: ArticleStatus;
  published_at: string | null;
  scheduled_at: string | null;
  author_id: string | null;
  category_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[];
  reading_time: number;
  views_count: number;
  is_featured: boolean;
  seo_score: number;
  readability_score: number;
  ai_generated: boolean;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

/** Article hydrated with its relations (author, category, tags, FAQs) */
export interface ArticleWithRelations extends Article {
  author: Profile | null;
  category: Category | null;
  tags: Tag[];
  faqs: ArticleFaq[];
}

export interface ArticleTag {
  article_id: string;
  tag_id: string;
}

export interface ArticleFaq {
  id: string;
  article_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface ArticleInternalLink {
  id: string;
  source_article_id: string;
  target_article_id: string;
  anchor_text: string;
  auto_generated: boolean;
  created_at: string;
}

// ------------------------------------------------------------
// 4. TOOL DIRECTORY
// ------------------------------------------------------------



// ------------------------------------------------------------
// 5. USE CASES (Knowledge Graph)
// ------------------------------------------------------------

export interface UseCase {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
}

export interface ToolUseCase {
  tool_id: string;
  use_case_id: string;
  description: string | null;
  sort_order: number;
}

// ------------------------------------------------------------
// 6. PROMPT LIBRARY
// ------------------------------------------------------------

export interface ToolPrompt {
  id: string;
  tool_id: string;
  title: string;
  prompt_text: string;
  category: string | null;
  use_case_id: string | null;
  sort_order: number;
  created_at: string;
}

// ------------------------------------------------------------
// 7. COMPARISONS
// ------------------------------------------------------------

export interface Comparison {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content_html: string | null;
  tool_ids: string[];
  meta_title: string | null;
  meta_description: string | null;
  views_count: number;
  status: ComparisonStatus;
  created_at: string;
  updated_at: string;
}

export interface ComparisonCriteria {
  id: string;
  comparison_id: string;
  name: string;
  sort_order: number;
}

export interface ComparisonScore {
  id: string;
  comparison_id: string;
  tool_id: string;
  criterion_id: string;
  score: number;                           // 0–10
  notes: string | null;
}

// ------------------------------------------------------------
// 8. DEALS & MONETIZATION
// ------------------------------------------------------------

export interface Deal {
  id: string;
  tool_id: string;
  title: string;
  description: string | null;
  deal_type: DealType;
  original_price: string | null;
  deal_price: string | null;
  coupon_code: string | null;
  deal_url: string | null;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface AffiliateLink {
  id: string;
  tool_id: string;
  url: string;
  platform: string | null;                // e.g. 'direct', 'impact', 'shareasale'
  utm_params: string | null;
  created_at: string;
}

export interface AffiliateClick {
  id: string;
  affiliate_link_id: string;
  ip_hash: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
}

// ------------------------------------------------------------
// 9. COMMUNITY (Bookmarks, Collections)
// ------------------------------------------------------------

export interface Bookmark {
  id: string;
  user_id: string;
  tool_id: string;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  tool_id: string;
  sort_order: number;
  added_at: string;
}

// ------------------------------------------------------------
// 10. WORKFLOWS
// ------------------------------------------------------------

/** JSON shape for each step inside workflows.steps_json */
export interface WorkflowStep {
  order: number;
  tool_id: string;
  action: string;
  description: string;
}

export interface Workflow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  task_description: string | null;
  steps_json: WorkflowStep[];
  is_featured: boolean;
  views_count: number;
  status: WorkflowStatus;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// 11. AI NEWS
// ------------------------------------------------------------

export interface News {
  id: string;
  title: string;
  slug: string;
  content_html: string | null;
  excerpt: string | null;
  source_url: string | null;
  source_name: string | null;
  featured_image: string | null;
  category_id: string | null;
  status: NewsStatus;
  published_at: string | null;
  views_count: number;
  created_at: string;
}

// ------------------------------------------------------------
// 12. PROGRAMMATIC SEO
// ------------------------------------------------------------

export interface SeoTemplate {
  id: string;
  name: string;
  title_template: string;
  content_template: string | null;
  meta_title_template: string | null;
  meta_desc_template: string | null;
  category_id: string | null;
  status: SeoTemplateStatus;
  created_at: string;
}

export interface SeoPage {
  id: string;
  template_id: string;
  variables_json: Record<string, string>;
  generated_slug: string | null;
  generated_title: string | null;
  generated_content_html: string | null;
  generated_meta_title: string | null;
  generated_meta_desc: string | null;
  status: SeoPageStatus;
  published_at: string | null;
  views_count: number;
  created_at: string;
}

// ------------------------------------------------------------
// 13. SYSTEM TABLES
// ------------------------------------------------------------

export interface Media {
  id: string;
  url: string;
  filename: string;
  size_bytes: number;
  mime_type: string | null;
  alt_text: string | null;
  width: number | null;
  height: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface PublishingSchedule {
  id: string;
  name: string;
  days_of_week: number[];                  // 0=Sun … 6=Sat
  publish_time: string;                    // HH:MM:SS
  timezone: string;
  is_active: boolean;
  articles_per_slot: number;
  created_at: string;
}

/** JSON shape for each issue inside seo_audit_results.issues */
export interface SeoAuditIssue {
  type: string;
  severity: string;
  message: string;
}

export interface SeoAuditResult {
  id: string;
  article_id: string;
  issues: SeoAuditIssue[];
  score: number;
  audited_at: string;
}

export interface ToolUpdateAlert {
  id: string;
  tool_id: string;
  alert_type: string;                     // 'pricing_change' | 'new_feature' | 'version_update'
  details: string | null;
  is_read: boolean;
  created_at: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  results_count: number;
  created_at: string;
}

export interface TrendingScore {
  id: string;
  item_type: TrendingItemType;
  item_id: string;
  period: TrendingPeriod;
  score: number;
  calculated_at: string;
}

// ------------------------------------------------------------
// 14. SEARCH RESULT (from search_all_content RPC)
// ------------------------------------------------------------

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  rank: number;
}

// ------------------------------------------------------------
// SOFTWARE PRODUCTS ENGINE (v0.5)
// ------------------------------------------------------------

export interface Product {
  id: string;
  workspace_id: string;
  category_id: string | null;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  website_url: string | null;
  affiliate_url: string | null;
  github_url: string | null;
  api_available: boolean;
  open_source: boolean;
  
  launch_date: string | null;
  company_name: string | null;
  founder: string | null;
  headquarters: string | null;
  employee_size: string | null;
  funding_stage: string | null;
  
  logo_id: string | null;
  featured_image_id: string | null;
  
  languages: string[];
  platforms: string[];
  browser_support: string[];
  
  vector_id: string | null;
  embedding_id: string | null;
  
  blocks_json: Record<string, unknown> | null;
  status: string;
  visibility: string;
  health_score: number;
  
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string | null;
  deleted_by: string | null;
}

export interface ProductIntelligenceScores {
  id: string;
  product_id: string;
  quality_score: number;
  completeness_score: number;
  trust_score: number;
  freshness_score: number;
  popularity_score: number;
  seo_score: number;
  overall_score: number;
  last_calculated_at: string;
}

export interface ProductPricing {
  id: string;
  product_id: string;
  plan_name: string;
  price: number | null;
  currency: string;
  billing_cycle: string | null;
  features_json: Record<string, unknown>[];
  limits_json: Record<string, unknown>[];
  sort_order: number;
  created_at: string;
}

export interface ProductPricingHistory {
  id: string;
  product_id: string;
  plan_name: string;
  price: number;
  recorded_at: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  name: string;
  description: string | null;
  icon_id: string | null;
  sort_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  rating: number;
  pros: string[];
  cons: string[];
  is_verified: boolean;
  source: string | null;
  created_at: string;
}
