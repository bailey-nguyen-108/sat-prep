import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import {
  completePracticeSession,
  upsertStudentProfile
} from "@/lib/student/repository";
import type { AnswerChoice } from "@/lib/types/student";

export async function POST(request: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(request);
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return applyCookies(NextResponse.redirect(new URL("/login", request.url), { status: 303 }));
  }

  const profile = await upsertStudentProfile(user);
  const formData = await request.formData();
  const sessionId = String(formData.get("sessionId") ?? "");
  const answers = JSON.parse(String(formData.get("answers") ?? "{}")) as Record<
    string,
    AnswerChoice | undefined
  >;

  await completePracticeSession({
    sessionId,
    userId: profile.id,
    answers
  });

  return applyCookies(
    NextResponse.redirect(new URL(`/student/review/results?session=${sessionId}`, request.url), {
      status: 303
    })
  );
}
