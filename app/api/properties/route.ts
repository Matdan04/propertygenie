import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://agents.propertygenie.com.my/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = request.nextUrl;
    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort");

    const params = new URLSearchParams();
    params.set("page", page);
    if (sort) params.set("sort", sort);

    const res = await fetch(`${API_BASE}/properties-mock?${params}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

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
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
