import { motion } from "framer-motion";

interface MetricCardProps {
  value: number | string;
  label: string;
  className?: string;
}

export default function MetricCard({ value, label, className = "" }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}