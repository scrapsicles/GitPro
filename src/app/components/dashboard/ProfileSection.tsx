import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface ProfileSectionProps {
  profile: GitHubProfile;
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8"
    >
      <div className="flex items-center gap-8 mb-8">
        <div className="relative">
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-700 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-700 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {profile.name || profile.login}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">@{profile.login}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span>
              Member since {new Date(profile.created_at).getFullYear()}
            </span>
            <span>•</span>
            <span>{profile.public_repos} repositories</span>
            <span>•</span>
            <span>{profile.followers} followers</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}