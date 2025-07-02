export interface AppError {
  message: string;
  type: "network" | "api" | "auth" | "validation" | "unknown";
  details?: string;
}

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  topics?: string[];
  [key: string]: any;
};

export type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  [key: string]: any;
};

export type Gist = {
  id: string;
  description: string | null;
  html_url: string;
  files: { [filename: string]: any };
  created_at: string;
  updated_at: string;
  [key: string]: any;
};

export type GraphQLData = {
  user: any;
};

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface SkillAnalysis {
  profile: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name?: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
    bio?: string;
    twitter_username?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    [key: string]: any;
  };

  graphqlData: {
    data: any;
  };

  computed: {
    languages: { [language: string]: number };
    totalStars: number;
    totalRepositories: number;
    activeReposLast90Days: number;
    topTopics: string[];
    contributionsPastYear: number;
    totalCommitContributions: number;
    totalPRReviewContributions: number;
    pinnedRepositories: Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
    }>;
    frameworks: string[];
    starredCount: number;
    gistsCount: number;
    followers: number;
    following: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          color: string;
          contributionCount: number;
          date: string;
          weekday: number;
        }>;
        firstDay: string;
      }>;
    };
    allRepositories: Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      updated_at: string;
      created_at: string;
      pushed_at: string;
      private: boolean;
      topics?: string[];
      [key: string]: any;
    }>;
  };
}

export interface Roadmap {
  missingSkills: string[];
  frameworksToLearn: string[];
  certifications: Array<{
    title: string;
    description: string;
    provider: string;
    url: string;
  }>;
  projectIdeas: Array<{
    title: string;
    description: string;
    difficulty: string;
  }>;
  resources: Array<{
    title: string;
    type: "free" | "paid";
    url: string;
    description: string;
  }>;
}
