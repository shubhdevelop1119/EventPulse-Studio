import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

interface EventPayload {
  title: string;
  description: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  hostOrOrg: string;
  targetAudience: string;
  tone: string;
  callToAction: string;
  keyHighlights: string;
  ticketInfo?: string;
  emojiDensity: 'rich' | 'moderate' | 'minimal';
  includeHashtags: boolean;
  campaignGoal?: string;
}

function buildFallbackCampaign(data: EventPayload) {
  const emojiPrefix = data.emojiDensity === 'minimal' ? '' : data.emojiDensity === 'rich' ? '🔥✨🚀 ' : '✨ ';
  const dateFormatted = data.date || 'Upcoming Date';
  const locationFormatted = data.location || 'Online & In-person';
  const host = data.hostOrOrg || 'Our Team';
  const highlights = data.keyHighlights ? data.keyHighlights.split('\n').filter(Boolean) : ['Exclusive access & networking', 'World-class insights', 'Actionable takeaways'];

  const tagList = [
    `#${data.title.replace(/[^a-zA-Z0-9]/g, '')}`,
    `#${data.eventType.replace(/[^a-zA-Z0-9]/g, '') || 'Event2026'}`,
    '#LiveEvent',
    '#Networking',
    '#MustAttend',
    '#SpecialEvent',
    '#SaveTheDate'
  ];

  return {
    instagram: {
      hook: `${emojiPrefix}BIG ANNOUNCEMENT: ${data.title.toUpperCase()} is officially here!`,
      caption: `${emojiPrefix}${data.title} is officially happening on ${dateFormatted}!\n\n${data.description}\n\n📍 Where: ${locationFormatted}\n🗓️ When: ${dateFormatted} ${data.time ? 'at ' + data.time : ''}\n🎙️ Hosted by: ${host}\n\n✨ Key Highlights:\n${highlights.map(h => `• ${h}`).join('\n')}\n\nSpots are limited to preserve an intimate and high-value experience. Tag a friend who needs to be in the room! 👇\n\n🔗 ${data.callToAction || 'Tap link in bio to secure your ticket'}`,
      hashtags: data.includeHashtags ? [...tagList, '#EventLife', '#ExperienceMore', '#RegisterNow'] : [],
      callToActionText: data.callToAction || 'Link in Bio to Register',
      suggestedImageVisual: `High contrast photo of ${data.title} with glowing bold typography and warm stage lighting.`,
      storyCue: `Share a 15s teaser sticker countdown pointing to the link sticker!`,
    },
    linkedin: {
      hook: `Excited to announce ${data.title}: Where industry leaders and changemakers connect.`,
      caption: `We are thrilled to bring you ${data.title} on ${dateFormatted}.\n\nIn a landscape evolving at lightning speed, gathering in the room with forward-thinking professionals is how real breakthroughs happen.\n\n${data.description}\n\nHere is what we have prepared for you:\n${highlights.map(h => `• ${h}`).join('\n')}\n\n📍 Venue: ${locationFormatted}\n🗓️ Date: ${dateFormatted} ${data.time ? `| ${data.time}` : ''}\n\nWhether you are looking to expand your network, discover actionable frameworks, or gain fresh perspectives, this is the room you want to be in.\n\nReserve your pass today via the link in the comments or register directly at the link below.`,
      bulletPoints: highlights,
      hashtags: data.includeHashtags ? ['#ProfessionalDevelopment', '#Networking', '#Leadership', `#${data.eventType.replace(/[^a-zA-Z0-9]/g, '') || 'Conference'}`] : [],
      callToActionText: data.callToAction || 'Register on LinkedIn / Official Portal',
      professionalTakeaway: 'Tangible industry insights, strategic connections, and forward-looking tools.',
    },
    twitter: {
      primaryTweet: `${emojiPrefix}Mark your calendars: ${data.title} is happening on ${dateFormatted}! 🗓️\n\n${data.description.slice(0, 120)}${data.description.length > 120 ? '...' : ''}\n\n📍 ${locationFormatted}\n🎟️ ${data.callToAction || 'Grab passes now'}:\n👇`,
      threadFollowup: `Why you can't miss it:\n${highlights.slice(0, 3).map((h, i) => `${i + 1}️⃣ ${h}`).join('\n')}\n\nRT to spread the word!`,
      hashtags: data.includeHashtags ? [`#${data.title.replace(/[^a-zA-Z0-9]/g, '')}`, '#SaveTheDate', '#EventAlert'] : [],
      callToActionText: data.callToAction || 'Grab Tickets',
      characterCount: 245,
    },
    facebook: {
      hook: `🎉 Join us for ${data.title} on ${dateFormatted}! You don't want to miss this one.`,
      caption: `Hey everyone! We are so excited to invite you to ${data.title}!\n\n${data.description}\n\nHere are the details:\n📅 Date: ${dateFormatted}\n⏰ Time: ${data.time || 'Check event page'}\n📍 Location: ${locationFormatted}\n👥 Hosted by: ${host}\n\nWhat to expect:\n${highlights.map(h => `✅ ${h}`).join('\n')}\n\nClick "Interested" or "Going" so Facebook reminds you, and invite your friends to come along! We can't wait to see you there.`,
      friendTagPrompt: 'Tag your crew below who should join you for this!',
      hashtags: data.includeHashtags ? ['#CommunityEvent', '#WeekendPlans', '#SpecialOccasion'] : [],
      callToActionText: data.callToAction || 'Click Going & Reserve Spot',
      eventLinkHeadline: `${data.title} - Official Event Registration`,
    },
    brandingAdvice: {
      suggestedAccentColor: '#6366f1',
      vibeKeywords: ['Engaging', 'Memorable', 'Dynamic'],
      bestTimeToPost: 'Tuesday or Thursday at 10:00 AM local time',
    },
  };
}

// POST endpoint to generate social media campaign for events
app.post('/api/generate-posts', async (req: Request, res: Response) => {
  try {
    const data: EventPayload = req.body;

    if (!data.title || !data.description) {
      res.status(400).json({ error: 'Title and description are required.' });
      return;
    }

    if (!ai) {
      // Return rich fallback if API key is not configured
      const fallback = buildFallbackCampaign(data);
      res.json(fallback);
      return;
    }

    const systemPrompt = `You are an elite Social Media Copywriter and Event Marketing Director.
Your task is to take an event's details, description, and tone, and generate tailored, high-converting promotional posts for 4 platforms:
1. Instagram:
   - High visual hook with tasteful emojis.
   - Clean spacing and micro-paragraphs.
   - Highlight key details (Date, Time, Location, Host, Perks).
   - Clear CTA (e.g. Link in Bio, DM for early-bird access).
   - Curated hashtag list: 12 to 18 relevant tags divided into niche, broad, and event tags.
   - Visual suggestion for what image/carousel will stop the scroll.
2. LinkedIn:
   - Compelling professional hook (no cringe, high curiosity).
   - Story/value perspective: Why industry pros, entrepreneurs, or attendees care.
   - 3-4 bullet points highlighting actionable value / takeaways.
   - Professional CTA for tickets or registration link.
   - 3 to 5 targeted professional hashtags.
3. Twitter / X:
   - Snappy, punchy primary tweet within 270 characters.
   - Natural hook, event highlights, location, and link placeholder.
   - Optional 2nd tweet for a thread or highlights.
   - 2 to 3 trending hashtags.
4. Facebook:
   - Friendly, community-oriented and engaging tone.
   - Social trigger to tag friends, colleagues, or RSVP "Going".
   - Clear event breakdown (Date, Time, Venue/Platform, Organizer).
   - 3 to 4 community hashtags.

Tone requested: ${data.tone || 'Exciting and Engaging'}
Emoji density: ${data.emojiDensity || 'moderate'}
Include hashtags: ${data.includeHashtags ? 'YES' : 'NO'}`;

    const userPrompt = `Generate the full social media campaign for this event:
- Event Title: "${data.title}"
- Event Type: "${data.eventType || 'Event'}"
- Description: "${data.description}"
- Date & Time: "${data.date || 'TBA'} ${data.time || ''}"
- Location: "${data.location || 'TBA'}"
- Organizer / Host: "${data.hostOrOrg || 'Event Team'}"
- Target Audience: "${data.targetAudience || 'General Public & Enthusiasts'}"
- Call to Action: "${data.callToAction || 'Register Now'}"
- Key Highlights & Perks: "${data.keyHighlights || 'Inspiring experience, networking, practical insights'}"
- Ticket / Pricing Info: "${data.ticketInfo || 'Available on registration'}"
- Campaign Goal / Stage: "${data.campaignGoal || 'Official Announcement'}"`;

    // Generate with Gemini, with a 6-second timeout fallback to guarantee swift response
    const generateWithTimeout = async () => {
      const apiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              instagram: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING },
                  caption: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  callToActionText: { type: Type.STRING },
                  suggestedImageVisual: { type: Type.STRING },
                  storyCue: { type: Type.STRING },
                },
                required: ['hook', 'caption', 'hashtags', 'callToActionText', 'suggestedImageVisual'],
              },
              linkedin: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING },
                  caption: { type: Type.STRING },
                  bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  callToActionText: { type: Type.STRING },
                  professionalTakeaway: { type: Type.STRING },
                },
                required: ['hook', 'caption', 'bulletPoints', 'hashtags', 'callToActionText'],
              },
              twitter: {
                type: Type.OBJECT,
                properties: {
                  primaryTweet: { type: Type.STRING },
                  threadFollowup: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  callToActionText: { type: Type.STRING },
                  characterCount: { type: Type.INTEGER },
                },
                required: ['primaryTweet', 'hashtags', 'callToActionText'],
              },
              facebook: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING },
                  caption: { type: Type.STRING },
                  friendTagPrompt: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  callToActionText: { type: Type.STRING },
                  eventLinkHeadline: { type: Type.STRING },
                },
                required: ['hook', 'caption', 'hashtags', 'callToActionText'],
              },
              brandingAdvice: {
                type: Type.OBJECT,
                properties: {
                  suggestedAccentColor: { type: Type.STRING },
                  vibeKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  bestTimeToPost: { type: Type.STRING },
                },
                required: ['suggestedAccentColor', 'vibeKeywords', 'bestTimeToPost'],
              },
            },
            required: ['instagram', 'linkedin', 'twitter', 'facebook', 'brandingAdvice'],
          },
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Generation timeout')), 6500)
      );

      return Promise.race([apiPromise, timeoutPromise]);
    };

    const response = await generateWithTimeout();
    const responseText = response.text?.trim() || '{}';
    const parsedData = JSON.parse(responseText);

    res.json(parsedData);
  } catch (err: unknown) {
    console.error('Error generating event posts:', err);
    // Graceful fallback to avoid leaving the user in an error state
    try {
      const fallback = buildFallbackCampaign(req.body);
      res.json(fallback);
    } catch {
      res.status(500).json({ error: 'Failed to generate posts. Please verify input and retry.' });
    }
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(apiKey) });
});

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`EventPulse Studio server running on http://localhost:${PORT}`);
  });
}

startServer();
