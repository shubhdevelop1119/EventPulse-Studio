import React, { useState } from 'react';
import {
  Sparkles,
  Type,
  Palette,
  Calendar,
  MapPin,
  Users,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  Check,
  Zap,
  Info,
} from 'lucide-react';
import {
  EventFormData,
  FontFamilyOption,
  BannerTheme,
  BannerAspectRatio,
  EventTone,
} from '../types/event';
import { FontDropdown } from './FontDropdown';

interface EventFormProps {
  formData: EventFormData;
  onChange: (data: Partial<EventFormData>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onLoadPreset: (presetKey: string) => void;
}

const FONT_COLOR_PRESETS = [
  { color: '#ffffff', name: 'Pure White' },
  { color: '#f8fafc', name: 'Snow' },
  { color: '#fef08a', name: 'Warm Gold' },
  { color: '#67e8f9', name: 'Cyan Glow' },
  { color: '#f472b6', name: 'Soft Pink' },
  { color: '#a7f3d0', name: 'Mint Green' },
  { color: '#0f172a', name: 'Deep Slate' },
];

const ACCENT_COLOR_PRESETS = [
  { color: '#4f46e5', name: 'Indigo' },
  { color: '#0284c7', name: 'Sky Blue' },
  { color: '#059669', name: 'Emerald' },
  { color: '#d97706', name: 'Amber Gold' },
  { color: '#db2777', name: 'Hot Pink' },
  { color: '#7c3aed', name: 'Royal Purple' },
  { color: '#e11d48', name: 'Rose Red' },
];

const THEME_OPTIONS: { id: BannerTheme; name: string; gradient: string }[] = [
  { id: 'midnight', name: 'Midnight Dark', gradient: 'bg-gradient-to-r from-slate-900 to-indigo-950' },
  { id: 'sunset', name: 'Sunset Glow', gradient: 'bg-gradient-to-r from-rose-900 to-pink-700' },
  { id: 'emerald', name: 'Emerald Forest', gradient: 'bg-gradient-to-r from-slate-900 to-emerald-800' },
  { id: 'indigo', name: 'Ocean Indigo', gradient: 'bg-gradient-to-r from-slate-950 to-blue-800' },
  { id: 'violet', name: 'Velvet Violet', gradient: 'bg-gradient-to-r from-slate-900 to-purple-800' },
  { id: 'titanium', name: 'Crisp Titanium', gradient: 'bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300' },
];

const EVENT_TYPES = [
  'Tech Conference & Summit',
  'Product Launch',
  'Workshop & Masterclass',
  'Live Concert & Music',
  'Networking Mixer',
  'Virtual Webinar',
  'Startup Pitch Demo Day',
  'Community Meetup',
  'Charity Gala & Fundraiser',
];

const TONE_OPTIONS: EventTone[] = [
  'High Energy & Viral',
  'Professional & Insightful',
  'Casual & Community',
  'Urgent / Last Chance FOMO',
  'Inspiring & Visionary',
];

export const EventForm: React.FC<EventFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  onLoadPreset,
}) => {
  const [showStyleSection, setShowStyleSection] = useState(true);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Form Top Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs font-extrabold text-indigo-600">
              1
            </span>
            <span>Event Information</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in details about your event — AI will write platform-specific posts
          </p>
        </div>

        {/* Quick sample chips */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">Sample:</span>
          <button
            type="button"
            onClick={() => onLoadPreset('tech_summit')}
            className="rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors"
          >
            AI Summit
          </button>
          <button
            type="button"
            onClick={() => onLoadPreset('workshop')}
            className="rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors"
          >
            Design
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Event Name / Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. NextGen AI & Creator Summit 2026"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-indigo-50 transition-all font-medium"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700">
              Short Description & What Happens <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              Keep it concise & engaging
            </span>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={3}
            placeholder="Briefly describe what this event is about, what attendees will learn or experience, and why they should attend..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-indigo-50 transition-all font-normal leading-relaxed"
            required
          />
        </div>

        {/* Event Category & Tone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Event Category
            </label>
            <select
              value={formData.eventType}
              onChange={(e) => onChange({ eventType: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-50 cursor-pointer"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Post Tone & Energy
            </label>
            <select
              value={formData.tone}
              onChange={(e) => onChange({ tone: e.target.value as EventTone })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-50 cursor-pointer"
            >
              {TONE_OPTIONS.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date, Time & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Event Date
            </label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => onChange({ date: e.target.value })}
              placeholder="e.g. Nov 14, 2026"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Time
            </label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => onChange({ time: e.target.value })}
              placeholder="e.g. 10:00 AM PST"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Location / Venue
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder="e.g. San Francisco or Virtual"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
            />
          </div>
        </div>

        {/* Host & Call to Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Organizer / Host Name
            </label>
            <input
              type="text"
              value={formData.hostOrOrg}
              onChange={(e) => onChange({ hostOrOrg: e.target.value })}
              placeholder="e.g. Innovation Hub & Creators"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Call to Action Button (CTA)
            </label>
            <input
              type="text"
              value={formData.callToAction}
              onChange={(e) => onChange({ callToAction: e.target.value })}
              placeholder="e.g. Register for Free Passes"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
            />
          </div>
        </div>

        {/* Optional Registration Link */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700">
              Event Registration / Ticket Link (Optional)
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              CTA will link to this URL
            </span>
          </div>
          <input
            type="url"
            value={formData.eventLinkUrl || ''}
            onChange={(e) => onChange({ eventLinkUrl: e.target.value })}
            placeholder="https://eventbrite.com/your-event or https://lu.ma/your-event"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50 font-normal"
          />
        </div>

        {/* Key Highlights */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Key Highlights / Takeaways (one per line)
          </label>
          <textarea
            value={formData.keyHighlights}
            onChange={(e) => onChange({ keyHighlights: e.target.value })}
            rows={2}
            placeholder="15+ world-class keynote speakers&#10;Live interactive product showcases&#10;VIP networking lounge & catered lunch"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-50 font-normal leading-relaxed"
          />
        </div>

        {/* Options: Hashtags & Emojis */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={formData.includeHashtags}
              onChange={(e) => onChange({ includeHashtags: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span>Include platform hashtags</span>
          </label>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span>Emoji Style:</span>
            {(['rich', 'moderate', 'minimal'] as const).map((density) => (
              <button
                key={density}
                type="button"
                onClick={() => onChange({ emojiDensity: density })}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all ${
                  formData.emojiDensity === density
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {density}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Font, Colors & Banner Styling */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowStyleSection(!showStyleSection)}
            className="flex w-full items-center justify-between rounded-xl bg-slate-50 hover:bg-slate-100 p-3 text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
                2
              </span>
              <span className="text-xs font-bold text-slate-800">
                Font, Colors & Card Styling
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-indigo-700 border border-slate-200 shadow-2xs">
                {formData.fontFamily}
              </span>
            </div>
            {showStyleSection ? (
              <ChevronUp className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </button>

          {showStyleSection && (
            <div className="mt-3 space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              {/* Font Family Selector Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Typography Font Family
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    14 Google Fonts
                  </span>
                </div>
                <FontDropdown
                  value={formData.fontFamily}
                  onChange={(font) => onChange({ fontFamily: font })}
                />
              </div>

              {/* Font Color & Accent Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Font Color */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Text / Font Color
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {FONT_COLOR_PRESETS.map((item) => (
                      <button
                        key={item.color}
                        type="button"
                        onClick={() => onChange({ fontColor: item.color })}
                        title={item.name}
                        style={{ backgroundColor: item.color }}
                        className={`h-7 w-7 rounded-full border border-slate-300 shadow-xs transition-transform active:scale-95 ${
                          formData.fontColor.toLowerCase() === item.color.toLowerCase()
                            ? 'scale-110 ring-2 ring-indigo-600 ring-offset-2'
                            : 'hover:scale-105'
                        }`}
                      />
                    ))}
                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
                      <input
                        type="color"
                        value={formData.fontColor}
                        onChange={(e) => onChange({ fontColor: e.target.value })}
                        className="h-5 w-5 cursor-pointer rounded-full border-0 bg-transparent p-0"
                        title="Pick custom font color"
                      />
                      <span className="text-[11px] font-mono text-slate-700 font-semibold">
                        {formData.fontColor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accent Highlight Color */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Button & Highlight Color
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {ACCENT_COLOR_PRESETS.map((item) => (
                      <button
                        key={item.color}
                        type="button"
                        onClick={() => onChange({ accentColor: item.color })}
                        title={item.name}
                        style={{ backgroundColor: item.color }}
                        className={`h-7 w-7 rounded-full border border-slate-300 shadow-xs transition-transform active:scale-95 ${
                          formData.accentColor.toLowerCase() === item.color.toLowerCase()
                            ? 'scale-110 ring-2 ring-indigo-600 ring-offset-2'
                            : 'hover:scale-105'
                        }`}
                      />
                    ))}
                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-2xs">
                      <input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => onChange({ accentColor: e.target.value })}
                        className="h-5 w-5 cursor-pointer rounded-full border-0 bg-transparent p-0"
                        title="Pick custom accent color"
                      />
                      <span className="text-[11px] font-mono text-slate-700 font-semibold">
                        {formData.accentColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Theme */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Card Theme Gradient
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {THEME_OPTIONS.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => onChange({ bannerTheme: theme.id })}
                      className={`flex items-center gap-2 rounded-xl p-2 border text-left transition-all ${
                        formData.bannerTheme === theme.id
                          ? 'border-indigo-600 bg-white text-indigo-900 shadow-xs ring-2 ring-indigo-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full ${theme.gradient} shrink-0`}
                      />
                      <span className="text-xs font-semibold truncate">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Graphic Aspect Ratio
                </label>
                <div className="flex items-center gap-2">
                  {(
                    [
                      { id: '1:1', label: '1:1 Square (Instagram/FB)' },
                      { id: '16:9', label: '16:9 Wide (LinkedIn/X)' },
                      { id: '9:16', label: '9:16 Vertical (Stories)' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChange({ bannerAspectRatio: item.id })}
                      className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                        formData.bannerAspectRatio === item.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || !formData.title.trim() || !formData.description.trim()}
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Generating Platform Posts & Creative Copy...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-sky-200 transition-transform group-hover:rotate-12" />
                <span>Generate Social Media Posts</span>
              </>
            )}
          </button>
          <p className="mt-2 text-center text-xs text-slate-500 font-medium">
            Produces tailored posts for Instagram, LinkedIn, X, and Facebook
          </p>
        </div>
      </div>
    </div>
  );
};
