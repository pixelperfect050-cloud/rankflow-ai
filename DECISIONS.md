# RankFlow AI - Architecture Decisions Record (ADR)

This document tracks all major architectural decisions made during the lifecycle of RankFlow AI. It provides context for future developers and AI agents on *why* specific patterns were chosen.

## 1. Multi-Tenant Foundation (Phase 1A)
**Context:** We anticipate evolving from a single internal blog/CMS to a fully-fledged SaaS platform where users can spin up their own workspaces.
**Decision:** All core tables (`entities`, `articles`, `tools`, etc.) include a `workspace_id` UUID and Row Level Security (RLS) is enforced from day one.
**Why:** Refactoring a single-tenant app to multi-tenant later is notoriously difficult and risky. Starting with multi-tenancy prevents structural rewrites.

## 2. Knowledge Graph Engine (Phase 1A)
**Context:** Content needs to be highly interconnected (Articles, Tools, Deals, Workflows) to drive programmatic SEO and user retention.
**Decision:** Use a generic `entities` and `entity_relationships` table architecture instead of tightly coupled foreign keys between every domain table.
**Why:** It allows infinite expansion (e.g., adding Podcasts or Courses later) without altering the schema. It also powers the recommendation engine.

## 3. Repository & Service Pattern (Phase 1A)
**Context:** Tight coupling between Next.js UI components and Supabase database clients makes code brittle and hard to test.
**Decision:** Adopt a strict `Page -> Service -> Repository -> Supabase` data flow. UI components cannot call the database directly.
**Why:** Decouples the frontend from the data layer. If we ever migrate away from Supabase or PostgreSQL, only the repositories change.

## 4. Feature-Based Architecture (Phase 1A)
**Context:** Large monolithic `components/` and `hooks/` folders become unmanageable as the SaaS grows.
**Decision:** Group code by domain features (e.g., `src/features/articles/`, `src/features/knowledge-graph/`). Each feature contains its own components, repository, service, and types.
**Why:** Enforces modularity and allows distinct bounded contexts. The Knowledge Graph can even be extracted into its own package later.

## 5. Event-Driven Architecture (Phase 1A)
**Context:** Actions like publishing an article require multiple side effects (generating sitemaps, updating search indexes, notifying AI).
**Decision:** Use Domain Events (e.g., `ArticlePublished`) dispatched to an Event Bus, which triggers decoupled background jobs.
**Why:** Prevents monolithic, slow API endpoints. Improves reliability and allows easy scaling of background tasks.

## 6. Soft Deletes & Audit Logging (Phase 1A)
**Context:** Accidental deletions and lack of traceability are unacceptable in enterprise SaaS.
**Decision:** Implement `deleted_at`/`deleted_by` on all core tables. Differentiate between `activity_timeline` (user-facing) and `audit_logs` (admin/security logging with IP/JSON diffs).
**Why:** Ensures data safety, regulatory compliance, and a clear trail of mutations.

## 7. Migration-Based Database Management (Phase 1A)
**Context:** Managing database changes manually leads to environment drift.
**Decision:** Split migrations sequentially (e.g., `0001_extensions.sql`, `0002_workspaces.sql`). Never apply structural changes ad-hoc.
**Why:** Ensures reproducible environments and safe, forward-only deployments.
