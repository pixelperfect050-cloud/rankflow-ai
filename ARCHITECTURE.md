# RankFlow AI - Architecture & Golden Rules

This document serves as the permanent source of truth for the architectural decisions and engineering discipline of RankFlow AI. As this project scales into an AI-powered Content Operating System and a Multi-Tenant SaaS platform, these rules must be strictly followed.

**ARCHITECTURE FREEZE IN EFFECT**: No major changes to the UI patterns, database foundations, or folder structure beyond this point. 

## 🚀 The 12 Core Rules

1. **No direct database calls from UI:** React components and Pages are strictly presentation layers.
2. **All writes go through Services:** The Service layer handles business logic, validation, and domain event emission.
3. **All reads go through Repositories:** The Repository layer handles all direct Supabase queries. `Page -> Cache -> Service/Repo -> Supabase`.
4. **Every entity registers in Knowledge Graph:** Articles, Tools, Deals, Workflows—everything connects via `entities` and `entity_relationships`.
5. **Every mutation emits a Domain Event:** (e.g., `ArticlePublished`, `ToolUpdated`). Side-effects must be decoupled.
6. **Every public page is SEO-ready:** Must include dynamic metadata, JSON-LD, and SSR optimization before release.
7. **Every API is versioned:** Use `/api/v1/*` to ensure backward compatibility.
8. **Every migration is forward-only:** Use strictly versioned `.sql` migrations (`0001`, `0002`, etc.).
9. **No mock data:** "Production Complete, Not Feature Complete." Every feature must use live Supabase data, handle RLS, errors, and empty states.
10. **Mobile-first:** All layouts must be responsive and tested on mobile screens.
11. **Performance budget respected:** Target Lighthouse 95+ and passing Core Web Vitals. Implement caching (Next.js Data Cache, Redis) and WebP/LQIP image generation.
12. **Feature flags for experimental functionality:** Toggle major new features via the `feature_flags` table to ensure safe rollouts.
13. **Vertical Slicing:** Finish one vertical slice completely before starting the next. No half-finished modules.
14. **The Ultimate Rule:** "No new feature development is allowed while any existing module fails its Definition of Done."

## 🏢 Enterprise SaaS Architecture Principles

### Feature-Based Organization
The codebase is structured by domain feature rather than technical concern.
```text
src/
  features/
    articles/
      components/
      repository/
      service/
      types/
      hooks/
    tools/
    knowledge-graph/
    auth/
```

### Event-Driven Flow & Background Jobs
To prevent tightly coupled code and slow API endpoints, side-effects are pushed to an Event Bus and processed asynchronously.
`User Action -> Service -> Repository -> Database -> Event Bus -> Background Job (Inngest / Supabase Edge Functions)`

### Caching Layer & Observability
- All read-heavy operations sit behind a caching layer (Next.js Data Cache, Redis).
- All API requests must be logged for response time, DB query duration, errors, and AI Usage (Tokens, Costs, Latency).

### Tenancy & Security
- **Multi-Tenancy:** All major tables include a `workspace_id`.
- **Role-Based Access Control (RBAC):** Permissions managed via `workspace_members`.
- **Row Level Security (RLS):** Enforced on all Supabase tables.
- **Soft Deletes & Audit Logs:** Security-critical mutations are tracked with JSON diffs, IPs, and User Agents.

---

## 🔒 Production Blockers & Operations

### 1. Secrets Management
- **Development:** Variables live in `.env.local`.
- **Preview:** Variables configured in Vercel Preview Environments.
- **Production:** Variables configured in Vercel Production Environments.
- **RULE:** `SUPABASE_SERVICE_ROLE_KEY` must never be imported into client components.

### 2. Backup Strategy & Disaster Recovery
- Daily automated PostgreSQL backup.
- Weekly restore testing to verify integrity.
- Storage backup policy (media, logos, etc).
- Migration rollback procedures must be documented before pushing destructive schema changes.

### 3. CI/CD Pipeline
All Pull Requests require automated checks via GitHub Actions:
- TypeScript check (`tsc --noEmit`)
- ESLint validation
- Unit tests pass
- Migration validation
- Production build success
Deployments to production occur exclusively on merge to `main`.

## ✅ Definition of Done (DoD)
A feature or phase is only considered complete when:
- [ ] All tests pass.
- [ ] No mock data remains (100% production DB integrated).
- [ ] Fully mobile responsive.
- [ ] Error states & Loading states implemented.
- [ ] Validation logic & Audit logs implemented.
- [ ] Production build succeeds (`npm run build`).
- [ ] Relevant documentation updated.
