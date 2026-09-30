import { EventFormData } from '../types/event';

export function renderBannerToCanvas(
  formData: EventFormData,
  width: number = 1080,
  height: number = 1080
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient setup
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  switch (formData.bannerTheme) {
    case 'sunset':
      bgGrad.addColorStop(0, '#31102f');
      bgGrad.addColorStop(0.5, '#701a75');
      bgGrad.addColorStop(1, '#f43f5e');
      break;
    case 'emerald':
      bgGrad.addColorStop(0, '#022c22');
      bgGrad.addColorStop(0.6, '#064e3b');
      bgGrad.addColorStop(1, '#059669');
      break;
    case 'indigo':
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.5, '#1e1b4b');
      bgGrad.addColorStop(1, '#3730a3');
      break;
    case 'violet':
      bgGrad.addColorStop(0, '#18022b');
      bgGrad.addColorStop(0.5, '#4c1d95');
      bgGrad.addColorStop(1, '#7c3aed');
      break;
    case 'titanium':
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(0.5, '#e2e8f0');
      bgGrad.addColorStop(1, '#cbd5e1');
      break;
    case 'custom':
      bgGrad.addColorStop(0, formData.customBgColor1 || '#0f172a');
      bgGrad.addColorStop(1, formData.customBgColor2 || '#312e81');
      break;
    case 'midnight':
    default:
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#111827');
      bgGrad.addColorStop(1, '#1e1b4b');
      break;
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative ambient glow circles
  const glowGrad = ctx.createRadialGradient(
    width * 0.8,
    height * 0.2,
    10,
    width * 0.8,
    height * 0.2,
    width * 0.6
  );
  glowGrad.addColorStop(0, `${formData.accentColor}33`);
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft geometric border grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Top category badge
  const categoryText = (formData.eventType || 'SPECIAL EVENT').toUpperCase();
  ctx.font = `600 ${Math.round(width * 0.026)}px "${formData.fontFamily}", sans-serif`;
  ctx.fillStyle = formData.accentColor || '#6366f1';
  ctx.fillText(`• ${categoryText}`, 80, 110);

  if (formData.showHostBadge && formData.hostOrOrg) {
    ctx.textAlign = 'right';
    ctx.font = `500 ${Math.round(width * 0.024)}px "${formData.fontFamily}", sans-serif`;
    ctx.fillStyle = formData.bannerTheme === 'titanium' ? '#475569' : 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`Presented by ${formData.hostOrOrg}`, width - 80, 110);
    ctx.textAlign = 'left';
  }

  // Event Title (Auto-wrapped)
  const title = formData.title || 'Your Event Name';
  const titleFontSize = Math.round(width * 0.065);
  ctx.font = `700 ${titleFontSize}px "${formData.fontFamily}", sans-serif`;
  ctx.fillStyle = formData.fontColor || '#ffffff';

  const maxLineWidth = width - 160;
  const words = title.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxLineWidth && i > 0) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let currentY = height * 0.32;
  const lineHeight = titleFontSize * 1.25;
  for (const line of lines) {
    ctx.fillText(line, 80, currentY);
    currentY += lineHeight;
  }

  // Accent divider line
  currentY += 20;
  ctx.fillStyle = formData.accentColor || '#6366f1';
  ctx.fillRect(80, currentY, 120, 6);
  currentY += 40;

  // Short description snippet
  if (formData.description) {
    const descFontSize = Math.round(width * 0.032);
    ctx.font = `400 ${descFontSize}px "${formData.fontFamily}", sans-serif`;
    ctx.fillStyle = formData.bannerTheme === 'titanium' ? '#334155' : 'rgba(255, 255, 255, 0.85)';
    
    const descWords = formData.description.split(' ');
    let descLine = '';
    const descLines: string[] = [];
    for (let i = 0; i < descWords.length; i++) {
      const test = descLine ? `${descLine} ${descWords[i]}` : descWords[i];
      if (ctx.measureText(test).width > maxLineWidth && i > 0) {
        descLines.push(descLine);
        descLine = descWords[i];
        if (descLines.length >= 3) break;
      } else {
        descLine = test;
      }
    }
    if (descLine && descLines.length < 3) descLines.push(descLine);

    for (const dline of descLines) {
      ctx.fillText(dline, 80, currentY);
      currentY += descFontSize * 1.5;
    }
  }

  // Bottom Info Strip (Date, Time, Venue, CTA)
  const bottomBoxY = height - 200;
  ctx.fillStyle = formData.bannerTheme === 'titanium' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)';
  ctx.beginPath();
  ctx.roundRect(80, bottomBoxY, width - 160, 120, 16);
  ctx.fill();

  // Date and Time
  const dateStr = formData.date ? `🗓️ ${formData.date}${formData.time ? ` · ${formData.time}` : ''}` : '🗓️ Date & Time TBA';
  const locStr = formData.location ? `📍 ${formData.location}` : '📍 Venue TBA';

  ctx.font = `600 ${Math.round(width * 0.028)}px "${formData.fontFamily}", sans-serif`;
  ctx.fillStyle = formData.fontColor || '#ffffff';
  ctx.fillText(dateStr, 110, bottomBoxY + 50);

  ctx.font = `400 ${Math.round(width * 0.024)}px "${formData.fontFamily}", sans-serif`;
  ctx.fillStyle = formData.bannerTheme === 'titanium' ? '#64748b' : 'rgba(255, 255, 255, 0.7)';
  ctx.fillText(locStr, 110, bottomBoxY + 90);

  // Call to Action Pill Button on right
  const ctaText = (formData.callToAction || 'REGISTER NOW').toUpperCase();
  ctx.font = `700 ${Math.round(width * 0.024)}px "${formData.fontFamily}", sans-serif`;
  const ctaWidth = ctx.measureText(ctaText).width + 50;
  const ctaX = width - 110 - ctaWidth;
  const ctaY = bottomBoxY + 36;

  ctx.fillStyle = formData.accentColor || '#6366f1';
  ctx.beginPath();
  ctx.roundRect(ctaX, ctaY, ctaWidth, 52, 10);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillText(ctaText, ctaX + 25, ctaY + 34);

  return canvas;
}

export function downloadBannerImage(
  formData: EventFormData,
  aspectRatio: '1:1' | '16:9' | '9:16' = '1:1'
) {
  let w = 1080;
  let h = 1080;
  if (aspectRatio === '16:9') {
    w = 1200;
    h = 675;
  } else if (aspectRatio === '9:16') {
    w = 1080;
    h = 1920;
  }

  const canvas = renderBannerToCanvas(formData, w, h);
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const cleanTitle = (formData.title || 'event-banner')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
  link.download = `${cleanTitle}-${aspectRatio}.png`;
  link.href = dataUrl;
  link.click();
}
