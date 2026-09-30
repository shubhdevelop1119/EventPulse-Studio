import React from 'react';
import { Calendar, Sparkles, BookmarkCheck, RotateCcw, Zap } from 'lucide-react';

interface HeaderProps {
  onLoadPreset: (presetKey: string) => void;
  savedCount: number;
  onOpenHistory: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadPreset,
  savedCount,
  onOpenHistory,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 py-3 shadow-xs backdrop-blur-md sm:px-6 lg:px-8">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 shadow-md shadow-indigo-200">
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="m9 16 2 2 4-4" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
              EventPulse <span className="bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">Studio</span>
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 border border-indigo-100 hidden sm:inline-block">
              AI Multi-Platform
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden md:block">
            Generate polished event promo posts for Instagram, LinkedIn, X, and Facebook
          </p>
        </div>
      </div>

      {/* Center sample presets */}
      <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-slate-100/90 p-1 border border-slate-200">
        <span className="text-xs font-semibold text-slate-500 px-2.5 flex items-center gap-1">
          <Zap className="h-3 w-3 text-amber-500 fill-amber-400" />
          Quick Samples:
        </span>
        <button
          onClick={() => onLoadPreset('tech_summit')}
          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:text-indigo-600 hover:shadow-sm transition-all"
        >
          🚀 Tech Summit
        </button>
        <button
          onClick={() => onLoadPreset('workshop')}
          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:text-indigo-600 hover:shadow-sm transition-all"
        >
          🎨 UX Masterclass
        </button>
        <button
          onClick={() => onLoadPreset('music_fest')}
          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:text-indigo-600 hover:shadow-sm transition-all"
        >
          🎵 Music Fest
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenHistory}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all"
          title="View previously saved campaigns"
        >
          <BookmarkCheck className="h-4 w-4 text-indigo-600" />
          <span>Saved</span>
          {savedCount > 0 && (
            <span className="ml-0.5 rounded-full bg-indigo-100 px-1.5 py-0.2 text-[10px] font-bold text-indigo-700">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-all"
          title="Clear inputs"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </header>
  );
};
