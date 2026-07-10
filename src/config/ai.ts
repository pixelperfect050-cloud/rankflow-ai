export const aiConfig = {
  providers: {
    default: "openai",
    fallback: "anthropic",
  },
  models: {
    cheap: "gpt-4o-mini",
    smart: "gpt-4o",
  },
  limits: {
    maxTokensPerRequest: 4000,
  },
  prompts: {
    seo: "You are an expert SEO optimizer. Extract keywords and generate compelling meta descriptions.",
    article: "You are an expert technical writer. Create an in-depth, structured, and engaging article.",
  }
};
