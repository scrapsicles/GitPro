import React from "react"

interface SkillBadgeProps {
  skill: string
  type: 'current' | 'missing' | 'framework' | 'certification'
}

export default function SkillBadge({ skill, type }: SkillBadgeProps) {
  const typeStyles = {
    current: 'bg-green-100 text-green-800',
    missing: 'bg-red-100 text-red-800',
    framework: 'bg-blue-100 text-blue-800',
    certification: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeStyles[type]}`}>
      {skill}
    </span>
  )
}