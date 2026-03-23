import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { createPracticeSession, upsertStudentProfile } from "@/lib/student/repository";
import type { PracticeDifficulty, PracticeMode, PracticeSubject } from "@/lib/types/student";

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
  const subject = String(formData.get("subject") ?? "math") as PracticeSubject;
  const difficulty = String(formData.get("difficulty") ?? "medium") as PracticeDifficulty;
  const mode = String(formData.get("mode") ?? "timed") as PracticeMode;

  const sessionId = await createPracticeSession({
    userId: profile.id,
    subject,
    difficulty,
    mode
  });

  return applyCookies(
    NextResponse.redirect(new URL(`/student/practice/session?session=${sessionId}`, request.url), {
      status: 303
    })
  );
}
