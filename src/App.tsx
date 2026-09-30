/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Share2,
  Calendar,
  CheckCircle2,
  Bookmark,
  RefreshCw,
  Sliders,
  Palette,
  Eye,
  Compass,
  Zap,
  Copy,
  Info,
} from 'lucide-react';
import {
  EventFormData,
  GeneratedCampaign,
  PlatformType,
  SavedEventItem,
} from './types/event';
import { generateEventCampaignLocally } from './utils/fallbackGenerator';
import { Header } from './components/Header';
import { EventForm } from './components/EventForm';
import { EventBannerCard } from './components/EventBannerCard';
import { InstagramMockup } from './components/PlatformMockups/InstagramMockup';
import { LinkedInMockup } from './components/PlatformMockups/LinkedInMockup';
import { TwitterMockup } from './components/PlatformMockups/TwitterMockup';
import { FacebookMockup } from './components/PlatformMockups/FacebookMockup';
import { HistoryModal } from './components/HistoryModal';
import { RSVPModal } from './components/RSVPModal';
import { Toast } from './components/Toast';

const PRESETS: Record<string, Partial<EventFormData>> = {
  tech_summit: {
    title: 'Global AI & Robotics Summit 2026',
    description:
      'Join 1,200+ founders, machine learning researchers, and engineers as we unveil the next decade of autonomous intelligence, frontier models, and robotics breakthrough systems.',
    eventType: 'Tech Conference & Summit',
    date: 'Nov 12, 2026',
    time: '9:00 AM - 5:30 PM PST',
    location: 'Palace of Fine Arts, San Francisco & Virtual Livestream',
    hostOrOrg: 'Frontier AI Labs',
    targetAudience: 'Engineers, AI Researchers, Tech Founders & Product Leaders',
    tone: 'Inspiring & Visionary',
    callToAction: 'Claim Early Bird Pass',
    keyHighlights:
      'Keynotes from top AI research directors\nHands-on robotics demo arena\nVIP investor & founder networking cocktail',
    ticketInfo: 'Early Bird $199 · Virtual Free',
    emojiDensity: 'moderate',
    includeHashtags: true,
    campaignGoal: 'Official Announcement',
    fontFamily: 'Space Grotesk',
    fontColor: '#ffffff',
    accentColor: '#4f46e5',
    bannerTheme: 'midnight',
    bannerAspectRatio: '1:1',
    showHostBadge: true,
    showDatePill: true,
  },
  workshop: {
    title: 'Design Systems & Micro-Interactions Masterclass',
    description:
      'An intensive, hands-on masterclass taking you from foundational design tokens to building high-conversion, buttery-smooth interactive interfaces with motion and modern typography.',
    eventType: 'Workshop & Masterclass',
    date: 'Oct 18, 2026',
    time: '11:00 AM - 3:00 PM EST',
    location: 'Interactive Figma & Zoom Lab',
    hostOrOrg: 'Studio Craft Collective',
    targetAudience: 'UI/UX Designers, Frontend Engineers & Creative Directors',
    tone: 'Professional & Insightful',
    callToAction: 'Reserve Workshop Seat',
    keyHighlights:
      'Complete production-ready Figma component kit\nLive code-along with React & Tailwind\n1-on-1 portfolio & system teardown',
    ticketInfo: 'Limited to 50 Attendees',
    emojiDensity: 'moderate',
    includeHashtags: true,
    campaignGoal: 'Limited Seat Alert',
    fontFamily: 'Plus Jakarta Sans',
    fontColor: '#ffffff',
    accentColor: '#059669',
    bannerTheme: 'emerald',
    bannerAspectRatio: '1:1',
    showHostBadge: true,
    showDatePill: true,
  },
  music_fest: {
    title: 'Neon Horizon: Sunset Electronic & Acoustic Festival',
    description:
      'Experience 2 stages of live indie electronic, acoustic ambient sets, artisanal food trucks, and hypnotic visual art installations under the twilight sky.',
    eventType: 'Live Concert & Music',
    date: 'Aug 22, 2026',
    time: '4:00 PM - Midnight',
    location: 'Pier 70 Open Air Amphitheater, Bayfront',
    hostOrOrg: 'Pulse Records & Nightwave',
    targetAudience: 'Music enthusiasts, festival-goers, creative night owls',
    tone: 'High Energy & Viral',
    callToAction: 'Get Festival Passes',
    keyHighlights:
      '8 headline artists across 2 stages\nArtisan food truck village & craft cocktails\nImmersive laser & spatial sound experience',
    ticketInfo: 'Tier 1 Tickets Now Live',
    emojiDensity: 'rich',
    includeHashtags: true,
    campaignGoal: 'Hype Drop',
    fontFamily: 'Syne',
    fontColor: '#fef08a',
    accentColor: '#db2777',
    bannerTheme: 'sunset',
    bannerAspectRatio: '1:1',
    showHostBadge: true,
    showDatePill: true,
  },
};

const DEFAULT_EVENT: EventFormData = {
  title: 'NextGen AI & Creator Summit 2026',
  description:
    'A premier one-day gathering for creators, founders, and engineers to explore the cutting edge of generative media, autonomous agents, and digital brand building.',
  eventType: 'Tech Conference & Summit',
  date: 'Nov 14, 2026',
  time: '10:00 AM PST',
  location: 'Metreon Pavilion, San Francisco & Online',
  hostOrOrg: 'EventPulse & Innovation Hub',
  targetAudience: 'Creators, Tech Innovators, Founders',
  tone: 'High Energy & Viral',
  callToAction: 'Register for Free Passes',
  keyHighlights:
    '15+ world-class keynote speakers\nLive interactive product showcases\nVIP networking lounge & catered lunch',
  ticketInfo: 'General Admission: Free RSVP',
  emojiDensity: 'rich',
  includeHashtags: true,
  campaignGoal: 'Official Announcement',
  fontFamily: 'Plus Jakarta Sans',
  fontColor: '#ffffff',
  accentColor: '#4f46e5',
  bannerTheme: 'midnight',
  customBgColor1: '#0f172a',
  customBgColor2: '#312e81',
  bannerAspectRatio: '1:1',
  showHostBadge: true,
  showDatePill: true,
  tagline: '',
};

export default function App() {
  const [formData, setFormData] = useState<EventFormData>(DEFAULT_EVENT);
  const [campaign, setCampaign] = useState<GeneratedCampaign | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('instagram');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<SavedEventItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  const handleOpenRSVP = () => {
    setIsRSVPOpen(true);
  };

  // Load saved campaigns from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('eventpulse_campaigns');
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Save campaigns to localStorage
  const saveToHistory = (newCampaign: GeneratedCampaign, currentForm: EventFormData) => {
    const item: SavedEventItem = {
      id: `camp_${Date.now()}`,
      title: currentForm.title,
      date: currentForm.date,
      createdAt: Date.now(),
      formData: currentForm,
      campaign: newCampaign,
    };
    const updated = [item, ...savedItems.slice(0, 19)];
    setSavedItems(updated);
    try {
      localStorage.setItem('eventpulse_campaigns', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter((item) => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem('eventpulse_campaigns', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    setToastMessage('Campaign removed from history');
  };

  const handleLoadSavedItem = (item: SavedEventItem) => {
    setFormData(item.formData);
    setCampaign(item.campaign);
    setToastMessage(`Loaded "${item.title}"`);
  };

  // Preset loader
  const handleLoadPreset = (key: string) => {
    if (PRESETS[key]) {
      setFormData((prev) => ({
        ...prev,
        ...PRESETS[key],
      }));
      setToastMessage(`Loaded sample: ${PRESETS[key].title}`);
    }
  };

  const handleResetForm = () => {
    setFormData({
      ...DEFAULT_EVENT,
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      hostOrOrg: '',
      keyHighlights: '',
    });
    setCampaign(null);
    setToastMessage('Form cleared');
  };

  // Generate Campaign via Backend API with client-side fallback
  const handleGenerate = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setToastMessage('Please enter an event title and description');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data: GeneratedCampaign = await res.json();
      setCampaign(data);
      saveToHistory(data, formData);
      setToastMessage('🎉 Multi-platform posts generated successfully!');
    } catch (err) {
      console.warn('Backend generation fallback activated:', err);
      const fallbackData = generateEventCampaignLocally(formData);
      setCampaign(fallbackData);
      saveToHistory(fallbackData, formData);
      setToastMessage('🎉 Posts generated successfully!');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial auto-generation on first load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCaption = (platform: PlatformType, newCaption: string) => {
    if (!campaign) return;
    setCampaign({
      ...campaign,
      [platform]: {
        ...campaign[platform],
        caption: newCaption,
        ...(platform === 'twitter' ? { primaryTweet: newCaption } : {}),
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        onLoadPreset={handleLoadPreset}
        savedCount={savedItems.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleResetForm}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 py-6 md:px-6 lg:px-8 space-y-6">
        {/* Intro Subtitle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
              Social Media Event Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enter your event brief once, customize font & colors, and preview platform-ready posts for Instagram, LinkedIn, X, and Facebook.
            </p>
          </div>

          {/* Quick Helper Badges */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 Platforms Ready</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600">1-Click Copy</span>
          </div>
        </div>

        {/* 2-Column Split: Input Form (Left) & Platform Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Input Form & Brand Customization (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <EventForm
              formData={formData}
              onChange={(updated) => setFormData((prev) => ({ ...prev, ...updated }))}
              onSubmit={handleGenerate}
              isLoading={isLoading}
              onLoadPreset={handleLoadPreset}
            />

            {/* Live Graphic Banner Card Preview Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-indigo-600" />
                  <span>Live Poster Banner Preview</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Font: <strong className="text-slate-800">{formData.fontFamily}</strong>
                </span>
              </div>
              <EventBannerCard formData={formData} interactive={true} onCTAClick={handleOpenRSVP} />
              <p className="text-[11px] text-slate-500 text-center font-medium">
                Tip: Click the CTA button to test event registration, or hover to download high-res poster!
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Multi-Platform Post Showcase (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Platform Selector Tabs */}
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="flex items-center justify-between gap-1 overflow-x-auto">
                {(
                  [
                    {
                      id: 'instagram' as PlatformType,
                      name: 'Instagram',
                      icon: '📸',
                      activeStyle: 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs',
                    },
                    {
                      id: 'linkedin' as PlatformType,
                      name: 'LinkedIn',
                      icon: '💼',
                      activeStyle: 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs',
                    },
                    {
                      id: 'twitter' as PlatformType,
                      name: 'Twitter (X)',
                      icon: '🐦',
                      activeStyle: 'bg-slate-100 text-slate-900 border-slate-300 shadow-xs',
                    },
                    {
                      id: 'facebook' as PlatformType,
                      name: 'Facebook',
                      icon: '👥',
                      activeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs',
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedPlatform(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedPlatform === tab.id
                        ? tab.activeStyle
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-base">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Platform Post Content & Mockup */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-3 border-indigo-100 border-t-indigo-600 animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-indigo-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Crafting {selectedPlatform.toUpperCase()} Strategy & Posts...
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm font-medium">
                    Structuring compelling hooks, body value, perks, and curated hashtags based on your event brief.
                  </p>
                </div>
              </div>
            ) : campaign ? (
              <div className="space-y-5">
                {/* Active Platform Mockup */}
                {selectedPlatform === 'instagram' && (
                  <InstagramMockup
                    formData={formData}
                    campaign={campaign}
                    onUpdateCaption={(txt) => updateCaption('instagram', txt)}
                    onCopySuccess={(msg) => setToastMessage(msg)}
                    onCTAClick={handleOpenRSVP}
                  />
                )}

                {selectedPlatform === 'linkedin' && (
                  <LinkedInMockup
                    formData={formData}
                    campaign={campaign}
                    onUpdateCaption={(txt) => updateCaption('linkedin', txt)}
                    onCopySuccess={(msg) => setToastMessage(msg)}
                    onCTAClick={handleOpenRSVP}
                  />
                )}

                {selectedPlatform === 'twitter' && (
                  <TwitterMockup
                    formData={formData}
                    campaign={campaign}
                    onUpdateCaption={(txt) => updateCaption('twitter', txt)}
                    onCopySuccess={(msg) => setToastMessage(msg)}
                    onCTAClick={handleOpenRSVP}
                  />
                )}

                {selectedPlatform === 'facebook' && (
                  <FacebookMockup
                    formData={formData}
                    campaign={campaign}
                    onUpdateCaption={(txt) => updateCaption('facebook', txt)}
                    onCopySuccess={(msg) => setToastMessage(msg)}
                    onCTAClick={handleOpenRSVP}
                  />
                )}

                {/* Campaign Strategy Card */}
                {campaign.brandingAdvice && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Compass className="h-4 w-4 text-indigo-600" />
                        <span>Recommended Publishing Time & Mood Vibe</span>
                      </span>
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                        Marketing Insight
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500">
                          Best Time to Publish:
                        </span>
                        <div className="font-semibold text-slate-900">
                          {campaign.brandingAdvice.bestTimeToPost}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500">
                          Resonating Mood Keywords:
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {campaign.brandingAdvice.vibeKeywords.map((kw, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-indigo-700 border border-slate-200 shadow-2xs"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3 shadow-xs">
                <Sparkles className="h-8 w-8 text-indigo-500" />
                <h4 className="text-base font-bold text-slate-900">
                  Ready to Generate Your Social Posts
                </h4>
                <p className="text-xs text-slate-500 max-w-sm font-medium">
                  Click "Generate Social Media Posts" to immediately see tailored posts for Instagram, LinkedIn, X, and Facebook.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedItems={savedItems}
        onSelect={handleLoadSavedItem}
        onDelete={handleDeleteSaved}
      />

      {/* RSVP / Registration Ticket Modal */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        formData={formData}
        onSuccessToast={(msg) => setToastMessage(msg)}
      />

      {/* Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
