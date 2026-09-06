import React, { useState } from 'react';
import { Course, Lesson } from '../types';
import { 
  X, 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  Star, 
  Sparkles, 
  User, 
  FileText,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onOpenCheckout: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  isUnlocked,
  onOpenCheckout,
}) => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !course) return null;

  const currentLesson = activeLesson || course.lessons[0];

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="course-detail-modal"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100 bg-stone-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
              {course.category}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-medium text-neutral-600">{course.level}</span>
          </div>
          <button
            id="close-course-detail-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Title & Metadata */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              {course.title}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium text-neutral-700">Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                <span>{course.lessonsCount} lessons</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-neutral-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{course.rating.toFixed(1)} ({course.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Video Player Mockup */}
          <div className="rounded-xl border border-neutral-200 overflow-hidden bg-neutral-950 text-white shadow-inner">
            <div className="aspect-video w-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-black/30 relative">
              {/* Top player bar */}
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span className="font-semibold truncate max-w-[70%]">
                  Playing: {currentLesson?.title || 'Course Introduction'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white/20">
                  {currentLesson?.isFreePreview || isUnlocked ? 'Free Preview' : 'Locked Preview'}
                </span>
              </div>

              {/* Center Play Button */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <button
                  type="button"
                  id="video-player-toggle-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-neutral-950 ml-1" />
                </button>
                <div className="text-center">
                  <div className="text-xs font-medium text-white/90">
                    {isPlaying ? 'Video simulation streaming...' : 'Click to preview video lesson'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    HD 1080p • Includes Amharic & English transcripts
                  </div>
                </div>
              </div>

              {/* Bottom player controls */}
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? '45%' : '15%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>02:14 / {currentLesson?.duration || '15 min'}</span>
                  </div>
                  <span className="font-mono">1080p 60fps</span>
                </div>
              </div>
            </div>
          </div>

          {/* If not unlocked, display the Bundle Callout */}
          {!isUnlocked && (
            <div className="p-4 rounded-xl bg-stone-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-neutral-900">
                    Included in the 100+ Courses Bundle
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  Get this course plus 104 more high-demand courses for only <strong className="text-neutral-900 font-bold">500 ETB</strong>.
                </p>
              </div>
              <button
                id="modal-buy-bundle-btn"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="shrink-0 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
              >
                Buy 100+ Courses for 500 ETB
              </button>
            </div>
          )}

          {/* Curriculum / Lessons Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-neutral-500" />
                <span>Curriculum & Lessons</span>
              </h4>
              <span className="text-xs text-neutral-500">
                {completedLessonIds.length} of {course.lessons.length} completed
              </span>
            </div>

            <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden">
              {course.lessons.map((lesson, index) => {
                const isAccessible = isUnlocked || lesson.isFreePreview;
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isCurrent = currentLesson?.id === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (isAccessible) setActiveLesson(lesson);
                    }}
                    className={`p-3.5 flex items-center justify-between gap-3 text-xs transition-colors ${
                      isCurrent ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'
                    } ${isAccessible ? 'cursor-pointer' : 'opacity-75'}`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleComplete(lesson.id);
                        }}
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-300 text-transparent hover:border-neutral-400'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-0.5">
                        <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                          <span>{index + 1}. {lesson.title}</span>
                          {lesson.isFreePreview && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              FREE PREVIEW
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                          <span>{lesson.duration}</span>
                          <span>•</span>
                          <span>Video Lesson & Notes</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isAccessible ? (
                        <span className="text-neutral-500 font-medium hover:text-neutral-900 flex items-center gap-1 text-[11px]">
                          <Play className="w-3 h-3 fill-neutral-700" /> Watch
                        </span>
                      ) : (
                        <span className="text-neutral-400 flex items-center gap-1 text-[11px]">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Acquired */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Skills You'll Master
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {course.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
