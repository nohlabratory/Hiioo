import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { ALL_COURSES } from '../data/courses';
import { Course, CourseCategory } from '../types';

interface CourseListProps {
  onSelectBuy: () => void;
}

const CATEGORIES: { labelAmharic: string; value: CourseCategory }[] = [
  { labelAmharic: 'ሁሉም (All)', value: 'All' },
  { labelAmharic: 'ዌብ እና ሶፍትዌር', value: 'Web & Software' },
  { labelAmharic: 'አርቲፊሻል ኢንተለጀንስ (AI)', value: 'AI & Data Science' },
  { labelAmharic: 'ዲዛይን እና ፈጠራ', value: 'Design & Creative' },
  { labelAmharic: 'ቢዝነስ እና ማርኬቲንግ', value: 'Business & Marketing' },
  { labelAmharic: 'ሞባይል እና ክላውድ', value: 'Mobile & Cloud' },
];

export const CourseList: React.FC<CourseListProps> = ({ onSelectBuy }) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);

  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.skills.some((skill) => skill.toLowerCase().includes(q)) ||
        course.instructor.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedCourses = useMemo(() => {
    return filteredCourses.slice(0, visibleCount);
  }, [filteredCourses, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 18, filteredCourses.length));
  };

  return (
    <section id="courses-section" className="w-full max-w-5xl mx-auto pt-8 space-y-6">
      {/* Section Title in Amharic */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-neutral-100 text-neutral-800 border border-neutral-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>የኮርሶች ካታሎግ (100+ Courses)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
          በጥቅሉ ውስጥ የተካተቱ ኮርሶች ዝርዝር
        </h2>
        <p className="text-neutral-600 text-sm font-bold max-w-xl mx-auto leading-relaxed">
          እነዚህን ሁሉ 100+ ኮርሶች በአንድ ላይ በ 500 ብር ብቻ ማግኘት ይችላሉ። ለመግዛት በቴሌግራም ያናግሩን።
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200/90 shadow-xs">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            id="course-search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(18);
            }}
            placeholder="የኮርስ ስም ይፈልጉ... (ምሳሌ: Python, React, AI, UI/UX, Flutter, Docker)"
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                id={`filter-cat-${cat.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setVisibleCount(18);
                }}
                className={`px-3.5 py-2 rounded-xl font-black shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
                }`}
              >
                {cat.labelAmharic}
              </button>
            );
          })}
        </div>

        {/* Results Count & Quick CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs font-bold text-neutral-500">
          <span>
            {filteredCourses.length} ኮርሶች ተገኝተዋል (ከ 100+ ውስጥ)
          </span>
          <button
            type="button"
            onClick={onSelectBuy}
            className="text-neutral-900 hover:underline cursor-pointer font-black inline-flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ሁሉንም በ 500 ብር ይግዙ</span>
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCourses.map((course: Course) => (
          <div
            key={course.id}
            id={`course-card-${course.id}`}
            className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              {/* Category & Level Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                  {course.category}
                </span>
                <span className="text-[11px] font-bold text-neutral-500">
                  {course.level}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-black text-neutral-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              {/* Meta information */}
              <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 pt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{course.lessonsCount} ትምህርቶች</span>
                </div>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {course.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-600 border border-neutral-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card CTA */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 truncate max-w-[130px]">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{course.instructor}</span>
              </div>

              <button
                type="button"
                onClick={onSelectBuy}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-blue-600 text-white text-xs font-black transition-all cursor-pointer shadow-2xs shrink-0"
              >
                በቴሌግራም ይግዙ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayedCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200/90 p-6 space-y-3">
          <p className="text-neutral-500 font-bold text-sm">
            ለዚህ ፍለጋ የተገኘ ኮርስ የለም። እባክዎ ሌላ ቃል ይሞክሩ።
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-black cursor-pointer"
          >
            ሁሉንም ኮርሶች አሳይ
          </button>
        </div>
      )}

      {/* Show More Button */}
      {visibleCount < filteredCourses.length && (
        <div className="text-center pt-2">
          <button
            type="button"
            id="load-more-courses-btn"
            onClick={handleShowMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 font-black text-sm border border-neutral-300 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>ተጨማሪ ኮርሶችን አሳይ ({filteredCourses.length - visibleCount} ይቀራሉ)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
