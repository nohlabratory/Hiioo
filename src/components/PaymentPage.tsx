import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Send, 
  Smartphone, 
  Building2, 
  CheckCircle2,
  Edit2
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'mobile';
  accountOrNumber: string;
  accountHolder: string;
  label: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'zemen',
    name: 'Zemen Bank',
    type: 'bank',
    accountOrNumber: '1741111288109012',
    accountHolder: 'Karlos belay',
    label: 'Account No',
  },
  {
    id: 'telebirr',
    name: 'Telebirr',
    type: 'mobile',
    accountOrNumber: '0930202616',
    accountHolder: 'Karlos Belay',
    label: 'Phone Number',
  },
  {
    id: 'abyssinia',
    name: 'Abyssinia Bank',
    type: 'bank',
    accountOrNumber: '172824935',
    accountHolder: 'Karlos Belay',
    label: 'Account No',
  },
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    type: 'bank',
    accountOrNumber: '1000613056495',
    accountHolder: 'Karlos Belay',
    label: 'Account No',
  },
];

export const DEFAULT_TELEGRAM_USERNAME = 'nohwin';

interface PaymentPageProps {
  onBack: () => void;
  onPaymentConfirmed?: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ 
  onBack,
  onPaymentConfirmed 
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [telegramUsername, setTelegramUsername] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('course_telegram_username');
      return saved && saved !== 'karlosbelay' ? saved : DEFAULT_TELEGRAM_USERNAME;
    } catch {
      return DEFAULT_TELEGRAM_USERNAME;
    }
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(telegramUsername);
  const [hasSentScreenshot, setHasSentScreenshot] = useState<boolean>(false);

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
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSaveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempUsername.trim().replace('@', '');
    if (clean) {
      setTelegramUsername(clean);
      try {
        localStorage.setItem('course_telegram_username', clean);
      } catch {
        // ignore
      }
    }
    setIsEditingUsername(false);
  };

  const cleanTelegram = telegramUsername.replace('@', '').trim();
  const telegramUrl = `https://t.me/${cleanTelegram}`;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Top navigation back button */}
      <button
        type="button"
        id="payment-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
        <span>Back to Course</span>
      </button>

      {/* Main Payment Container */}
      <div 
        id="payment-page-container"
        className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] ring-1 ring-neutral-900/[0.05] space-y-7"
      >
        {/* Header & Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Payment Details
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-800 border border-neutral-200">
              100+ Courses Bundle
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              Pay 500 ETB
            </h1>
            <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              500 ETB
            </span>
          </div>

          <p className="text-neutral-700 text-sm font-semibold leading-relaxed">
            Transfer 500 ETB using any of the listed payment methods below. Click the copy button to copy the account or phone number.
          </p>
        </div>

        {/* Listed Payment Methods */}
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Payment Methods
          </h2>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => {
              const isCopied = copiedId === method.id;

              return (
                <div
                  key={method.id}
                  className="p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {method.type === 'mobile' ? (
                        <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Building2 className="w-4 h-4 text-neutral-700 shrink-0" />
                      )}
                      <span className="text-sm font-black text-neutral-900">
                        {method.name}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className="font-mono font-bold text-neutral-900 tracking-wide text-sm bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                        {method.accountOrNumber}
                      </span>
                      <span className="text-neutral-500 font-bold">
                        • {method.accountHolder}
                      </span>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    id={`copy-btn-${method.id}`}
                    onClick={() => handleCopy(method.accountOrNumber, method.id)}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs active:scale-[0.98] ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Telegram Screenshot Submission Step */}
        <div className="pt-4 border-t border-neutral-100 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-neutral-900">
                After Paying: Send Screenshot
              </h3>
              <p className="text-xs font-semibold text-neutral-600">
                Send your transfer receipt screenshot to receive access
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsEditingUsername(!isEditingUsername);
                setTempUsername(telegramUsername);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 hover:text-neutral-900 underline cursor-pointer shrink-0"
              title="Change the destination Telegram username"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEditingUsername ? 'Cancel' : 'Edit @username'}</span>
            </button>
          </div>

          {/* Inline Edit for Telegram Username */}
          {isEditingUsername && (
            <form 
              onSubmit={handleSaveUsername} 
              className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-200"
            >
              <span className="text-xs font-bold text-neutral-400 pl-1">@</span>
              <input
                type="text"
                id="telegram-username-input"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="username"
                className="flex-1 text-xs font-bold text-neutral-900 bg-transparent outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-neutral-800"
              >
                Save
              </button>
            </form>
          )}

          {/* Telegram Action Button */}
          <a
            id="telegram-screenshot-btn"
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setHasSentScreenshot(true)}
            className="w-full py-4 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-base transition-all flex items-center justify-center gap-2.5 shadow-xs hover:shadow-sm active:scale-[0.99] cursor-pointer group no-underline"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            <span>Send Screenshot on Telegram (@{cleanTelegram})</span>
          </a>

          {hasSentScreenshot && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Redirecting to Telegram. Your access will be activated once your screenshot is confirmed!</span>
            </div>
          )}

          {onPaymentConfirmed && (
            <button
              type="button"
              id="confirm-unlock-demo-btn"
              onClick={onPaymentConfirmed}
              className="w-full py-2 text-center text-xs font-bold text-neutral-400 hover:text-neutral-700 underline cursor-pointer"
            >
              Already verified? View Unlocked Course Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
