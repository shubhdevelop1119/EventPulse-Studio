import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Globe, MoreHorizontal, Check, Star } from 'lucide-react';
import { EventFormData, GeneratedCampaign } from '../../types/event';
import { EventBannerCard } from '../EventBannerCard';
import { PostActionsBar } from './PostActionsBar';

interface FacebookMockupProps {
  formData: EventFormData;
  campaign: GeneratedCampaign;
  onUpdateCaption: (newCaption: string) => void;
  onCopySuccess: (msg: string) => void;
  onCTAClick?: () => void;
}

export const FacebookMockup: React.FC<FacebookMockupProps> = ({
  formData,
  campaign,
  onUpdateCaption,
  onCopySuccess,
  onCTAClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [rsvpState, setRsvpState] = useState<'none' | 'interested' | 'going'>('none');
  const [likesCount, setLikesCount] = useState(118);

  const data = campaign.facebook;
  const pageName = formData.hostOrOrg || 'Event Community';

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top action bar */}
      <PostActionsBar
        platform="facebook"
        caption={data.caption}
        hashtags={data.hashtags}
        formData={formData}
        onUpdateCaption={onUpdateCaption}
        onCopySuccess={onCopySuccess}
      />

      {/* Realistic Facebook Post Card (Crisp White Theme) */}
      <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-xs">
              {pageName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-slate-900 hover:underline cursor-pointer">
                  {pageName}
                </span>
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[8px] text-white font-bold">
                  ✓
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span>Yesterday at 4:15 PM</span>
                <span>·</span>
                <Globe className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Caption */}
        <div className="px-4 pb-3 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
          {data.caption}

          {/* Hashtags */}
          {data.hashtags && data.hashtags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs font-semibold text-blue-600">
              {data.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Embedded Graphic Banner */}
        <div className="border-t border-slate-200">
          <EventBannerCard formData={formData} interactive={false} onCTAClick={onCTAClick} />
        </div>

        {/* Facebook Event RSVP Link Box */}
        <div className="flex items-center justify-between border-t border-b border-slate-200 bg-slate-50 p-4">
          <div
            onClick={onCTAClick}
            className="space-y-0.5 truncate pr-3 cursor-pointer hover:opacity-85 transition-opacity"
            title="Click to view event / RSVP"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
              {formData.date || 'UPCOMING EVENT'}
            </span>
            <div className="font-bold text-sm text-slate-900 truncate hover:text-blue-600">
              {data.eventLinkHeadline || formData.title}
            </div>
            <div className="text-xs text-slate-500 truncate font-medium">
              {formData.location || 'Online or Venue'}
            </div>
          </div>

          {/* Interactive RSVP buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                const next = rsvpState === 'interested' ? 'none' : 'interested';
                setRsvpState(next);
                if (next === 'interested') onCopySuccess('Marked as Interested in this event!');
              }}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                rsvpState === 'interested'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${rsvpState === 'interested' ? 'fill-amber-500 text-amber-600' : 'text-slate-400'}`} />
              <span>{rsvpState === 'interested' ? 'Interested' : 'Interested'}</span>
            </button>
            <button
              onClick={() => {
                setRsvpState('going');
                onCTAClick?.();
              }}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                rsvpState === 'going'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{rsvpState === 'going' ? 'Going' : 'Going'}</span>
            </button>
          </div>
        </div>

        {/* Reaction counts */}
        <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 border-b border-slate-100 font-medium">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white">
                👍
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] text-white">
                ❤️
              </span>
            </div>
            <span className="text-slate-700">{likesCount}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>31 comments</span>
            <span>·</span>
            <span>24 shares</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-600">
          <button
            onClick={toggleLike}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 hover:bg-slate-100 transition-colors cursor-pointer ${
              isLiked ? 'text-blue-600' : ''
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-blue-600' : ''}`} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 hover:bg-slate-100 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 hover:bg-slate-100 transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
