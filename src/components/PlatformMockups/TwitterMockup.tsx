import React, { useState } from 'react';
import { Heart, Repeat2, MessageCircle, Bookmark, Share, Sparkles } from 'lucide-react';
import { EventFormData, GeneratedCampaign } from '../../types/event';
import { EventBannerCard } from '../EventBannerCard';
import { PostActionsBar } from './PostActionsBar';

interface TwitterMockupProps {
  formData: EventFormData;
  campaign: GeneratedCampaign;
  onUpdateCaption: (newCaption: string) => void;
  onCopySuccess: (msg: string) => void;
  onCTAClick?: () => void;
}

export const TwitterMockup: React.FC<TwitterMockupProps> = ({
  formData,
  campaign,
  onUpdateCaption,
  onCopySuccess,
  onCTAClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [likesCount, setLikesCount] = useState(142);
  const [retweetCount, setRetweetCount] = useState(38);

  const data = campaign.twitter;
  const authorName = formData.hostOrOrg || 'EventPulse Live';
  const handle = (authorName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'eventpulse').slice(0, 15);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweetCount((prev) => (isRetweeted ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top action bar */}
      <PostActionsBar
        platform="twitter"
        caption={data.primaryTweet}
        hashtags={data.hashtags}
        formData={formData}
        onUpdateCaption={onUpdateCaption}
        onCopySuccess={onCopySuccess}
      />

      {/* Realistic X (Twitter) Post Card (Crisp Clean Theme) */}
      <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md">
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-xs">
                {authorName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col leading-snug">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">{authorName}</span>
                  {/* Twitter Blue Checkmark */}
                  <svg className="h-4 w-4 text-sky-500 fill-current" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <span>@{handle}</span>
                  <span>·</span>
                  <span>1h</span>
                </div>
              </div>
            </div>

            {/* X Logo */}
            <div className="text-slate-800">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>

          {/* Primary Tweet Text */}
          <div className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-900 whitespace-pre-line font-normal">
            {data.primaryTweet}
          </div>

          {/* Hashtags */}
          {data.hashtags && data.hashtags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5 text-sm text-sky-600 font-semibold">
              {data.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Media: Custom Event Banner */}
          <div className="mt-3.5 overflow-hidden rounded-2xl border border-slate-200">
            <EventBannerCard formData={formData} interactive={false} onCTAClick={onCTAClick} />
          </div>

          {/* Timestamp and Views */}
          <div className="mt-3.5 flex items-center gap-2 border-b border-slate-100 pb-3 text-xs text-slate-500 font-medium">
            <span>2:30 PM · Event Day</span>
            <span>·</span>
            <span className="font-bold text-slate-800">18.4K</span> Views
          </div>

          {/* Metrics */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-2 font-medium">
            <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>28</span>
            </button>
            <button
              onClick={toggleRetweet}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isRetweeted ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'
              }`}
            >
              <Repeat2 className="h-4 w-4" />
              <span>{retweetCount}</span>
            </button>
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500' : ''}`} />
              <span>{likesCount}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
              <Bookmark className="h-4 w-4" />
              <span>45</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
              <Share className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Thread Follow-Up Tweet */}
        {data.threadFollowup && (
          <div className="border-t border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                {authorName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span>@{handle}</span>
                  <span className="text-[11px] font-semibold text-sky-600">(Thread 2/2)</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                  {data.threadFollowup}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
