import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    project: "Arslan Portfolio",
    timestamp: new Date().toISOString(),
  });
}
