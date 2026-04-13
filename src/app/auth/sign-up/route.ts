import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { upsertStudentProfile } from "@/lib/student/repository";

function redirectWithError(request: NextRequest, message: string) {
  return NextResponse.redirect(
    new URL(`/signup?error=${encodeURIComponent(message)}`, request.url),
    { status: 303 }
  );
}

function formatError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected sign-up error.";

  if (message.toLowerCase().includes("could not find the table")) {
    return "Run docs/supabase-schema.sql in the Supabase SQL editor, then try again.";
  }

  return message;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      return redirectWithError(
        request,
        "Enter your name, email, and password to create an account."
      );
    }

    const admin = createSupabaseAdminClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || undefined
      }
    });

    if (error) {
      return redirectWithError(request, error.message);
    }

    if (data.user) {
      await upsertStudentProfile(data.user);
    }

    const { supabase, applyCookies } = createSupabaseRouteClient(request);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      return redirectWithError(request, signInError.message);
    }

    return applyCookies(
      NextResponse.redirect(new URL("/student/home", request.url), { status: 303 })
    );
  } catch (error) {
    return redirectWithError(request, formatError(error));
  }
}
