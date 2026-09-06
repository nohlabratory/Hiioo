import React from 'react';
import { BookOpen, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isUnlocked: boolean;
  onOpenCheckout: () => void;
  totalCoursesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ isUnlocked, onOpenCheckout, totalCoursesCount }) => {
  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold shadow-sm">
            <BookOpen className="w-5 h-5 text-neutral-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-neutral-900">Course Library</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
                {totalCoursesCount}+ Courses
              </span>
            </div>
            <p className="text-xs text-neutral-500 hidden md:block">
              Premium Tech, Design, AI & Business Education
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isUnlocked ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>All-Access Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-1 text-xs text-neutral-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>One-time 500 ETB</span>
              </div>
              <button
                id="header-buy-now-btn"
                onClick={onOpenCheckout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-sm active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Get All-Access (500 ETB)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
