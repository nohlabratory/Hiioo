import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Copy, 
  Check, 
  Sparkles,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  telegramUsername?: string;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({
  isOpen,
  onClose,
  telegramUsername = 'nohwin',
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const cleanUsername = telegramUsername.replace('@', '').replace('t.me/', '').trim();
  const telegramUrl = `https://t.me/${cleanUsername}`;

  const handleCopy = () => {
    const textToCopy = `@${cleanUsername}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {
        fallbackCopy(textToCopy);
      });
    } else {
      fallbackCopy(textToCopy);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Copy fallback failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div 
      id="telegram-popup-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-2xl ring-1 ring-neutral-900/[0.05] space-y-6 relative transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          id="close-telegram-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header with Amharic prompt requested by user */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100+ ኮርሶች • 500 ETB</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-snug">
            ኮርሶቹን ለመግዛት በቴሌግራም ያናግሩን
          </h2>

          <p className="text-neutral-600 text-sm font-bold leading-relaxed">
            ክፍያውን በቴሌግራም በመክፈል ሁሉንም ኮርሶች ወዲያውኑ መውሰድ ይችላሉ። ከታች ያለውን የቴሌግራም አዝራር ይጫኑ።
          </p>
        </div>

        {/* Prominent Telegram Button with User's Username */}
        <div className="space-y-3 pt-2">
          <a
            id="telegram-direct-action-btn"
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-black text-base sm:text-lg transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer no-underline group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
            <span>@{cleanUsername} በቴሌግራም ያናግሩን</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          {/* Quick Copy Username Pill */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-bold text-neutral-500">የቴሌግራም ስም:</span>
              <span className="font-mono font-black text-neutral-900 text-sm">@{cleanUsername}</span>
            </div>

            <button
              type="button"
              id="copy-telegram-username-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-2xs transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span className="text-emerald-700">ተቀድቷል!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>ኮፒ</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payment notice in Amharic */}
        <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 text-xs font-bold text-neutral-700 space-y-1.5">
          <div className="flex items-center justify-between text-neutral-900">
            <span>የጥቅሉ ጠቅላላ ዋጋ:</span>
            <span className="font-black text-sm">500 ETB (ብር)</span>
          </div>
          <p className="text-neutral-500 font-semibold text-[11px] leading-relaxed">
            ክፍያ በቴሌብር (Telebirr)፣ በኢትዮጵያ ንግድ ባንክ (CBE)፣ በዘመን ባንክ እና በአቢሲኒያ ባንክ ይፈጸማል።
          </p>
        </div>

        {/* Footer close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 text-center text-xs font-bold text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
        >
          ተመለስ / ዝጋ
        </button>
      </div>
    </div>
  );
};
