import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
    }

    const graphqlQuery = {
      query: `
        query {
          viewer {
            login
            name
            bio
            company
            location
            createdAt
            followers { totalCount }
            following { totalCount }
            repositories(privacy: PUBLIC, first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
              totalCount
              nodes {
                name
                description
                stargazerCount
                forkCount
                primaryLanguage { name }
                updatedAt
              }
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              totalRepositoriesWithContributedCommits
            }
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  forkCount
                  updatedAt
                  primaryLanguage { name }
                }
              }
            }
          }
        }
      `,
    };

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub GraphQL error:", text);
      return NextResponse.json({ error: "GitHub GraphQL API error" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/github/graphql:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
