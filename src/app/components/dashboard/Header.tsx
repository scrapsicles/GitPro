import { signOut } from "next-auth/react";
import { Github, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface HeaderProps {
  profile: GitHubProfile | null;
}

export default function Header({ profile }: HeaderProps) {
    const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Github className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GitPro
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Skills Analyzer</p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          {profile && (
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full">
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600 shadow-sm"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {profile.name || profile.login}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">@{profile.login}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
            <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
        </div>
      </div>
    </header>
  );
}