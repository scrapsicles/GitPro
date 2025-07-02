import { Target } from "lucide-react";
import MetricCard from "./MetricCard";

interface SkillComputed {
  totalStars: number;
  totalRepositories: number;
  activeReposLast90Days: number;
  contributionsPastYear: number;
  totalCommitContributions: number;
  totalPRReviewContributions: number;
  starredCount: number;
  gistsCount: number;
  followers: number;
  following: number;
}

interface MetricsGridProps {
  computed: SkillComputed;
}

export default function MetricsGrid({ computed }: MetricsGridProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Target className="w-4 h-4 text-white" />
        </div>
        GitHub Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <MetricCard value={computed.totalStars} label="Total Stars" />
        <MetricCard value={computed.totalRepositories} label="Repositories" />
        <MetricCard value={computed.activeReposLast90Days} label="Active (90d)" />
        <MetricCard value={computed.contributionsPastYear} label="Contributions" />
        <MetricCard value={computed.totalCommitContributions} label="Commits" />
        <MetricCard value={computed.totalPRReviewContributions} label="PR Reviews" />
        <MetricCard value={computed.starredCount} label="Starred" />
        <MetricCard value={computed.gistsCount} label="Gists" />
        <MetricCard value={computed.followers} label="Followers" />
        <MetricCard value={computed.following} label="Following" />
      </div>
    </div>
  );
}