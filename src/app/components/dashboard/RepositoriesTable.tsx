import { ExternalLink } from "lucide-react";

interface Repository {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}

interface RepositoriesTableProps {
  repositories: Repository[];
}

export default function RepositoriesTable({
  repositories,
}: RepositoriesTableProps) {
  if (!repositories?.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Recent Repositories
      </h2>
      <div className="overflow-hidden border border-gray-200 rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Repository
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Language
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Stars
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Forks
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Updated
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {repositories.slice(0, 20).map((repo) => (
                <tr
                  key={repo.name}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {repo.name}
                      </div>
                      {repo.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {repo.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {repo.language ? (
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {repo.language}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {repo.stars}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {repo.forks}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(repo.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
