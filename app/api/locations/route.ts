import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://agents.propertygenie.com.my/api";

export async function GET(request: NextRequest) {
  try {
    const keyword = request.nextUrl.searchParams.get("keyword") || "";

    const params = new URLSearchParams({ keyword });
    const res = await fetch(`${API_BASE}/locations-mock?${params}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
