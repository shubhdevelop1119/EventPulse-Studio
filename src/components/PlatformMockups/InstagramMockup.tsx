import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles, Check } from 'lucide-react';
import { EventFormData, GeneratedCampaign } from '../../types/event';
import { EventBannerCard } from '../EventBannerCard';
import { PostActionsBar } from './PostActionsBar';

interface InstagramMockupProps {
  formData: EventFormData;
  campaign: GeneratedCampaign;
  onUpdateCaption: (newCaption: string) => void;
  onCopySuccess: (msg: string) => void;
  onCTAClick?: () => void;
}

export const InstagramMockup: React.FC<InstagramMockupProps> = ({
  formData,
  campaign,
  onUpdateCaption,
  onCopySuccess,
  onCTAClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(384);
  const [isExpanded, setIsExpanded] = useState(false);

  const data = campaign.instagram;
  const username = (formData.hostOrOrg || 'eventpulse.official')
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .slice(0, 20) || 'eventpulse.live';

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top action bar with 1-click copy */}
      <PostActionsBar
        platform="instagram"
        caption={data.caption}
        hashtags={data.hashtags}
        formData={formData}
        onUpdateCaption={onUpdateCaption}
        onCopySuccess={onCopySuccess}
      />

      {/* Realistic Instagram Feed Container (Clean Crisp Mode) */}
      <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md">
        {/* Instagram Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Story Gradient Ring */}
            <div className="rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 p-[2px]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-800 uppercase shadow-xs">
                {username.slice(0, 2)}
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">{username}</span>
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sky-500 text-[8px] font-bold text-white">
                  ✓
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                {formData.location || 'Special Event'}
              </span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Media: Custom Event Banner */}
        <div className="relative w-full bg-slate-900">
          <EventBannerCard formData={formData} interactive={false} onCTAClick={onCTAClick} />
        </div>

        {/* Instagram Actions Bar */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLike}
                className="transition-transform active:scale-125 cursor-pointer"
                title="Like"
              >
                <Heart
                  className={`h-6 w-6 transition-colors ${
                    isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-800 hover:text-slate-500'
                  }`}
                />
              </button>
              <button className="text-slate-800 hover:text-slate-500" title="Comment">
                <MessageCircle className="h-6 w-6" />
              </button>
              <button className="text-slate-800 hover:text-slate-500" title="Share">
                <Send className="h-6 w-6 -rotate-12" />
              </button>
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="transition-transform active:scale-110 cursor-pointer"
              title="Save Post"
            >
              <Bookmark
                className={`h-6 w-6 transition-colors ${
                  isSaved ? 'fill-slate-900 text-slate-900' : 'text-slate-800 hover:text-slate-500'
                }`}
              />
            </button>
          </div>

          {/* Likes count */}
          <div className="mt-2 text-xs font-bold text-slate-900">
            {likesCount.toLocaleString()} likes
          </div>

          {/* Caption */}
          <div className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-800 font-normal">
            <span className="font-bold text-slate-950 mr-1.5">{username}</span>
            <div className="inline">
              {isExpanded ? (
                <div className="whitespace-pre-line mt-1 text-slate-800 leading-relaxed font-normal">
                  {data.caption}
                </div>
              ) : (
                <>
                  <span>{data.caption.slice(0, 115)}...</span>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="ml-1.5 font-semibold text-slate-500 hover:text-slate-800"
                  >
                    more
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Hashtags */}
          {data.hashtags && data.hashtags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs font-semibold text-indigo-600">
              {data.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className="mt-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            2 HOURS AGO · SEE TRANSLATION
          </div>

          {/* Comment row */}
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                U
              </div>
              <span>Add a comment...</span>
            </div>
            <span className="font-bold text-indigo-600 cursor-pointer text-xs">
              Post
            </span>
          </div>
        </div>

        {/* Tip footer */}
        {data.suggestedImageVisual && (
          <div className="border-t border-slate-100 bg-indigo-50/60 p-3 text-xs text-slate-700 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-indigo-900">Instagram Tip:</span>{' '}
              {data.suggestedImageVisual}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
