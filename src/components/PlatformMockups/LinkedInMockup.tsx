import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal, Globe, Sparkles } from 'lucide-react';
import { EventFormData, GeneratedCampaign } from '../../types/event';
import { EventBannerCard } from '../EventBannerCard';
import { PostActionsBar } from './PostActionsBar';

interface LinkedInMockupProps {
  formData: EventFormData;
  campaign: GeneratedCampaign;
  onUpdateCaption: (newCaption: string) => void;
  onCopySuccess: (msg: string) => void;
  onCTAClick?: () => void;
}

export const LinkedInMockup: React.FC<LinkedInMockupProps> = ({
  formData,
  campaign,
  onUpdateCaption,
  onCopySuccess,
  onCTAClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [reactionCount, setReactionCount] = useState(214);

  const data = campaign.linkedin;
  const authorName = formData.hostOrOrg || 'Leadership & Tech Summit';

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setReactionCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top action bar */}
      <PostActionsBar
        platform="linkedin"
        caption={data.caption}
        hashtags={data.hashtags}
        formData={formData}
        onUpdateCaption={onUpdateCaption}
        onCopySuccess={onCopySuccess}
      />

      {/* Realistic LinkedIn Post Card */}
      <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-indigo-600 text-sm font-bold text-white shadow-xs">
              {authorName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer">
                  {authorName}
                </span>
                <span className="text-xs text-slate-400 font-normal">· 1st</span>
              </div>
              <span className="text-xs text-slate-500 line-clamp-1">
                Official Event Host & Organization
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <span>3h</span>
                <span>·</span>
                <Globe className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-700 p-1">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Post Text */}
        <div className="px-4 pb-3 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2.5">
          <p className="font-semibold text-slate-900">{data.hook}</p>
          <div className="whitespace-pre-line text-slate-800 font-normal leading-relaxed">
            {data.caption}
          </div>

          {/* Hashtags */}
          {data.hashtags && data.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-blue-600 pt-1">
              {data.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Embedded Graphic Banner */}
        <div className="border-t border-b border-slate-200">
          <EventBannerCard formData={formData} interactive={false} onCTAClick={onCTAClick} />
        </div>

        {/* LinkedIn Link Attachment Banner */}
        <div
          onClick={onCTAClick}
          className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 px-4 py-3 text-xs border-b border-slate-200 cursor-pointer transition-colors"
        >
          <div className="space-y-0.5 truncate pr-2">
            <div className="font-bold text-slate-900 truncate">{formData.title}</div>
            <div className="text-[11px] text-slate-500 truncate">
              {formData.date || 'Upcoming'} · {formData.location || 'Online'}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCTAClick?.();
            }}
            className="shrink-0 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            {formData.callToAction || 'Register'}
          </button>
        </div>

        {/* Reactions Counter */}
        <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white">
                👍
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] text-white">
                👏
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] text-white">
                💡
              </span>
            </div>
            <span className="font-medium text-slate-700">{reactionCount}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>42 comments</span>
            <span>·</span>
            <span>18 reposts</span>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-slate-600">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors cursor-pointer ${
              isLiked ? 'text-blue-600 font-bold' : ''
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-blue-600' : ''}`} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors">
            <Repeat2 className="h-4 w-4" />
            <span>Repost</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>

        {/* Strategy tip footer */}
        {data.professionalTakeaway && (
          <div className="border-t border-slate-100 bg-blue-50/60 p-3 text-xs text-slate-700 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-900">LinkedIn Angle:</span>{' '}
              {data.professionalTakeaway}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
