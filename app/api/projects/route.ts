import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { createApiClient } from "@/lib/supabase-api";

export async function GET() {
  try {
    const supabase = createApiClient();
    const { data, error } = await supabase.from("projects").select("*").order("order_index");
    if (error) throw error;
    return NextResponse.json({ projects: data });
  } catch (error) {
    console.error("Projects API error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("projects").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json({ project: data });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
