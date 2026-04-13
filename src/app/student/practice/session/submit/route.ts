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
  const flaggedQuestionIds = JSON.parse(String(formData.get("flaggedQuestionIds") ?? "[]")) as string[];

  await completePracticeSession({
    sessionId,
    userId: profile.id,
    answers
  });

  const response = applyCookies(
    NextResponse.redirect(new URL(`/student/review/results?session=${sessionId}`, request.url), {
      status: 303
    })
  );

  response.cookies.set({
    name: `sat-prep-flags-${sessionId}`,
    value: JSON.stringify(flaggedQuestionIds),
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    maxAge: 60 * 60 * 2
  });

  return response;
}
