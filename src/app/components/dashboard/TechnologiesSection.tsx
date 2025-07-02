import { Lightbulb } from "lucide-react";

interface TechnologiesSectionProps {
  frameworks: string[];
  topTopics: string[];
}

export default function TechnologiesSection({ frameworks, topTopics }: TechnologiesSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        Technologies & Frameworks
      </h2>
      <div className="grid gap-6 mb-8">
        {frameworks.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Frameworks
            </h3>
            <div className="flex flex-wrap gap-3">
              {frameworks.map((fw) => (
                <span
                  key={fw}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-colors"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>
        )}
        {topTopics.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Top Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {topTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 rounded-full text-sm font-medium hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/50 dark:hover:to-emerald-900/50 transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}