import React from 'react';
import { Download, Calendar, MapPin, Sparkles, User, ExternalLink } from 'lucide-react';
import { EventFormData } from '../types/event';
import { downloadBannerImage } from '../utils/canvasExport';

interface EventBannerCardProps {
  formData: EventFormData;
  interactive?: boolean;
  onCTAClick?: () => void;
}

export const EventBannerCard: React.FC<EventBannerCardProps> = ({
  formData,
  interactive = true,
  onCTAClick,
}) => {
  const getThemeClasses = () => {
    switch (formData.bannerTheme) {
      case 'sunset':
        return 'from-rose-950 via-purple-950 to-pink-900 text-slate-100 border-rose-800/40';
      case 'emerald':
        return 'from-slate-950 via-emerald-950 to-teal-900 text-slate-100 border-emerald-800/40';
      case 'indigo':
        return 'from-slate-950 via-indigo-950 to-blue-900 text-slate-100 border-indigo-800/40';
      case 'violet':
        return 'from-slate-950 via-violet-950 to-purple-900 text-slate-100 border-violet-800/40';
      case 'titanium':
        return 'from-slate-100 via-slate-200 to-slate-300 text-slate-900 border-slate-300';
      case 'custom':
        return 'border-slate-700/60';
      case 'midnight':
      default:
        return 'from-slate-950 via-slate-900 to-indigo-950/60 text-slate-100 border-slate-800';
    }
  };

  const getCustomStyle = () => {
    if (formData.bannerTheme === 'custom') {
      return {
        background: `linear-gradient(135deg, ${formData.customBgColor1 || '#0f172a'} 0%, ${formData.customBgColor2 || '#312e81'} 100%)`,
      };
    }
    return {};
  };

  const fontStyle = {
    fontFamily: `"${formData.fontFamily}", sans-serif`,
    color: formData.fontColor || '#ffffff',
  };

  const accentColor = formData.accentColor || '#6366f1';
  const isLight = formData.bannerTheme === 'titanium';

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all">
      {/* Banner Container with dynamic aspect ratio */}
      <div
        style={getCustomStyle()}
        className={`relative w-full overflow-hidden bg-gradient-to-br ${getThemeClasses()} border p-5 sm:p-6 transition-all flex flex-col justify-between`}
        style-aspect={formData.bannerAspectRatio}
      >
        {/* Aspect ratio sizing helper */}
        <div
          className={`w-full flex flex-col justify-between ${
            formData.bannerAspectRatio === '1:1'
              ? 'aspect-square min-h-[340px]'
              : formData.bannerAspectRatio === '16:9'
              ? 'aspect-video min-h-[260px]'
              : 'aspect-[9/16] min-h-[480px]'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: accentColor }}
          />

          {/* Top Header Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: accentColor, fontFamily: `"${formData.fontFamily}", sans-serif` }}
              >
                {formData.eventType || 'SPECIAL EVENT'}
              </span>
            </div>

            {formData.showHostBadge && formData.hostOrOrg && (
              <div
                className={`text-[11px] font-medium tracking-tight ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Presented by <span className={isLight ? 'text-slate-900 font-semibold' : 'text-slate-200 font-semibold'}>{formData.hostOrOrg}</span>
              </div>
            )}
          </div>

          {/* Middle: Event Title, Tagline & Description */}
          <div className="relative z-10 my-auto py-3">
            <h3
              style={fontStyle}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug line-clamp-3 text-balance drop-shadow-sm"
            >
              {formData.title || 'Your Event Title Will Appear Here'}
            </h3>

            {/* Accent divider */}
            <div
              className="my-3 h-1 w-14 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            {formData.description && (
              <p
                className={`text-xs sm:text-sm line-clamp-3 max-w-xl font-normal leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
                style={{ fontFamily: `"${formData.fontFamily}", sans-serif` }}
              >
                {formData.description}
              </p>
            )}

            {formData.keyHighlights && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {formData.keyHighlights
                  .split('\n')
                  .slice(0, 3)
                  .map((highlight, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        isLight
                          ? 'bg-slate-300/80 text-slate-800'
                          : 'bg-white/10 text-slate-200 backdrop-blur-xs'
                      }`}
                    >
                      ✓ {highlight}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Bottom Bar: Date, Venue & Call to Action */}
          <div
            className={`relative z-10 mt-auto rounded-xl p-3 sm:p-3.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 ${
              isLight
                ? 'bg-slate-900/5 border border-slate-400/20'
                : 'bg-slate-900/60 border border-slate-700/50 shadow-inner'
            }`}
          >
            <div className="space-y-0.5">
              <div
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: formData.fontColor || (isLight ? '#0f172a' : '#ffffff') }}
              >
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {formData.date || 'Date TBA'} {formData.time ? `· ${formData.time}` : ''}
                </span>
              </div>
              <div
                className={`flex items-center gap-1.5 text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                <span className="truncate max-w-[200px]">{formData.location || 'Venue TBA'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onCTAClick) {
                  onCTAClick();
                } else if (formData.eventLinkUrl) {
                  window.open(formData.eventLinkUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg text-white shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: accentColor,
                fontFamily: `"${formData.fontFamily}", sans-serif`,
              }}
              title="Click Call to Action"
            >
              <span>{formData.callToAction || 'Register Now'}</span>
              <ExternalLink className="h-3 w-3 opacity-90" />
            </button>
          </div>
        </div>

        {/* Hover / Direct Download overlay */}
        {interactive && (
          <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => downloadBannerImage(formData, formData.bannerAspectRatio)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-950/80 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md hover:bg-slate-900 transition-all border border-slate-700"
              title="Download high-res PNG banner"
            >
              <Download className="h-3.5 w-3.5 text-indigo-400" />
              <span>Save PNG</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
