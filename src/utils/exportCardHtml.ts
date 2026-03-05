// SVG icons as inline SVGs for the exported HTML (no external dependencies)
const svgIcons: Record<string, string> = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`,
  message: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`,
  link: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
};

function getIcon(iconId: string, color: string): string {
  const svg = svgIcons[iconId];
  if (!svg) return '';
  return svg.replace(/currentColor/g, color);
}

interface CardData {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  accentColor: string;
  frontColor: string;
  headingColor: string;
  textColor: string;
  baseColor: string;
  qualification: string;
  experience: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  photoShape: 'circle' | 'square' | 'rounded';
  extraFieldsFront: { label: string; value: string; icon?: string; link?: string }[];
  extraFieldsBack: { label: string; value: string; icon?: string; link?: string }[];
  layoutType: 'modern' | 'minimal' | 'classic';
  textAlign: 'left' | 'center' | 'right';
  textAlignBack: 'left' | 'center' | 'right';
  fontFamily: string;
  textScale: number;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function exportCardAsHtml(data: CardData): void {
  const initials = data.name.split(' ').filter(Boolean).map(n => n[0]).join('');

  const frontExtraFieldsHtml = data.extraFieldsFront.map(f => {
    const icon = f.icon ? getIcon(f.icon, data.textColor) : '';
    const label = f.label ? `<span class="field-label">${f.label.toUpperCase()}:</span> ` : '';
    const content = `<span class="field-value">${label}${f.value}</span>`;
    if (f.link) {
      return `<div class="contact-item"><span class="contact-icon">${icon}</span><a href="${f.link.startsWith('http') ? f.link : 'https://' + f.link}" target="_blank" rel="noopener">${content}</a></div>`;
    }
    return `<div class="contact-item">${icon ? `<span class="contact-icon">${icon}</span>` : ''}${content}</div>`;
  }).join('\n');

  const backExtraFieldsHtml = data.extraFieldsBack.map(f => {
    const icon = f.icon ? getIcon(f.icon, data.headingColor) : '';
    const content = `
      <div class="back-field">
        <div class="back-field-label">${icon} ${f.label.toUpperCase()}</div>
        <div class="back-field-value">${f.value}</div>
      </div>`;
    if (f.link) {
      return `<a href="${f.link.startsWith('http') ? f.link : 'https://' + f.link}" target="_blank" rel="noopener" class="back-field-link">${content}</a>`;
    }
    return content;
  }).join('\n');

  const photoHtml = data.photoUrl ? `
    <div class="photo-container photo-${data.photoShape}">
      <img src="${data.photoUrl}" alt="${data.name}" class="photo" />
    </div>` : '';

  const socialFrontHtml = (data.linkedin || data.github) ? `
    <div class="social-bar">
      ${data.linkedin ? `<a href="https://linkedin.com/in/${data.linkedin}" target="_blank" rel="noopener" class="social-item">
        ${getIcon('linkedin', data.accentColor)}
        <span>${data.linkedin}</span>
      </a>` : ''}
      ${data.github ? `<a href="https://github.com/${data.github}" target="_blank" rel="noopener" class="social-item">
        ${getIcon('github', data.accentColor)}
        <span>${data.github}</span>
      </a>` : ''}
    </div>` : '';

  const socialBackHtml = (data.linkedin || data.github) ? `
    <div class="social-bar-back">
      ${data.linkedin ? `<a href="https://linkedin.com/in/${data.linkedin}" target="_blank" rel="noopener" class="social-item-back">
        ${getIcon('linkedin', data.accentColor)}
        <span>LinkedIn</span>
      </a>` : ''}
      ${data.github ? `<a href="https://github.com/${data.github}" target="_blank" rel="noopener" class="social-item-back">
        ${getIcon('github', data.accentColor)}
        <span>GitHub</span>
      </a>` : ''}
    </div>` : '';

  const accentStrip = data.layoutType === 'modern'
    ? `<div class="accent-strip-left" style="background:${data.accentColor}"></div>`
    : data.layoutType === 'classic'
      ? `<div class="accent-strip-top" style="background:${data.accentColor}"></div>`
      : '';

  const fontLinks = {
    sans: '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">',
    serif: '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">',
    mono: '<link href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap" rel="stylesheet">'
  };

  const fontFamilies = {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    serif: "'Playfair Display', serif",
    mono: "'Fira Mono', monospace"
  };

  const selectedFontLink = fontLinks[data.fontFamily as keyof typeof fontLinks] || fontLinks.sans;
  const selectedFontFamily = fontFamilies[data.fontFamily as keyof typeof fontFamilies] || fontFamilies.sans;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Visiting Card</title>
  <meta name="description" content="${data.title} — ${data.name}. Contact: ${data.email}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${selectedFontLink}
  <style>
    :root {
      --scale: ${data.textScale || 1};
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: ${selectedFontFamily};
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: #0a0a0a;
      color: #fff;
    }

    .page-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.4em;
      color: rgba(255,255,255,0.2);
      margin-bottom: 40px;
      text-align: center;
    }
    .page-title strong { color: rgba(255,255,255,0.5); }

    .cards-container {
      display: flex;
      flex-wrap: wrap;
      gap: 48px;
      align-items: center;
      justify-content: center;
    }

    .card-wrapper {
      text-align: center;
    }
    .card-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: rgba(255,255,255,0.15);
      margin-bottom: 16px;
    }

    /* ============= CARD STYLES ============= */
    .card-scene {
      perspective: 1200px;
      width: 500px;
      height: 286px;
      cursor: grab;
    }
    .card-scene:active {
      cursor: grabbing;
    }

    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transition: transform 0.1s ease-out;
      transform-style: preserve-3d;
      will-change: transform;
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 16px;
      overflow: hidden;
      box-shadow:
        0 20px 60px rgba(0,0,0,0.5),
        0 0 0 1px rgba(255,255,255,0.06),
        inset 0 1px 0 rgba(255,255,255,0.04);
    }
    
    /* Shimmer effect inside the face */
    .card-face::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        transparent 30%,
        rgba(255,255,255,0.03) 45%,
        rgba(255,255,255,0.05) 50%,
        rgba(255,255,255,0.03) 55%,
        transparent 70%
      );
      pointer-events: none;
    }

    .card-scene:hover .card {
      box-shadow: none; /* Shadow handled by faces or parent conceptually, we rely on standard look */
    }

    /* --- FRONT --- */
    .card-front {
      background: ${data.frontColor};
      padding: 36px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .accent-strip-left {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 4px;
    }
    .accent-strip-top {
      position: absolute;
      top: 0; left: 16px; right: 16px;
      height: 3px;
      border-radius: 0 0 4px 4px;
    }

    .front-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      text-align: ${data.textAlign};
    }
    .front-text { flex: 1; }

    .card-name {
      font-size: calc(22px * var(--scale));
      font-weight: 700;
      letter-spacing: -0.02em;
      color: ${data.headingColor};
      margin-bottom: 4px;
    }
    .card-title {
      font-size: calc(12px * var(--scale));
      font-weight: 500;
      color: ${data.accentColor};
      letter-spacing: 0.02em;
    }

    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 16px;
      text-align: ${data.textAlign};
    }
    .contact-item {
      font-size: calc(11px * var(--scale));
      color: ${data.textColor};
      display: flex;
      align-items: center;
      gap: 8px;
      ${data.textAlign === 'center' ? 'justify-content: center;' : data.textAlign === 'right' ? 'justify-content: flex-end;' : ''}
    }
    .contact-item a {
      color: ${data.textColor};
      text-decoration: none;
      transition: color 0.2s;
    }
    .contact-item a:hover { color: ${data.accentColor}; }
    .contact-icon { display: flex; align-items: center; flex-shrink: 0; opacity: 0.5; }
    .field-label { font-weight: 600; opacity: 0.6; font-size: calc(10px * var(--scale)); letter-spacing: 0.05em; }

    .social-bar {
      display: flex;
      gap: 20px;
      padding: 8px 16px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      width: fit-content;
      align-self: ${data.textAlign === 'center' ? 'center' : data.textAlign === 'right' ? 'flex-end' : 'flex-start'};
      margin-top: 12px;
    }
    .social-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: ${data.accentColor};
      font-size: calc(11px * var(--scale));
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .social-item:hover { opacity: 0.7; }
    .social-item svg { width: 14px; height: 14px; }

    /* Photo */
    .photo-container {
      width: 80px; height: 80px;
      overflow: hidden;
      flex-shrink: 0;
      margin-left: 20px;
      border: 2px solid ${hexToRgba(data.accentColor, 0.3)};
    }
    .photo-circle { border-radius: 50%; }
    .photo-square { border-radius: 4px; }
    .photo-rounded { border-radius: 16px; }
    .photo {
      width: 100%; height: 100%;
      object-fit: cover;
    }

    /* --- BACK --- */
    .card-back {
      background: ${data.baseColor};
      padding: 36px 40px;
      display: flex;
      flex-direction: column;
      align-items: ${data.textAlignBack === 'center' ? 'center' : data.textAlignBack === 'right' ? 'flex-end' : 'flex-start'};
      justify-content: center;
      text-align: ${data.textAlignBack};
      transform: rotateY(180deg);
    }

    .initials {
      font-size: calc(52px * var(--scale));
      font-weight: 800;
      letter-spacing: -0.03em;
      color: ${data.accentColor};
      line-height: 1;
      margin-bottom: 16px;
    }

    .back-section {
      margin-bottom: 10px;
    }
    .back-section-label {
      font-size: calc(9px * var(--scale));
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: ${data.headingColor};
      opacity: 0.5;
      margin-bottom: 3px;
    }
    .back-section-value {
      font-size: calc(13px * var(--scale));
      font-weight: 600;
      color: ${data.accentColor};
    }

    .back-field {
      margin-bottom: 8px;
    }
    .back-field-label {
      font-size: calc(9px * var(--scale));
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: ${data.headingColor};
      opacity: 0.5;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
      ${data.textAlignBack === 'center' ? 'justify-content: center;' : data.textAlignBack === 'right' ? 'justify-content: flex-end;' : ''}
    }
    .back-field-value {
      font-size: calc(13px * var(--scale));
      font-weight: 600;
      color: ${data.accentColor};
    }
    .back-field-link {
      text-decoration: none;
      display: block;
      transition: opacity 0.2s;
    }
    .back-field-link:hover { opacity: 0.7; }

    .social-bar-back {
      display: flex;
      gap: 24px;
      padding: 10px 20px;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      margin-top: 14px;
    }
    .social-item-back {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: ${data.accentColor};
      font-size: calc(9px * var(--scale));
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .social-item-back:hover { opacity: 0.7; }
    .social-item-back svg { width: 18px; height: 18px; }

    .social-item-back svg { width: 18px; height: 18px; }

    .footer {
      margin-top: 48px;
      text-align: center;
    }
    .footer p {
      font-size: 10px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.1);
    }

    /* Print styles */
    @media print {
      body { background: white; padding: 20px; }
      .page-title, .card-label, .footer { display: none; }
      .card { box-shadow: 0 0 0 1px #ddd; }
      .card:hover { transform: none; }
    }

    /* Responsive */
    @media (max-width: 560px) {
      .card { width: 92vw; height: auto; min-height: 240px; }
      .card-front { padding: 24px; }
      .card-back { padding: 24px; }
      .card-name { font-size: calc(18px * var(--scale)); }
      .initials { font-size: calc(36px * var(--scale)); }
      .photo-container { width: 60px; height: 60px; }
    }
  </style>
</head>
<body>
  <div class="page-title">
    <strong>${data.name}</strong> — Visiting Card
  </div>

  <div class="cards-container">
    <div class="card-scene">
      <div class="card" id="card3d">
        
        <!-- FRONT -->
        <div class="card-face card-front">
          ${accentStrip}
          <div class="front-header">
            <div class="front-text">
              <div class="card-name">${data.name}</div>
              <div class="card-title">${data.title}</div>
            </div>
            ${photoHtml}
          </div>
          <div>
            <div class="contact-list">
              ${data.email ? `<div class="contact-item"><span class="contact-icon">${getIcon('mail', data.textColor)}</span><span>${data.email}</span></div>` : ''}
              ${data.phone ? `<div class="contact-item"><span class="contact-icon">${getIcon('phone', data.textColor)}</span><span>${data.phone}</span></div>` : ''}
              ${data.website ? `<div class="contact-item"><span class="contact-icon">${getIcon('globe', data.textColor)}</span><span>${data.website}</span></div>` : ''}
              ${data.location ? `<div class="contact-item"><span class="contact-icon">${getIcon('location', data.textColor)}</span><span>${data.location}</span></div>` : ''}
              ${frontExtraFieldsHtml}
            </div>
            ${socialFrontHtml}
          </div>
        </div>
        
        <!-- BACK -->
        <div class="card-face card-back">
          <div class="initials">${initials}</div>
          ${data.qualification ? `
          <div class="back-section">
            <div class="back-section-label">Qualification</div>
            <div class="back-section-value">${data.qualification}</div>
          </div>` : ''}
          ${data.experience ? `
          <div class="back-section">
            <div class="back-section-label">Experience</div>
            <div class="back-section-value">${data.experience}</div>
          </div>` : ''}
          ${backExtraFieldsHtml}
          ${socialBackHtml}
        </div>
        
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Created with 3DCARD</p>
    <p style="margin-top: 8px;">Drag to Rotate &bull; Double-Click to Flip</p>
  </div>
  
  <script>
    const scene = document.querySelector('.card-scene');
    const card = document.getElementById('card3d');
    
    let isDragging = false;
    let isFlipped = false;
    let baseRotationY = 0;
    
    let startX = 0;
    let currentX = 0;
    let currentY = 0;
    
    scene.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      card.style.transition = 'none';
    });
    
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // Snap to nearest 180 degrees
      if (currentX > 90) {
        baseRotationY += 180;
      } else if (currentX < -90) {
        baseRotationY -= 180;
      }
      
      currentX = 0;
      currentY = 0;
      updateTransform();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const moveX = e.clientX - startX;
      currentX = moveX * 0.5; // Sensitivity
      
      // Calculate slight tilt based on Y position for better 3D feel
      const rect = scene.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      currentY = ((e.clientY - centerY) / (rect.height / 2)) * -10;
      
      updateTransform();
    });

    // Double click to flip
    scene.addEventListener('dblclick', () => {
      baseRotationY += 180;
      card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      updateTransform();
    });

    function updateTransform() {
      card.style.transform = \`rotateX(\${currentY}deg) rotateY(\${baseRotationY + currentX}deg)\`;
    }
  </script>
</body>
</html>`;

  // Download as .html file directly using a properly formatted data URI
  const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = `${data.name.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'v'}_card.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
