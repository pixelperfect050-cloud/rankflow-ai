import { z } from "zod";

const envSchema = z.object({
  // Public
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Anon key is required"),
  
  // Private / Server-only
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "Service role key is required"),
  DATABASE_URL: z.string().url("Must be a valid Postgres connection string"),
  DIRECT_URL: z.string().url("Must be a valid Postgres connection string"),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
});

// Extract from process.env to ensure Next.js can statically analyze NEXT_PUBLIC_ vars
const envVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

const _env = envSchema.safeParse(envVars);

// Skip validation during build or tests to prevent crashes
const isBuild = process.env.npm_lifecycle_event === 'build' || process.env.NEXT_PHASE === 'phase-production-build';
const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';

if (!_env.success && !isBuild && !isTest) {
  console.error("❌ Invalid or missing environment variables:\n");
  for (const [key, value] of Object.entries(_env.error.format())) {
    if (key !== "_errors") {
      console.error(`  - ${key}: ${(value as any)?._errors?.join(", ")}`);
    }
  }
  
  // Only throw in production or if strict checking is needed, 
  // but to adhere to the "fail fast" rule we throw immediately.
  throw new Error("Invalid environment variables. Application startup aborted.");
}

export const env = _env.success ? _env.data : (new Proxy({}, {
  get(target, prop) {
    return `build_mock_${String(prop)}`;
  }
}) as any);
