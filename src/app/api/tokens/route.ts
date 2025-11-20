import { NextResponse } from "next/server";
import { getTokens } from "@/lib/token-data";

export async function GET() {
  try {
    const tokens = await getTokens();
    return NextResponse.json({ tokens }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Token API failed", error);
    return NextResponse.json({ message: "Failed to load tokens" }, { status: 500 });
  }
}
