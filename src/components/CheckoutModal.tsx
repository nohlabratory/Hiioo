import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { PaymentProvider } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (provider: PaymentProvider, txRef: string) => void;
  isAlreadyUnlocked: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isAlreadyUnlocked,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('telebirr');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [txReference, setTxReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onSuccess(selectedProvider, txReference || 'ETB-' + Math.floor(100000 + Math.random() * 900000));
    }, 900);
  };

  const handleInstantDemoUnlock = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onSuccess(selectedProvider, 'DEMO-TX-500');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="checkout-modal"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden my-8"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-stone-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              500
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Unlock 100+ Courses Bundle</h2>
              <p className="text-xs text-neutral-500">Ethiopian Payment via Telebirr & CBE</p>
            </div>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isCompleted || isAlreadyUnlocked ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-neutral-900">Payment Verified! Access Unlocked</h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                Congratulations! You now have access to all 100+ courses, 
                all curriculum resources, and project repositories.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-left space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Bundle Name:</span>
                <span className="font-semibold text-neutral-900">100+ Complete Courses Library</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Amount Paid:</span>
                <span className="font-bold text-neutral-900">500 ETB</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Status:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Active Access
                </span>
              </div>
              <div className="flex justify-between text-neutral-600 pt-1 border-t border-neutral-200">
                <span>Telegram:</span>
                <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                  t.me/nohwin
                </span>
              </div>
            </div>

            <button
              id="start-learning-modal-btn"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Done</span>
            </button>
          </div>
        ) : (
          /* Payment Form */
          <div className="p-6 space-y-5">
            {/* Price Summary Strip */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <div className="text-xs text-neutral-500 font-medium">All-Inclusive Bundle Price</div>
                <div className="text-xs font-semibold text-emerald-700">100+ Courses • Full Bundle Access</div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-neutral-900">500 ETB</span>
                <div className="text-[10px] text-neutral-400">One-time payment</div>
              </div>
            </div>

            {/* Provider Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700">Select Ethiopian Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="tab-telebirr"
                  onClick={() => setSelectedProvider('telebirr')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                    selectedProvider === 'telebirr'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <div>
                    <div className="text-xs font-bold leading-none">Telebirr</div>
                    <div className={`text-[10px] mt-0.5 ${selectedProvider === 'telebirr' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                      Mobile Payment
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  id="tab-cbe"
                  onClick={() => setSelectedProvider('cbe')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                    selectedProvider === 'cbe'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <div>
                    <div className="text-xs font-bold leading-none">CBE / CBE Birr</div>
                    <div className={`text-[10px] mt-0.5 ${selectedProvider === 'cbe' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                      Commercial Bank
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Details Box */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-stone-50/50 space-y-3">
              {selectedProvider === 'telebirr' ? (
                <div className="space-y-2.5">
                  <div className="text-xs font-medium text-neutral-600">
                    Send exactly <strong className="text-neutral-900">500 ETB</strong> via your Telebirr App:
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-neutral-200">
                    <div>
                      <div className="text-[10px] text-neutral-400 font-medium">TELEBIRR PHONE NUMBER</div>
                      <div className="font-mono font-bold text-sm text-neutral-900">0911 234 567</div>
                    </div>
                    <button
                      type="button"
                      id="copy-telebirr-btn"
                      onClick={() => copyToClipboard('0911234567', 'telebirr')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
                    >
                      {copiedKey === 'telebirr' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
                    <span>Account Name:</span>
                    <span className="font-medium text-neutral-900">Course Library Ethiopia</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="text-xs font-medium text-neutral-600">
                    Transfer exactly <strong className="text-neutral-900">500 ETB</strong> to CBE Account:
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-neutral-200">
                    <div>
                      <div className="text-[10px] text-neutral-400 font-medium">CBE ACCOUNT NUMBER</div>
                      <div className="font-mono font-bold text-sm text-neutral-900">1000 2847 1930 2</div>
                    </div>
                    <button
                      type="button"
                      id="copy-cbe-btn"
                      onClick={() => copyToClipboard('1000284719302', 'cbe')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
                    >
                      {copiedKey === 'cbe' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
                    <span>Account Name:</span>
                    <span className="font-medium text-neutral-900">Course Library / Noh Education</span>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerifyPayment} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700">
                  Transaction Code / SMS Reference (or Your Phone Number)
                </label>
                <input
                  type="text"
                  id="checkout-tx-ref-input"
                  value={txReference}
                  onChange={(e) => setTxReference(e.target.value)}
                  placeholder="e.g. TB1238914 or 0912..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-xs text-neutral-900 bg-white"
                />
              </div>

              <button
                type="submit"
                id="submit-payment-verify-btn"
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isProcessing ? (
                  <span>Verifying Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Confirm & Unlock 100+ Courses</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo quick unlock */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col items-center gap-2 text-center">
              <button
                type="button"
                id="instant-demo-unlock-btn"
                onClick={handleInstantDemoUnlock}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Test: Unlock All Courses with 1-Click (Demo Mode)</span>
              </button>
              <span className="text-[11px] text-neutral-400">
                Safe test button to preview full unlocked curriculum experience
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
