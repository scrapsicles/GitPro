import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, currentSkills, profile } = await request.json();

    const topRepos = currentSkills.allRepositories
      .slice(0, 5)
      .map((repo: any) => `- ${repo.name} (${repo.language || 'N/A'}, ⭐${repo.stars}, Topics: ${(repo.topics || []).join(', ') || 'None'})`)
      .join('\n');

    const roadmapPrompt = `
You are a senior technical career advisor and AI skill planner.

Given:
- GitHub Profile: ${profile.login} with ${profile.public_repos} repositories, ${currentSkills.followers} followers, ${currentSkills.following} following
- Total Stars: ${currentSkills.totalStars}
- Total Commits: ${currentSkills.totalCommitContributions}
- PR Reviews: ${currentSkills.totalPRReviewContributions}
- Contributions Past Year: ${currentSkills.contributionsPastYear}
- Active Repositories (last 90 days): ${currentSkills.activeReposLast90Days}
- Starred Repositories Count: ${currentSkills.starredCount}
- Gists Count: ${currentSkills.gistsCount}
- Top Topics: ${currentSkills.topTopics.join(', ') || 'None'}
- Programming Languages: ${Object.keys(currentSkills.languages).join(', ') || 'None'}
- Frameworks: ${currentSkills.frameworks.join(', ') || 'None'}

Top repositories:
${topRepos}

Target Job Description:
${jobDescription}

Based on this, generate a comprehensive career roadmap to transition from the current state to the dream job.

Provide valid JSON with:
{
  "missingSkills": ["List of ALL applicable missing skills"],
  "frameworksToLearn": ["List of ALL relevant frameworks to learn"],
  "certifications": [
    {"title": "", "description": "", "provider": "", "url": ""}
  ],
  "projectIdeas": [
    {"title": "", "description": "", "difficulty": ""}
  ],
  "resources": [
    {"title": "", "type": "free/paid", "url": "", "description": ""}
  ]
}

Respond with ONLY valid JSON.
    `;
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { maxOutputTokens: 4096 },
    });

    const result = await model.generateContent(roadmapPrompt);
    const text = result.response.text().trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Raw Gemini Response:', text);
      throw new Error('Gemini did not return valid JSON.');
    }

    const roadmap = JSON.parse(jsonMatch[0]);
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate roadmap. Please try again later.',
        suggestion: 'Ensure GOOGLE_API_KEY is set and Gemini is available.',
      },
      { status: 500 }
    );
  }
}
