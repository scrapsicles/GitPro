import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      profile,
      repositories,
      starred,
      gists,
      graphqlData,
    } = await request.json();

    const languages: Record<string, number> = {};
    repositories.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const totalStars = repositories.reduce(
      (acc: number, repo: any) => acc + (repo.stargazers_count || 0),
      0
    );

    const totalRepositories = repositories.length;

    const now = new Date();
    const activeReposLast90Days = repositories.filter((repo: any) => {
      const updated = new Date(repo.updated_at);
      const diffDays = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 90;
    }).length;

    const topicCounts: Record<string, number> = {};
    repositories.forEach((repo: any) => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
      }
    });
    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);

    const contributionsPastYear =
      graphqlData?.data?.viewer?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

    const totalCommitContributions =
      graphqlData?.data?.viewer?.contributionsCollection?.totalCommitContributions || 0;
    const totalPRReviewContributions =
      graphqlData?.data?.viewer?.contributionsCollection?.totalPullRequestReviewContributions || 0;

    const followers = graphqlData?.data?.viewer?.followers?.totalCount || profile?.followers || 0;
    const following = graphqlData?.data?.viewer?.following?.totalCount || profile?.following || 0;

    const contributionCalendar =
      graphqlData?.data?.viewer?.contributionsCollection?.contributionCalendar || {};

    const pinnedRepositories =
      graphqlData?.data?.viewer?.pinnedItems?.nodes?.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        updatedAt: repo.updatedAt,
        primaryLanguage: repo.primaryLanguage?.name,
      })) || [];

    const knownFrameworks = [
      "React", "Next.js", "Vue", "Angular", "Svelte", "Express",
      "Django", "Flask", "Laravel", "Spring", "FastAPI", "Nuxt",
    ];
    const frameworksSet = new Set<string>();
    repositories.forEach((repo: any) => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          if (knownFrameworks.includes(topic)) {
            frameworksSet.add(topic);
          }
        });
      }
    });
    const frameworks = Array.from(frameworksSet);

    const allRepositories = repositories.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
      private: repo.private,
      html_url: repo.html_url,
    }));
    
    return NextResponse.json({
      profile,
      repositories,
      starred,
      gists,
      graphqlData,
      computed: {
        languages,
        totalStars,
        totalRepositories,
        activeReposLast90Days,
        topTopics,
        contributionsPastYear,
        totalCommitContributions,
        totalPRReviewContributions,
        pinnedRepositories,
        frameworks,
        starredCount: starred.length,
        gistsCount: gists.length,
        followers,
        following,
        contributionCalendar,
        allRepositories,
      },
    });
  } catch (error) {
    console.error('Analyze-skills processing error:', error);
    return NextResponse.json(
      { error: 'Analyze-skills failed. Please try again.' },
      { status: 500 }
    );
  }
}
