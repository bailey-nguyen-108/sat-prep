import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { formatSupabaseAuthError } from "@/lib/supabase/auth-error";

function redirectWithError(request: NextRequest, message: string) {
  return NextResponse.redirect(
    new URL(`/login?error=${encodeURIComponent(message)}`, request.url),
    { status: 303 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      return redirectWithError(request, "Enter both email and password.");
    }

    const { supabase, applyCookies } = createSupabaseRouteClient(request);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return redirectWithError(request, formatSupabaseAuthError(error, "Unexpected sign-in error."));
    }

    return applyCookies(
      NextResponse.redirect(new URL("/student/home", request.url), { status: 303 })
    );
  } catch (error) {
    return redirectWithError(request, formatSupabaseAuthError(error, "Unexpected sign-in error."));
  }
}
