import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
