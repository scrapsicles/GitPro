import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
    }

    const starredRes = await fetch("https://api.github.com/user/starred?per_page=100", {
      headers: { Authorization: authHeader },
    });

    if (!starredRes.ok) {
      const text = await starredRes.text();
      console.error("GitHub API error (starred):", text);
      return NextResponse.json({ error: "GitHub API error" }, { status: starredRes.status });
    }

    const data = await starredRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/github/starred:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
