import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
    }

    const res = await fetch("https://api.github.com/gists?per_page=100", {
      headers: { Authorization: authHeader },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub API error (gists):", text);
      return NextResponse.json({ error: "GitHub API error" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/github/gists:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
