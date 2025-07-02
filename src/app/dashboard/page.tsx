"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Target,
  BookOpen,
  Award,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Github,
  CoffeeIcon,
  Star,
} from "lucide-react";

import { useRouter } from "next/navigation";
import ContributionCalendar from "../components/ContributionCalendar";
import Header from "../components/dashboard/Header";
import ProfileSection from "../components/dashboard/ProfileSection";
import LanguagesChart from "../components/dashboard/LanguageChart";
import TechnologiesSection from "../components/dashboard/TechnologiesSection";
import MetricsGrid from "../components/dashboard/MetricsGrid";
import RepositoriesTable from "../components/dashboard/RepositoriesTable";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  Repository,
  AppError,
  SkillAnalysis,
  User,
  Gist,
  GraphQLData,
  GitHubProfile,
  Roadmap,
} from "../../../types/dashboard";

const ErrorDisplay = ({
  error,
  onRetry,
  className = "",
}: {
  error: AppError;
  onRetry?: () => void;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`bg-red-50 border border-red-200 rounded-xl p-6 ${className}`}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-red-700 mb-2">{error.message}</p>
        {error.details && (
          <p className="text-sm text-red-600 mb-4">{error.details}</p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

const SuccessMessage = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 ${className}`}
  >
    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
    <p className="text-green-800 font-medium">{message}</p>
  </motion.div>
);

const LoadingState = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-12"
  >
    <LoadingSpinner className="mb-4" />
    <p className="text-lg font-medium text-gray-700 mb-2">Loading...</p>
    <p className="text-sm text-gray-500">{message}</p>
  </motion.div>
);

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [jobDescription, setJobDescription] = useState("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [starredRepos, setStarredRepos] = useState<Repository[]>([]);
  const [gists, setGists] = useState<Gist[]>([]);
  const [graphqlData, setGraphqlData] = useState<GraphQLData | null>(null);
  const [skillAnalysis, setSkillAnalysis] = useState<SkillAnalysis | null>(
    null
  );
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [error, setError] = useState<AppError | null>(null);
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleError = (error: any, context: string): AppError => {
    console.error(`Error in ${context}:`, error);

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return {
        message: "Network connection failed",
        type: "network",
        details: "Please check your internet connection and try again.",
      };
    }

    if (error.status === 401) {
      return {
        message: "Authentication failed",
        type: "auth",
        details:
          "Please sign out and sign back in to refresh your GitHub token.",
      };
    }

    if (error.status === 403) {
      return {
        message: "Rate limit exceeded",
        type: "api",
        details:
          "GitHub API rate limit reached. Please wait a few minutes before trying again.",
      };
    }

    if (error.status === 404) {
      return {
        message: "Resource not found",
        type: "api",
        details: "The requested GitHub resource could not be found.",
      };
    }

    return {
      message: error.message || "An unexpected error occurred",
      type: "unknown",
      details: `Error in ${context}. Please try again or contact support if the problem persists.`,
    };
  };

  const apiCall = async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorData.message || response.statusText,
          response,
        };
      }

      return await response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw {
          message: "Request timed out",
          type: "network",
        };
      }
      throw error;
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchGitHubData();
    } else if (status !== "loading") {
      router.push("/");
    }
  }, [session, status]);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      setAnalysisStep("Fetching GitHub profile...");
      const profileData = await apiCall("/api/github/profile");
      setProfile(profileData);

      setAnalysisStep("Fetching repositories...");
      const reposData = await apiCall("/api/github/repositories");
      setRepositories(reposData);

      setAnalysisStep("Fetching starred repositories...");
      const starredData = await apiCall("/api/github/starred");
      setStarredRepos(starredData);

      setAnalysisStep("Fetching gists...");
      const gistsData = await apiCall("/api/github/gists");
      setGists(gistsData);

      setAnalysisStep("Fetching advanced GitHub data (GraphQL)...");
      const graphqlData = await apiCall("/api/github/graphql");
      setGraphqlData(graphqlData);

      setAnalysisStep("Analyzing skills...");
      const analysis = await apiCall("/api/analyze-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: profileData,
          repositories: reposData,
          starred: starredData,
          gists: gistsData,
          graphqlData,
        }),
      });

      setSkillAnalysis(analysis);
      setSuccess("GitHub data loaded successfully!");
      setAnalysisStep("Analysis complete ✅");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      const appError = handleError(error, "fetchGitHubData");
      setError(appError);
      setAnalysisStep("");
    } finally {
      setLoading(false);
    }
  };

  const generateRoadmap = async () => {
    if (!jobDescription.trim()) {
      setError({
        message: "Job description is required",
        type: "validation",
        details:
          "Please paste a job description to generate a personalized roadmap.",
      });
      return;
    }

    if (!skillAnalysis) {
      setError({
        message: "Skills analysis not available",
        type: "validation",
        details: "Please wait for the GitHub data analysis to complete first.",
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess("");
      setAnalysisStep("Generating personalized roadmap with AI...");

      const roadmapData = await apiCall("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          currentSkills: skillAnalysis.computed,
          profile,
        }),
      });

      setRoadmap(roadmapData);
      setSuccess("Roadmap generated successfully!");

      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      const appError = handleError(error, "generateRoadmap");
      setError(appError);
    } finally {
      setLoading(false);
      setAnalysisStep("");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoadingState message="Initializing GitPro..." />
      </div>
    );
  }

  const languageData = skillAnalysis
    ? Object.entries(skillAnalysis.computed?.languages || {}).map(
        ([name, count]) => ({ name, count })
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header profile={profile} />

      <div className="container mx-auto px-6 py-8 space-y-8">
        {error && (
          <ErrorDisplay
            error={error}
            onRetry={error.type === "network" ? fetchGitHubData : undefined}
          />
        )}

        {success && <SuccessMessage message={success} />}

        {loading && !profile && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <LoadingState message={analysisStep} />
          </div>
        )}

        {profile && <ProfileSection profile={profile} />}

        {skillAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <LanguagesChart languages={skillAnalysis.computed.languages} />

            <TechnologiesSection
              frameworks={skillAnalysis.computed.frameworks}
              topTopics={skillAnalysis.computed.topTopics}
            />

            <MetricsGrid computed={skillAnalysis.computed} />

            {skillAnalysis && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contribution Activity
                </h2>
                <ContributionCalendar
                  calendarData={skillAnalysis.computed.contributionCalendar}
                />
              </div>
            )}
            <RepositoriesTable
              repositories={skillAnalysis.computed.allRepositories.map(
                (repo) => ({
                  ...repo,
                  stars: repo.stars ?? 0,
                  forks: repo.forks ?? 0,
                  updatedAt: repo.updatedAt ?? "",
                })
              )}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            Career Roadmap Generator
          </h3>
          <p className="text-gray-600 mb-6">
            Paste a job description below to get a personalized learning roadmap
            based on your current GitHub skills.
          </p>
          <div className="space-y-4">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description you're interested in here..."
              className="w-full h-40 p-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400 transition-all duration-200"
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {jobDescription.length > 0 && (
                  <span>{jobDescription.length} characters</span>
                )}
              </div>
              <button
                onClick={generateRoadmap}
                disabled={loading || !jobDescription.trim() || !skillAnalysis}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {loading ? (
                  <>
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-5 w-5" />
                    Generate Roadmap
                  </>
                )}
              </button>
            </div>
          </div>
          {analysisStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-3 text-blue-600"
            >
              <span className="text-sm font-medium">{analysisStep}</span>
            </motion.div>
          )}
        </motion.div>

        {roadmap && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                Skills to Develop
              </h3>
              <p className="text-gray-600 mb-6">
                These skills are commonly required for the role but missing from
                your current GitHub profile.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roadmap.missingSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200 rounded-xl font-medium hover:from-red-100 hover:to-pink-100 transition-all duration-200"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                Frameworks & Technologies to Learn
              </h3>
              <p className="text-gray-600 mb-6">
                Modern frameworks and tools that would strengthen your profile
                for this role.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roadmap.frameworksToLearn.map((framework, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200 rounded-xl font-medium hover:from-blue-100 hover:to-cyan-100 transition-all duration-200"
                  >
                    {framework}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
                Recommended Certifications
              </h3>
              <p className="text-gray-600 mb-6">
                Industry-recognized certifications that could boost your
                credibility.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {roadmap.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-900">
                        {cert.title}
                      </h4>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        {cert.provider}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{cert.description}</p>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Learn More
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                Project Ideas
              </h3>
              <p className="text-gray-600 mb-6">
                Hands-on projects to build the skills you need and showcase your
                abilities.
              </p>
              <div className="space-y-6">
                {roadmap.projectIdeas.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-gray-900">
                        {project.title}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : project.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                Learning Resources
              </h3>
              <p className="text-gray-600 mb-6">
                Curated resources to help you master the required skills.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-700">
                        F
                      </span>
                    </div>
                    Free Resources
                  </h4>
                  <div className="space-y-4">
                    {roadmap.resources
                      .filter((r) => r.type === "free")
                      .map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-l-4 border-green-400 pl-6 py-3 bg-green-50 rounded-r-xl"
                        >
                          <h5 className="font-bold text-gray-900 mb-2">
                            {resource.title}
                          </h5>
                          <p className="text-sm text-gray-600 mb-3">
                            {resource.description}
                          </p>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Access Resource
                          </a>
                        </motion.div>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-700">P</span>
                    </div>
                    Premium Resources
                  </h4>
                  <div className="space-y-4">
                    {roadmap.resources
                      .filter((r) => r.type === "paid")
                      .map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-l-4 border-blue-400 pl-6 py-3 bg-blue-50 rounded-r-xl"
                        >
                          <h5 className="font-bold text-gray-900 mb-2">
                            {resource.title}
                          </h5>
                          <p className="text-sm text-gray-600 mb-3">
                            {resource.description}
                          </p>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Course
                          </a>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <footer className="relative z-10 px-6 pt-12 pb-12 border-t border-gray/10 dark:border-gray-300/30 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
                      <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-2 border border-white/20 dark:border-slate-700/30">
                        <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        GitPro
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Shaping Future!
                      </div>
                    </div>
                  </div>
      
                  <div className="flex items-center gap-8">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      © 2025 GitPro. Empowering developers worldwide.
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://buymeacoffee.com/vastavikadi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                      >
                        Buy me a coffee <CoffeeIcon className="inline-block h-4 w-4" />
                      </a>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/vastavikadi/GitPro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                      >
                        Give It a Star! <Star className="inline-block h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
}
