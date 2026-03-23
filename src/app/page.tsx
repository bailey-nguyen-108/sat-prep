import { redirect } from "next/navigation";
import { getAuthenticatedStudent } from "@/lib/student/repository";

export default async function HomePage() {
  const auth = await getAuthenticatedStudent();
  redirect(auth ? "/student/home" : "/login");
}
