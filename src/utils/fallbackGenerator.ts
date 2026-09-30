import { EventFormData, GeneratedCampaign } from '../types/event';

export function generateEventCampaignLocally(data: EventFormData): GeneratedCampaign {
  const emojiPrefix =
    data.emojiDensity === 'minimal'
      ? ''
      : data.emojiDensity === 'rich'
      ? '🔥✨🚀 '
      : '✨ ';
  const dateFormatted = data.date || 'Upcoming Date';
  const locationFormatted = data.location || 'Online & In-person';
  const host = data.hostOrOrg || 'Our Team';
  const highlights = data.keyHighlights
    ? data.keyHighlights.split('\n').filter(Boolean)
    : [
        'Exclusive access & networking opportunities',
        'Key insights & actionable takeaways',
        'Interactive showcases with industry peers',
      ];

  const tagList = [
    `#${(data.title || 'Event').replace(/[^a-zA-Z0-9]/g, '')}`,
    `#${(data.eventType || 'SpecialEvent').replace(/[^a-zA-Z0-9]/g, '')}`,
    '#LiveEvent',
    '#Networking',
    '#MustAttend',
    '#SaveTheDate',
  ];

  return {
    instagram: {
      hook: `${emojiPrefix}BIG ANNOUNCEMENT: ${data.title.toUpperCase()} is officially here!`,
      caption: `${emojiPrefix}${data.title} is officially happening on ${dateFormatted}!\n\n${data.description}\n\n📍 Where: ${locationFormatted}\n🗓️ When: ${dateFormatted} ${data.time ? 'at ' + data.time : ''}\n🎙️ Hosted by: ${host}\n\n✨ Key Highlights:\n${highlights.map((h) => `• ${h}`).join('\n')}\n\nSpots are limited to preserve an intimate and high-value experience. Tag a friend who needs to be in the room! 👇\n\n🔗 ${data.callToAction || 'Tap link in bio to secure your ticket'}`,
      hashtags: data.includeHashtags
        ? [...tagList, '#EventLife', '#ExperienceMore', '#RegisterNow']
        : [],
      callToActionText: data.callToAction || 'Link in Bio to Register',
      suggestedImageVisual: `High contrast photo of ${data.title} with glowing bold typography and warm stage lighting.`,
      storyCue: `Share a 15s teaser sticker countdown pointing to the link sticker!`,
    },
    linkedin: {
      hook: `Excited to announce ${data.title}: Where industry leaders and changemakers connect.`,
      caption: `We are thrilled to bring you ${data.title} on ${dateFormatted}.\n\nIn a landscape evolving at lightning speed, gathering in the room with forward-thinking professionals is how real breakthroughs happen.\n\n${data.description}\n\nHere is what we have prepared for you:\n${highlights.map((h) => `• ${h}`).join('\n')}\n\n📍 Venue: ${locationFormatted}\n🗓️ Date: ${dateFormatted} ${data.time ? `| ${data.time}` : ''}\n\nWhether you are looking to expand your network, discover actionable frameworks, or gain fresh perspectives, this is the room you want to be in.\n\nReserve your pass today via the link in the comments or register directly at the link below.`,
      bulletPoints: highlights,
      hashtags: data.includeHashtags
        ? [
            '#ProfessionalDevelopment',
            '#Networking',
            '#Leadership',
            `#${(data.eventType || 'Conference').replace(/[^a-zA-Z0-9]/g, '')}`,
          ]
        : [],
      callToActionText: data.callToAction || 'Register on LinkedIn / Official Portal',
      professionalTakeaway:
        'Tangible industry insights, strategic connections, and forward-looking tools.',
    },
    twitter: {
      primaryTweet: `${emojiPrefix}Mark your calendars: ${data.title} is happening on ${dateFormatted}! 🗓️\n\n${data.description.slice(0, 120)}${data.description.length > 120 ? '...' : ''}\n\n📍 ${locationFormatted}\n🎟️ ${data.callToAction || 'Grab passes now'}:\n👇`,
      threadFollowup: `Why you can't miss it:\n${highlights.slice(0, 3).map((h, i) => `${i + 1}️⃣ ${h}`).join('\n')}\n\nRT to spread the word!`,
      hashtags: data.includeHashtags
        ? [
            `#${(data.title || 'Event').replace(/[^a-zA-Z0-9]/g, '')}`,
            '#SaveTheDate',
            '#EventAlert',
          ]
        : [],
      callToActionText: data.callToAction || 'Grab Tickets',
      characterCount: 245,
    },
    facebook: {
      hook: `🎉 Join us for ${data.title} on ${dateFormatted}! You don't want to miss this one.`,
      caption: `Hey everyone! We are so excited to invite you to ${data.title}!\n\n${data.description}\n\nHere are the details:\n📅 Date: ${dateFormatted}\n⏰ Time: ${data.time || 'Check event page'}\n📍 Location: ${locationFormatted}\n👥 Hosted by: ${host}\n\nWhat to expect:\n${highlights.map((h) => `✅ ${h}`).join('\n')}\n\nClick "Interested" or "Going" so Facebook reminds you, and invite your friends to come along! We can't wait to see you there.`,
      friendTagPrompt: 'Tag your crew below who should join you for this!',
      hashtags: data.includeHashtags
        ? ['#CommunityEvent', '#WeekendPlans', '#SpecialOccasion']
        : [],
      callToActionText: data.callToAction || 'Click Going & Reserve Spot',
      eventLinkHeadline: `${data.title} - Official Event Registration`,
    },
    brandingAdvice: {
      suggestedAccentColor: data.accentColor || '#6366f1',
      vibeKeywords: ['Engaging', 'Memorable', 'Dynamic'],
      bestTimeToPost: 'Tuesday or Thursday at 10:00 AM local time',
    },
  };
}
