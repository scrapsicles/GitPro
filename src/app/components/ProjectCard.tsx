import React from 'react'
import { Calendar, Star, GitBranch } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  difficulty: string
  estimatedTime?: string
  technologies?: string[]
}

export default function ProjectCard({ 
  title, 
  description, 
  difficulty, 
  estimatedTime = '2-4 weeks',
  technologies = []
}: ProjectCardProps) {
  const difficultyColor = {
    'Beginner': 'text-green-600 bg-green-50',
    'Intermediate': 'text-yellow-600 bg-yellow-50',
    'Advanced': 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[difficulty as keyof typeof difficultyColor]}`}>
          {difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {estimatedTime}
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          Portfolio piece
        </div>
      </div>
      
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}