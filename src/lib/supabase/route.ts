import type { CookieOptions } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

type PendingCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

export function createSupabaseRouteClient(request: NextRequest) {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  const pendingCookies: PendingCookie[] = [];
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        pendingCookies.push({ name, value, options });
      },
      remove(name: string, options: CookieOptions) {
        pendingCookies.push({ name, value: "", options });
      }
    }
  });

  function applyCookies(response: NextResponse) {
    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set({ name, value, ...options });
    });

    return response;
  }

  return { supabase, applyCookies };
}
