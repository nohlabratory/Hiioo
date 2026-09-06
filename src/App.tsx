import React, { useState, useEffect } from 'react';
import { FeaturedBundleCard } from './components/FeaturedBundleCard';
import { CourseList } from './components/CourseList';
import { TelegramModal } from './components/TelegramModal';
import { Send, MessageCircle } from 'lucide-react';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('course_library_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState<boolean>(false);

  // Sync unlock state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('course_library_unlocked', String(isUnlocked));
    } catch {
      // ignore
    }
  }, [isUnlocked]);

  const handleResetAccess = () => {
    setIsUnlocked(false);
    try {
      localStorage.removeItem('course_library_unlocked');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-20">
      {/* Top Simple Sticky Bar */}
      <header className="w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-black tracking-tight text-neutral-900">
              100+ ኮርሶች • 500 ETB
            </span>
          </div>

          <button
            type="button"
            id="nav-telegram-contact-btn"
            onClick={() => setIsTelegramModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-black transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ቴሌግራም (@nohwin)</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-12">
        {/* On the top: Card that contains 100+ courses with only 500 ETB in bold and Buy button */}
        <section className="flex justify-center">
          <FeaturedBundleCard
            isUnlocked={isUnlocked}
            totalCoursesCount={100}
            onOpenCheckout={() => setIsTelegramModalOpen(true)}
            onResetAccess={handleResetAccess}
          />
        </section>

        {/* Course Lists Section */}
        <CourseList onSelectBuy={() => setIsTelegramModalOpen(true)} />

        {/* Bottom Banner */}
        <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#229ED9] flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-neutral-900">
              ጥያቄ አለዎት ወይስ ኮርሶቹን መግዛት ይፈልጋሉ?
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm font-bold leading-relaxed">
              ኮርሶቹን ለመግዛት በቴሌግራም ያናግሩን። ፈጣን ምላሽ እንሰጣለን!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTelegramModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-black text-sm shadow-xs transition-all cursor-pointer active:scale-[0.98]"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
            <span>በቴሌግራም ያናግሩን (@nohwin)</span>
          </button>
        </div>
      </main>

      {/* Telegram Purchase Pop-up Modal */}
      <TelegramModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        telegramUsername="nohwin"
      />
    </div>
  );
}
