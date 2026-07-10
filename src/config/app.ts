export const appConfig = {
  name: "RankFlow AI",
  description: "AI-powered Content Operating System & Multi-Tenant SaaS",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  api: {
    version: "v1",
    basePath: "/api/v1",
  },
  seo: {
    defaultTitle: "RankFlow AI | Content OS",
    defaultDescription: "The ultimate platform for programmatic SEO, AI content generation, and knowledge graphs.",
  },
  defaultWorkspaceSlug: "default-workspace",
};
