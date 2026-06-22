import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from("skills").select("*").order("order_index");
    if (error) throw error;
    return NextResponse.json({ skills: data });
  } catch (error) {
    console.error("Skills API error:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}
