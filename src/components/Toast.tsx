import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-xl shadow-slate-300/40 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200">
      {type === 'success' ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
      )}
      <span className="font-semibold text-slate-900 text-xs sm:text-sm">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
