import React, { useState } from 'react';
import { Copy, Check, Share2, Download, Edit3, Save, ExternalLink, Hash, CheckCheck } from 'lucide-react';
import { EventFormData, PlatformType } from '../../types/event';
import { downloadBannerImage } from '../../utils/canvasExport';

interface PostActionsBarProps {
  platform: PlatformType;
  caption: string;
  hashtags: string[];
  formData: EventFormData;
  onUpdateCaption: (newCaption: string) => void;
  onCopySuccess: (msg: string) => void;
}

export const PostActionsBar: React.FC<PostActionsBarProps> = ({
  platform,
  caption,
  hashtags,
  formData,
  onUpdateCaption,
  onCopySuccess,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);

  const fullTextWithHashtags = `${caption}\n\n${hashtags.join(' ')}`.trim();

  const handleCopy = async (type: 'all' | 'caption' | 'hashtags') => {
    let textToCopy = fullTextWithHashtags;
    let label = 'Full post + hashtags copied to clipboard! Ready to paste.';

    if (type === 'caption') {
      textToCopy = caption;
      label = 'Caption copied to clipboard!';
    } else if (type === 'hashtags') {
      textToCopy = hashtags.join(' ');
      label = 'Hashtags copied to clipboard!';
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedType(type);
      onCopySuccess(label);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      onCopySuccess('Failed to copy. Please manually select the text.');
    }
  };

  const handleSaveEdit = () => {
    onUpdateCaption(tempCaption);
    setIsEditing(false);
    onCopySuccess('Post updated!');
  };

  const handleWebShare = () => {
    if (platform === 'twitter') {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        fullTextWithHashtags.slice(0, 270)
      )}`;
      window.open(tweetUrl, '_blank', 'noopener,noreferrer');
    } else if (platform === 'linkedin') {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.origin
      )}`;
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    } else if (platform === 'facebook') {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.origin
      )}`;
      window.open(fbUrl, '_blank', 'noopener,noreferrer');
    } else {
      handleCopy('all');
      window.open('https://instagram.com', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
      {/* Edit Drawer */}
      {isEditing && (
        <div className="space-y-2.5 pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-bold text-slate-800">
              Edit {platform.toUpperCase()} Post Copy
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {tempCaption.length} characters
            </span>
          </div>
          <textarea
            value={tempCaption}
            onChange={(e) => setTempCaption(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-hidden leading-relaxed"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setTempCaption(caption);
                setIsEditing(false);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs"
            >
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Main Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Left copy options */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Primary Copy Button */}
          <button
            onClick={() => handleCopy('all')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer ${
              copiedType === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-sm'
            }`}
            title="Copy full post and hashtags ready to paste"
          >
            {copiedType === 'all' ? (
              <>
                <CheckCheck className="h-4 w-4" />
                <span>Copied! Ready to Paste</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Post & Hashtags</span>
              </>
            )}
          </button>

          {/* Secondary: Caption Only */}
          <button
            onClick={() => handleCopy('caption')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors"
            title="Copy caption text only without hashtags"
          >
            {copiedType === 'caption' ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>Caption Only</span>
          </button>

          {/* Quick Edit button */}
          <button
            onClick={() => {
              setTempCaption(caption);
              setIsEditing(!isEditing);
            }}
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors"
            title="Tweak this post"
          >
            <Edit3 className="h-3.5 w-3.5 text-slate-400" />
            <span>Edit Copy</span>
          </button>
        </div>

        {/* Right utility options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadBannerImage(formData, formData.bannerAspectRatio)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
            title="Download graphical event poster PNG"
          >
            <Download className="h-3.5 w-3.5 text-indigo-600" />
            <span>Download Poster PNG</span>
          </button>

          <button
            onClick={handleWebShare}
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
            title={`Open ${platform} website to share`}
          >
            <Share2 className="h-3.5 w-3.5 text-slate-400" />
            <span className="capitalize">{platform === 'twitter' ? 'Open X' : `Open ${platform}`}</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
