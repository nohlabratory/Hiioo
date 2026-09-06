import React from 'react';
import { Course } from '../types';
import { Clock, BookOpen, Star, PlayCircle, Lock, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  isUnlocked: boolean;
  onSelectCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isUnlocked,
  onSelectCourse,
}) => {
  // Category-specific subtle accent
  const categoryBadgeColors: Record<string, string> = {
    'Web & Software': 'bg-blue-50 text-blue-700 border-blue-200',
    'AI & Data Science': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Design & Creative': 'bg-purple-50 text-purple-700 border-purple-200',
    'Business & Marketing': 'bg-amber-50 text-amber-800 border-amber-200',
    'Mobile & Cloud': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const badgeClass = categoryBadgeColors[course.category] || 'bg-neutral-100 text-neutral-700 border-neutral-200';

  return (
    <div 
      id={`course-card-${course.id}`}
      className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="space-y-3">
        {/* Top bar: Category + Level */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeClass}`}>
            {course.category}
          </span>
          <span className="text-[11px] font-medium text-neutral-400">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectCourse(course)}
          className="text-base font-bold text-neutral-900 leading-snug group-hover:text-neutral-700 cursor-pointer line-clamp-2"
        >
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1 pt-1">
          {course.skills.slice(0, 3).map((skill, idx) => (
            <span 
              key={idx} 
              className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-medium"
            >
              {skill}
            </span>
          ))}
          {course.skills.length > 3 && (
            <span className="text-[10px] text-neutral-400 font-medium self-center">
              +{course.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 mt-4 border-t border-neutral-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course.lessonsCount} lessons</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-neutral-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="text-[11px] text-neutral-400 truncate max-w-[130px]">
            By {course.instructor}
          </div>

          <button
            id={`course-preview-btn-${course.id}`}
            onClick={() => onSelectCourse(course)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isUnlocked
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
          >
            {isUnlocked ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Start Learning</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-3.5 h-3.5" />
                <span>View Details</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
