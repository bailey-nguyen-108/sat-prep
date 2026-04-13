export function formatSupabaseAuthError(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : fallback;
  const normalized = message.toLowerCase();

  if (normalized.includes("could not find the table")) {
    return "Run docs/supabase-schema.sql in the Supabase SQL editor, then try again.";
  }

  if (normalized.includes("fetch failed") || normalized.includes("enotfound")) {
    return "Supabase could not be reached. Check your .env.local Supabase URL and network connection, then try again.";
  }

  return message;
}
