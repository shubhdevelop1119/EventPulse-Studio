import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, Type, Sparkles } from 'lucide-react';
import { FontFamilyOption } from '../types/event';

export interface FontOptionItem {
  id: FontFamilyOption;
  name: string;
  sample: string;
  category: string;
}

export const FONT_OPTIONS: FontOptionItem[] = [
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', sample: 'Modern, Crisp, Clean', category: 'Clean Sans' },
  { id: 'Inter', name: 'Inter', sample: 'Tech & High Readability', category: 'Clean Sans' },
  { id: 'Outfit', name: 'Outfit', sample: 'Geometric, Friendly Startup', category: 'Clean Sans' },
  { id: 'Poppins', name: 'Poppins', sample: 'Rounded & Approachable', category: 'Clean Sans' },
  { id: 'Montserrat', name: 'Montserrat', sample: 'Bold, Strong Punchy', category: 'Display' },
  { id: 'Space Grotesk', name: 'Space Grotesk', sample: 'Cyber, AI, Modernist', category: 'Display' },
  { id: 'Raleway', name: 'Raleway', sample: 'Sleek & Sophisticated', category: 'Display' },
  { id: 'Oswald', name: 'Oswald', sample: 'Condensed Concert Poster', category: 'Headline' },
  { id: 'Bebas Neue', name: 'Bebas Neue', sample: 'Ultra Impact All-Caps', category: 'Headline' },
  { id: 'Syne', name: 'Syne', sample: 'Avant-garde, Arts & Indie', category: 'Creative' },
  { id: 'Playfair Display', name: 'Playfair Display', sample: 'Luxury Editorial Serif', category: 'Serif' },
  { id: 'Cinzel', name: 'Cinzel', sample: 'Cinematic, Royal Classic', category: 'Serif' },
  { id: 'Lora', name: 'Lora', sample: 'Contemporary Literary Serif', category: 'Serif' },
  { id: 'JetBrains Mono', name: 'JetBrains Mono', sample: 'Developer & Code Monospace', category: 'Monospace' },
];

interface FontDropdownProps {
  value: FontFamilyOption;
  onChange: (font: FontFamilyOption) => void;
}

export const FontDropdown: React.FC<FontDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedFont = FONT_OPTIONS.find((f) => f.id === value) || FONT_OPTIONS[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-focus search input
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filtered fonts
  const filteredFonts = FONT_OPTIONS.filter(
    (font) =>
      font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.sample.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-left shadow-2xs hover:border-indigo-400 hover:bg-slate-50/50 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm">
            <Type className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold text-slate-900 truncate"
                style={{ fontFamily: `"${selectedFont.id}", sans-serif` }}
              >
                {selectedFont.name}
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                {selectedFont.category}
              </span>
            </div>
            <div
              className="text-xs text-slate-500 truncate mt-0.5"
              style={{ fontFamily: `"${selectedFont.id}", sans-serif` }}
            >
              Preview: The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pl-2 shrink-0">
          <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">Change Font</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-100">
          {/* Search Header */}
          <div className="border-b border-slate-100 p-2.5 bg-slate-50/80">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search font by name or style (e.g. Serif, Bold, Modern)..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-100 font-medium"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
            {filteredFonts.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No fonts matching "{searchQuery}"
              </div>
            ) : (
              filteredFonts.map((font) => {
                const isSelected = font.id === value;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => {
                      onChange(font.id);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 text-indigo-950 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-bold"
                          style={{ fontFamily: `"${font.id}", sans-serif` }}
                        >
                          {font.name}
                        </span>
                        <span
                          className={`rounded-md px-1.5 py-0.2 text-[10px] font-medium ${
                            isSelected
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {font.category}
                        </span>
                      </div>
                      <div
                        className="text-xs text-slate-500 truncate mt-0.5"
                        style={{ fontFamily: `"${font.id}", sans-serif` }}
                      >
                        {font.sample} · ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      </div>
                    </div>

                    {isSelected && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Dropdown Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>14 Google Fonts Available</span>
            <span className="text-slate-500 font-medium">Updates Poster & Copy Preview Live</span>
          </div>
        </div>
      )}
    </div>
  );
};
