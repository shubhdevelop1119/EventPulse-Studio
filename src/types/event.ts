export type PlatformType = 'instagram' | 'linkedin' | 'twitter' | 'facebook';

export type EventTone = 
  | 'High Energy & Viral' 
  | 'Professional & Insightful' 
  | 'Casual & Community' 
  | 'Urgent / Last Chance FOMO' 
  | 'Inspiring & Visionary';

export type FontFamilyOption = 
  | 'Plus Jakarta Sans'
  | 'Playfair Display'
  | 'Montserrat'
  | 'Space Grotesk'
  | 'Syne'
  | 'JetBrains Mono'
  | 'Inter'
  | 'Oswald'
  | 'Outfit'
  | 'Cinzel'
  | 'Bebas Neue'
  | 'Poppins'
  | 'Raleway'
  | 'Lora';

export type BannerTheme = 
  | 'midnight' 
  | 'sunset' 
  | 'emerald' 
  | 'indigo' 
  | 'violet' 
  | 'titanium'
  | 'custom';

export type BannerAspectRatio = '1:1' | '16:9' | '9:16';

export interface EventFormData {
  title: string;
  description: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  hostOrOrg: string;
  targetAudience: string;
  tone: EventTone;
  callToAction: string;
  eventLinkUrl?: string;
  keyHighlights: string;
  ticketInfo: string;
  emojiDensity: 'rich' | 'moderate' | 'minimal';
  includeHashtags: boolean;
  campaignGoal: string;
  
  // Customization: Font, Colors & Styling
  fontFamily: FontFamilyOption;
  fontColor: string;
  accentColor: string;
  bannerTheme: BannerTheme;
  customBgColor1: string;
  customBgColor2: string;
  bannerAspectRatio: BannerAspectRatio;
  showHostBadge: boolean;
  showDatePill: boolean;
  tagline: string;
}

export interface GeneratedCampaign {
  instagram: {
    hook: string;
    caption: string;
    hashtags: string[];
    callToActionText: string;
    suggestedImageVisual: string;
    storyCue?: string;
  };
  linkedin: {
    hook: string;
    caption: string;
    bulletPoints: string[];
    hashtags: string[];
    callToActionText: string;
    professionalTakeaway: string;
  };
  twitter: {
    primaryTweet: string;
    threadFollowup?: string;
    hashtags: string[];
    callToActionText: string;
    characterCount?: number;
  };
  facebook: {
    hook: string;
    caption: string;
    friendTagPrompt: string;
    hashtags: string[];
    callToActionText: string;
    eventLinkHeadline: string;
  };
  brandingAdvice?: {
    suggestedAccentColor: string;
    vibeKeywords: string[];
    bestTimeToPost: string;
  };
  createdAt?: number;
  id?: string;
}

export interface SavedEventItem {
  id: string;
  title: string;
  date: string;
  createdAt: number;
  formData: EventFormData;
  campaign: GeneratedCampaign;
}
