import React from 'react';
import { 
  Check, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface FeaturedBundleCardProps {
  isUnlocked: boolean;
  totalCoursesCount?: number;
  onOpenCheckout: () => void;
  onResetAccess?: () => void;
}

export const FeaturedBundleCard: React.FC<FeaturedBundleCardProps> = ({
  isUnlocked,
  totalCoursesCount = 100,
  onOpenCheckout,
  onResetAccess,
}) => {
  return (
    <div 
      id="course-bundle-card"
      className="w-full max-w-xl mx-auto rounded-3xl border border-neutral-200/90 bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] ring-1 ring-neutral-900/[0.05] space-y-6 transition-all"
    >
      {/* Header Info */}
      <div className="space-y-3">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-neutral-100 text-neutral-800 border border-neutral-200">
          {totalCoursesCount}+ ኮርሶች በአንድ ላይ
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 leading-snug">
          100+ ኮርሶች በ{' '}
          <span className="font-black text-neutral-900 underline decoration-neutral-300 underline-offset-4">
            500 ETB ብቻ
          </span>
        </h1>

        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-bold">
          ዌብ ዲቨሎፕመንት፣ አርቲፊሻል ኢንተለጀንስ (AI)፣ ሞባይል መተግበሪያዎች፣ ዩአይ/ዩኤክስ ዲዛይን እና ዲጂታል ቢዝነስን ጨምሮ የተሟሉ ተግባራዊ ስልጠናዎች።
        </p>
      </div>

      {/* Clean Inclusions with Bold Text */}
      <div className="space-y-3 pt-2 border-t border-neutral-100">
        <div className="flex items-center gap-3 text-sm font-bold text-neutral-900">
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>100+ የተሟሉ እና ደረጃቸውን የጠበቁ ኮርሶች</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-neutral-900">
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>የፕሮጀክት ፋይሎች፣ ኮዶች እና ማጠቃለያ ማስታወሻዎች</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-neutral-900">
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>ቀጥታ በቴሌግራም ፈጣን ድጋፍ እና አቅርቦት</span>
        </div>
      </div>

      {/* Pricing & Action */}
      <div className="pt-5 border-t border-neutral-100 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
            የጥቅሉ ዋጋ
          </span>
          <span 
            id="top-card-bold-price" 
            className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight"
          >
            500 ETB
          </span>
        </div>

        {isUnlocked ? (
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ክፍያ ተረጋግጧል — 100+ ኮርሶች ክፍት ናቸው</span>
            </div>
            {onResetAccess && (
              <button
                type="button"
                onClick={onResetAccess}
                className="w-full text-center text-xs font-bold text-neutral-400 hover:text-neutral-700 underline cursor-pointer"
              >
                እንደገና ሞክር (Reset Demo)
              </button>
            )}
          </div>
        ) : (
          <button
            id="top-card-buy-now-btn"
            onClick={onOpenCheckout}
            className="w-full py-4 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-base transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-sm active:scale-[0.99] cursor-pointer group"
          >
            <span>አሁን ይግዙ (Buy Now)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[3]" />
          </button>
        )}
      </div>
    </div>
  );
};
