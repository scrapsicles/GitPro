"use client";

import React, { JSX } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Github,
  Rocket,
  Target,
  TrendingUp,
  Sun,
  Moon,
  Star,
  GitBranch,
  Code,
  Users,
  ExternalLink,
  LucideIcon,
  BrainCog,
  LineChart,
  Hammer,
  CoffeeIcon,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { FeaturesSectionDemo } from "../components/modern-ui/featureSection";
import { Grid } from "../components/modern-ui/gridCard";
import { NavbarMain } from "./components/Navbar";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}

interface AnalysisItemProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  color,
  index,
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl blur-xl"></div>
      <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/30 p-8 h-full shadow-xl shadow-black/5 dark:shadow-black/20 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-500">
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${color} mb-6 shadow-lg`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const AnalysisItem: React.FC<AnalysisItemProps> = ({
  Icon,
  title,
  description,
  gradient,
}) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${gradient}`}
  >
    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    <div>
      <div className="font-semibold text-slate-900 dark:text-white">
        {title}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300">
        {description}
      </div>
    </div>
  </div>
);

export default function Home(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSignIn = (): void => {
    signIn("github");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-transparent border-t-primary border-r-primary/30"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-primary/10"></div>
        </div>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const features = [
    {
      Icon: Target,
      title: "Smart Analysis",
      description:
        "AI analyzes your GitHub repositories, commit patterns, and programming languages to understand your technical capabilities and coding style.",
      color: "from-red-500 to-orange-500",
    },
    {
      Icon: TrendingUp,
      title: "Gap Identification",
      description:
        "Compare your current skills with industry demands and job requirements to identify exactly what you need to learn next.",
      color: "from-green-500 to-emerald-500",
    },
    {
      Icon: Rocket,
      title: "Personalized Roadmap",
      description:
        "Get a custom learning path with specific projects, certifications, courses, and resources tailored to your career goals.",
      color: "from-blue-500 to-purple-500",
    },
  ];

  const analysisItems = [
    {
      Icon: Code,
      title: "Primary Languages",
      description: "JavaScript, Python, TypeScript",
      gradient:
        "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30",
    },
    {
      Icon: GitBranch,
      title: "Activity Level",
      description: "Highly Active (342 commits)",
      gradient:
        "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30",
    },
    {
      Icon: Users,
      title: "Collaboration",
      description: "15 contributors, 8 PRs merged",
      gradient:
        "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30",
    },
    {
      Icon: Target,
      title: "Career Match",
      description: "85% Full-Stack Developer",
      gradient:
        "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      <div className="mb-5"></div>
      <NavbarMain />
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <g fill="currentColor" fill-opacity="0.05">
                  <path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
                </g>
              </g>
            </svg>
          `)}")`,
          color: "rgb(15 23 42)",
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-0 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <g fill="currentColor" fill-opacity="0.1">
                  <path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
                </g>
              </g>
            </svg>
          `)}")`,
          color: "rgb(248 250 252)",
        }}
      ></div>

      <main className="relative z-10 px-6 pt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/30 dark:border-blue-800/30 text-sm font-medium text-blue-700 dark:text-blue-300 mb-8">
                <Star className="h-4 w-4" />
                AI-Powered Career Analysis
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-gray-600 py-4">
                  Unlock Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Career Potential
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Transform your GitHub profile into a strategic career roadmap
                with AI-powered analysis, personalized recommendations, and
                actionable insights.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} id="connect" className="mb-16">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignIn}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-2xl shadow-blue-500/25 dark:shadow-blue-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
                <div className="relative flex items-center gap-3">
                  <Github className="h-6 w-6" />
                  Connect with GitHub
                  <motion.div
                    className="h-5 w-5 bg-white/20 rounded-full flex items-center justify-center"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </motion.div>
                </div>
              </motion.button>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                We analyze your public & private repositories to provide
                personalized insights
              </p>
            </motion.div>

            <div id="howitworks">
              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-3 gap-8 mb-20"
              >
                {features.map((feature, idx) => (
                  <FeatureCard key={feature.title} {...feature} index={idx} />
                ))}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} id="features" className="mb-20">
              <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-8">
                See Your GitHub Profile in a New Light
              </h2>

              <div className="relative max-w-7xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-slate-700/30 p-8 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-4 text-sm font-mono text-slate-500 dark:text-slate-400">
                      github.com/your-profile
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {analysisItems.slice(0, 2).map((item) => (
                        <AnalysisItem key={item.title} {...item} />
                      ))}
                    </div>

                    <div className="space-y-4">
                      {analysisItems.slice(2).map((item) => (
                        <AnalysisItem key={item.title} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} id="benefits" className="mb-20">
              <h2 className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-gray-600 py-4">
                Supercharge Your Career in Just a Few Clicks
              </h2>
              <div className="relative max-w-5xl mx-auto px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>

                <div className="relative max-w-5xl mx-auto px-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>

                  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 p-6 shadow-xl hover:scale-[1.02] transition">
                      <BrainCog className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-2" />
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        Focused Learning
                      </h3>
                      <Grid size={20} />
                      <p className="text-base text-slate-700 dark:text-slate-300">
                        Skip the guesswork. Follow a clear, AI-generated roadmap
                        tailored to your goals.
                      </p>
                    </div>
                    <div className="md:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 p-6 shadow-xl hover:scale-[1.02] transition">
                      <Rocket className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        Project-Driven Growth
                      </h3>
                      <Grid size={20} />
                      <p className="text-base text-slate-700 dark:text-slate-300">
                        Build practical, resume-worthy projects that align with
                        your career aspirations.
                      </p>
                    </div>

                    <div className="md:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 p-6 shadow-xl hover:scale-[1.02] transition">
                      <LineChart className="h-10 w-10 text-green-600 dark:text-green-400 mb-2" />
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        Skill Gap Analysis
                      </h3>
                      <Grid size={20} />
                      <p className="text-base text-slate-700 dark:text-slate-300">
                        Identify missing skills by comparing your GitHub
                        activity with target job requirements.
                      </p>
                    </div>
                    <div className="md:col-span-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 p-6 shadow-xl hover:scale-[1.02] transition">
                      <Hammer className="h-10 w-10 text-yellow-600 dark:text-yellow-400 mb-2" />
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        Track Progress
                      </h3>
                      <Grid size={20} />
                      <p className="text-base text-slate-700 dark:text-slate-300">
                        Visualize your growth as you complete milestones,
                        certifications, and projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div id="about">
          <FeaturesSectionDemo />
        </div>
      </main>

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
                  className="text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                >
                  Buy me a coffee{" "}
                  <CoffeeIcon className="inline-block h-4 w-4" />
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
