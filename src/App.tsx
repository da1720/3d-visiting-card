import React, { useState, useEffect } from 'react';
import { VisitingCardScene } from './components/VisitingCard';
import { motion, AnimatePresence } from 'motion/react';
import { exportCardAsHtml } from './utils/exportCardHtml';
import { exportImage } from './utils/exportImage';
import { exportVCard } from './utils/exportVCard';
import { exportQRCode } from './utils/exportQR';
import {
  User,
  Briefcase,
  Mail,
  Phone,
  Globe,
  MapPin,
  Palette,
  Camera,
  Share2,
  Download,
  Plus,
  Trash2,
  Linkedin,
  Github,
  Image as ImageIcon,
  Contact,
  Code2,
  QrCode
} from 'lucide-react';

import { ArrowLeft } from 'lucide-react';

interface AppProps {
  userId?: number;
  email?: string;
  cardId?: number;
  initialData?: any;
  onClose?: () => void;
}

export default function App({ userId, email, cardId, initialData, onClose }: AppProps) {
  const [cardData, setCardData] = useState({
    cardName: "",
    name: "ALEX RIVERA",
    title: "Creative Technologist",
    email: "alex@studio.design",
    phone: "+1 (555) 000-1234",
    website: "www.alexrivera.dev",
    location: "San Francisco, CA",
    linkedin: "alex-rivera",
    github: "arivera-dev",
    accentColor: "#10b981", // Emerald-500
    frontColor: "#0a0a0a", // Deep Black
    headingColor: "#ffffff",
    textColor: "#aaaaaa",
    baseColor: "#0a0a0a", // Deep Black
    sceneBgColor: "#0a0a0a",
    textureType: 'noise' as const,
    layoutType: 'modern' as const,
    finishType: 'glossy' as const,
    textAlign: 'left' as const,
    textAlignBack: 'center' as const,
    fontFamily: 'sans' as const,
    textScale: 1,
    iconSize: 20,
    iconColor: "#10b981",
    iconPosFrontX: 0,
    iconPosFrontY: -0.82,
    iconPosBackX: 0,
    iconPosBackY: -0.75,
    qualification: "M.S. in Computer Science",
    experience: "5+ Years in Product Design",
    extraFieldsFront: [] as { label: string; value: string; icon?: string; link?: string }[],
    extraFieldsBack: [] as { label: string; value: string; icon?: string; link?: string }[],
    photoUrl: "",
    photoSize: 0.4,
    photoPosX: 1.2,
    photoPosY: 0.5,
    photoShape: 'circle' as 'circle' | 'square' | 'rounded',
    ...initialData,
  });

  const [currentCardId, setCurrentCardId] = useState<number | undefined>(cardId);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Mark load complete immediately since Dashboard gave us the initialData
  useEffect(() => {
    setInitialLoadComplete(true);
  }, []);

  // Auto-save debounced
  useEffect(() => {
    if (!userId || !initialLoadComplete) return;
    setIsSaving(true);

    const timeoutId = setTimeout(() => {
      fetch(`https://threed-visiting-card.onrender.com/api/cards/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentCardId, cardData })
      })
        .then(res => res.json())
        .then(data => {
          setIsSaving(false);
          if (data.id) setCurrentCardId(data.id);
        })
        .catch(err => {
          console.error('Failed to save card data:', err);
          setIsSaving(false);
        });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [cardData, userId, initialLoadComplete, currentCardId]);

  const colors = [
    "#10b981", // Emerald
    "#3b82f6", // Blue
    "#8b5cf6", // Violet
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#ec4899", // Pink
  ];

  const baseColors = [
    "#0a0a0a", // Deep Black
    "#1a1a1a", // Dark Gray
    "#0f172a", // Slate/Navy
    "#1e1b4b", // Indigo
    "#450a0a", // Deep Red
    "#064e3b", // Deep Green
  ];

  const bgColors = [
    "#0a0a0a",
    "#171717",
    "#262626",
    "#0f172a",
    "#1e1b4b",
    "#450a0a",
  ];

  const textureTypes = [
    { id: 'noise', label: 'Noise' },
    { id: 'geometric', label: 'Geometric' },
    { id: 'carbon', label: 'Carbon' },
    { id: 'marble', label: 'Marble' },
    { id: 'brushed', label: 'Brushed' },
    { id: 'dotted', label: 'Dotted' },
  ];

  const layoutTypes = [
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'classic', label: 'Classic' },
  ];

  const finishTypes = [
    { id: 'glossy', label: 'Glossy' },
    { id: 'matte', label: 'Matte' },
  ];

  const fontTypes = [
    { id: 'sans', label: 'Sans-Serif' },
    { id: 'serif', label: 'Serif' },
    { id: 'mono', label: 'Monospace' },
  ];

  const textAlignTypes = [
    { id: 'left', label: 'Left' },
    { id: 'center', label: 'Center' },
    { id: 'right', label: 'Right' },
  ];

  const availableIcons = [
    { id: '', label: 'No Icon' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'github', label: 'GitHub' },
    { id: 'mail', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'globe', label: 'Website' },
    { id: 'location', label: 'Location' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'message', label: 'Message' },
    { id: 'award', label: 'Award' },
    { id: 'book', label: 'Education' },
    { id: 'calendar', label: 'Date' },
    { id: 'heart', label: 'Interest' },
    { id: 'star', label: 'Skill' },
    { id: 'zap', label: 'Energy' },
    { id: 'shield', label: 'Security' },
    { id: 'briefcase', label: 'Work' },
    { id: 'link', label: 'Link' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden font-sans">
      {/* Left Side: 3D Scene */}
      <div className="relative flex-[1.5] lg:flex-1 min-h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/5">
        <VisitingCardScene {...cardData} />

        {/* Branding Overlay */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <h1 className="text-xl lg:text-2xl font-light tracking-tighter shadow-black drop-shadow-lg">
            3D<span className="font-bold">CARD</span>
          </h1>
          <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1 shadow-black drop-shadow-md">
            Interactive Professional Identity
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 px-4 py-2 rounded-xl text-sm transition font-medium text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        )}
      </div>

      {/* Right Side: Controls */}
      <div className="flex-1 lg:w-[400px] lg:flex-none bg-neutral-900/50 backdrop-blur-xl p-6 lg:p-8 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">Customize Card</h2>
            {userId && (
              <span className="text-[9px] uppercase tracking-widest text-white/30 truncate max-w-[150px]">
                {isSaving ? 'Saving...' : 'All changes saved'}
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <button
              className="p-2 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-lg transition-colors group relative"
              title="Screenshot Image"
              onClick={() => exportImage(cardData.name)}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded-md z-50">
                Image (PNG)
              </span>
            </button>
            <button
              className="p-2 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-lg transition-colors group relative"
              title="Download VCard"
              onClick={() => exportVCard(cardData)}
            >
              <Contact className="w-4 h-4" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded-md z-50">
                Contact (VCF)
              </span>
            </button>
            <button
              className="p-2 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-lg transition-colors group relative"
              title="Export as HTML"
              onClick={() => exportCardAsHtml(cardData)}
            >
              <Code2 className="w-4 h-4" />
              <span className="absolute -bottom-8 right-0 text-[9px] uppercase tracking-wider text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded-md z-50">
                Code (HTML)
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Internal Project Name <span className="text-emerald-500/70">(Dashboard Only)</span></label>
              <div className="relative">
                <input
                  type="text"
                  value={cardData.cardName || cardData.name || 'Untitled'}
                  onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                  placeholder="e.g. My Primary Card"
                  className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.title}
                  onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="email"
                  value={cardData.email}
                  onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.phone}
                  onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.website}
                  onChange={(e) => setCardData({ ...cardData, website: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">LinkedIn</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.linkedin}
                  onChange={(e) => setCardData({ ...cardData, linkedin: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">GitHub</label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.github}
                  onChange={(e) => setCardData({ ...cardData, github: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* User Photo */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">User Photo</label>
            <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  placeholder="Direct Image URL (e.g. https://.../photo.jpg)"
                  value={cardData.photoUrl}
                  onChange={(e) => setCardData({ ...cardData, photoUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <p className="mt-2 text-[9px] text-white/30 px-1">
                  Note: Use direct image links (ending in .jpg, .png, etc.). Webpage URLs will not work.
                </p>
              </div>

              {cardData.photoUrl && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setCardData({ ...cardData, photoShape: 'circle' })}
                      className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.photoShape === 'circle' ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                    >
                      Circle
                    </button>
                    <button
                      onClick={() => setCardData({ ...cardData, photoShape: 'square' })}
                      className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.photoShape === 'square' ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                    >
                      Square
                    </button>
                    <button
                      onClick={() => setCardData({ ...cardData, photoShape: 'rounded' })}
                      className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.photoShape === 'rounded' ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                    >
                      Rounded
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">Photo Size</span>
                      <span className="text-[10px] text-white/60">{(cardData.photoSize * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.01"
                      value={cardData.photoSize}
                      onChange={(e) => setCardData({ ...cardData, photoSize: parseFloat(e.target.value) })}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">Position (X)</span>
                      <span className="text-[10px] text-white/60">{cardData.photoPosX.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-1.5"
                      max="1.5"
                      step="0.01"
                      value={cardData.photoPosX}
                      onChange={(e) => setCardData({ ...cardData, photoPosX: parseFloat(e.target.value) })}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">Position (Y)</span>
                      <span className="text-[10px] text-white/60">{cardData.photoPosY.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-1.0"
                      max="1.0"
                      step="0.01"
                      value={cardData.photoPosY}
                      onChange={(e) => setCardData({ ...cardData, photoPosY: parseFloat(e.target.value) })}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Professional Background */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Qualification</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.qualification}
                  onChange={(e) => setCardData({ ...cardData, qualification: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g. B.Tech in CSE"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Work Experience</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={cardData.experience}
                  onChange={(e) => setCardData({ ...cardData, experience: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g. 3 Years at Google"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Extra Fields Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 block ml-1">Front Extra Fields</label>
                <button
                  onClick={() => setCardData({
                    ...cardData,
                    extraFieldsFront: [...cardData.extraFieldsFront, { label: '', value: '' }]
                  })}
                  className="p-1 hover:bg-white/5 rounded text-emerald-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {cardData.extraFieldsFront.map((field, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. Portfolio)"
                        value={field.label}
                        onChange={(e) => {
                          const newFields = [...cardData.extraFieldsFront];
                          newFields[index].label = e.target.value;
                          setCardData({ ...cardData, extraFieldsFront: newFields });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-emerald-500/30"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. My Projects)"
                        value={field.value}
                        onChange={(e) => {
                          const newFields = [...cardData.extraFieldsFront];
                          newFields[index].value = e.target.value;
                          setCardData({ ...cardData, extraFieldsFront: newFields });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-emerald-500/30"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newFields = cardData.extraFieldsFront.filter((_, i) => i !== index);
                        setCardData({ ...cardData, extraFieldsFront: newFields });
                      }}
                      className="p-2 hover:bg-red-500/10 rounded text-red-500 transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={field.icon || ''}
                      onChange={(e) => {
                        const newFields = [...cardData.extraFieldsFront];
                        newFields[index].icon = e.target.value;
                        setCardData({ ...cardData, extraFieldsFront: newFields });
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-[10px] focus:outline-none focus:border-emerald-500/30 text-white/60"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon.id} value={icon.id} className="bg-neutral-900">{icon.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Link (optional)"
                      value={field.link || ''}
                      onChange={(e) => {
                        const newFields = [...cardData.extraFieldsFront];
                        newFields[index].link = e.target.value;
                        setCardData({ ...cardData, extraFieldsFront: newFields });
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-[10px] focus:outline-none focus:border-emerald-500/30"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 block ml-1">Back Extra Fields</label>
                <button
                  onClick={() => setCardData({
                    ...cardData,
                    extraFieldsBack: [...cardData.extraFieldsBack, { label: '', value: '' }]
                  })}
                  className="p-1 hover:bg-white/5 rounded text-emerald-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {cardData.extraFieldsBack.map((field, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. Award)"
                        value={field.label}
                        onChange={(e) => {
                          const newFields = [...cardData.extraFieldsBack];
                          newFields[index].label = e.target.value;
                          setCardData({ ...cardData, extraFieldsBack: newFields });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-emerald-500/30"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. Best Designer)"
                        value={field.value}
                        onChange={(e) => {
                          const newFields = [...cardData.extraFieldsBack];
                          newFields[index].value = e.target.value;
                          setCardData({ ...cardData, extraFieldsBack: newFields });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-emerald-500/30"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newFields = cardData.extraFieldsBack.filter((_, i) => i !== index);
                        setCardData({ ...cardData, extraFieldsBack: newFields });
                      }}
                      className="p-2 hover:bg-red-500/10 rounded text-red-500 transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={field.icon || ''}
                      onChange={(e) => {
                        const newFields = [...cardData.extraFieldsBack];
                        newFields[index].icon = e.target.value;
                        setCardData({ ...cardData, extraFieldsBack: newFields });
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-[10px] focus:outline-none focus:border-emerald-500/30 text-white/60"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon.id} value={icon.id} className="bg-neutral-900">{icon.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Link (optional)"
                      value={field.link || ''}
                      onChange={(e) => {
                        const newFields = [...cardData.extraFieldsBack];
                        newFields[index].link = e.target.value;
                        setCardData({ ...cardData, extraFieldsBack: newFields });
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-[10px] focus:outline-none focus:border-emerald-500/30"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Typography */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Font Style</label>
              <div className="grid grid-cols-3 gap-2">
                {fontTypes.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setCardData({ ...cardData, fontFamily: font.id as any })}
                    className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.fontFamily === font.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                <label className="text-[10px] uppercase tracking-widest text-white/40 block">Text Size</label>
                <span className="text-[10px] text-white/60">{Math.round(cardData.textScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.5"
                step="0.05"
                value={cardData.textScale}
                onChange={(e) => setCardData({ ...cardData, textScale: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Appearance */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Card Layout</label>
              <div className="grid grid-cols-3 gap-2">
                {layoutTypes.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setCardData({ ...cardData, layoutType: layout.id as any })}
                    className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.layoutType === layout.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Front Text Alignment</label>
              <div className="grid grid-cols-3 gap-2">
                {textAlignTypes.map((align) => (
                  <button
                    key={align.id}
                    onClick={() => setCardData({ ...cardData, textAlign: align.id as any })}
                    className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.textAlign === align.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                  >
                    {align.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Back Text Alignment</label>
              <div className="grid grid-cols-3 gap-2">
                {textAlignTypes.map((align) => (
                  <button
                    key={align.id}
                    onClick={() => setCardData({ ...cardData, textAlignBack: align.id as any })}
                    className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.textAlignBack === align.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                  >
                    {align.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Icon Customization</label>
              <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Icon Size</span>
                    <span className="text-[10px] text-white/60">{cardData.iconSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={cardData.iconSize}
                    onChange={(e) => setCardData({ ...cardData, iconSize: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Front Position (X)</span>
                    <span className="text-[10px] text-white/60">{cardData.iconPosFrontX.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.5"
                    max="1.5"
                    step="0.01"
                    value={cardData.iconPosFrontX}
                    onChange={(e) => setCardData({ ...cardData, iconPosFrontX: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Front Position (Y)</span>
                    <span className="text-[10px] text-white/60">{cardData.iconPosFrontY.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.0"
                    max="1.0"
                    step="0.01"
                    value={cardData.iconPosFrontY}
                    onChange={(e) => setCardData({ ...cardData, iconPosFrontY: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Back Position (X)</span>
                    <span className="text-[10px] text-white/60">{cardData.iconPosBackX.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.5"
                    max="1.5"
                    step="0.01"
                    value={cardData.iconPosBackX}
                    onChange={(e) => setCardData({ ...cardData, iconPosBackX: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Back Position (Y)</span>
                    <span className="text-[10px] text-white/60">{cardData.iconPosBackY.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.0"
                    max="1.0"
                    step="0.01"
                    value={cardData.iconPosBackY}
                    onChange={(e) => setCardData({ ...cardData, iconPosBackY: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Icon Color</label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden relative"
                      style={{ backgroundColor: cardData.iconColor }}
                    >
                      <input
                        type="color"
                        value={cardData.iconColor}
                        onChange={(e) => setCardData({ ...cardData, iconColor: e.target.value })}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                    <button
                      onClick={() => setCardData({ ...cardData, iconColor: cardData.accentColor })}
                      className="text-[10px] uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      Match Accent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Card Finish</label>
              <div className="grid grid-cols-2 gap-2">
                {finishTypes.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setCardData({ ...cardData, finishType: finish.id as any })}
                    className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.finishType === finish.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                  >
                    {finish.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Card Texture</label>
              <div className="grid grid-cols-2 gap-2">
                {textureTypes.map((texture) => (
                  <button
                    key={texture.id}
                    onClick={() => setCardData({ ...cardData, textureType: texture.id as any })}
                    className={`py-2 px-3 rounded-xl border text-[10px] uppercase tracking-wider transition-all ${cardData.textureType === texture.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                  >
                    {texture.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Front Card Color</label>
              <div className="flex flex-wrap gap-3">
                {baseColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCardData({ ...cardData, frontColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${cardData.frontColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {/* Custom Color Picker */}
                <div className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${!baseColors.includes(cardData.frontColor) ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`} style={{ backgroundColor: !baseColors.includes(cardData.frontColor) ? cardData.frontColor : 'transparent' }}>
                  <Palette className={`w-4 h-4 ${!baseColors.includes(cardData.frontColor) ? 'text-white' : 'text-white/40'}`} />
                  <input
                    type="color"
                    value={cardData.frontColor}
                    onChange={(e) => setCardData({ ...cardData, frontColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Back Card Color</label>
              <div className="flex flex-wrap gap-3">
                {baseColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCardData({ ...cardData, baseColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${cardData.baseColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {/* Custom Color Picker */}
                <div className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${!baseColors.includes(cardData.baseColor) ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`} style={{ backgroundColor: !baseColors.includes(cardData.baseColor) ? cardData.baseColor : 'transparent' }}>
                  <Palette className={`w-4 h-4 ${!baseColors.includes(cardData.baseColor) ? 'text-white' : 'text-white/40'}`} />
                  <input
                    type="color"
                    value={cardData.baseColor}
                    onChange={(e) => setCardData({ ...cardData, baseColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Heading Color</label>
              <div className="flex flex-wrap gap-3">
                {["#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setCardData({ ...cardData, headingColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${cardData.headingColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${!["#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].includes(cardData.headingColor) ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`} style={{ backgroundColor: !["#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].includes(cardData.headingColor) ? cardData.headingColor : 'transparent' }}>
                  <Palette className={`w-4 h-4 ${!["#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].includes(cardData.headingColor) ? 'text-white' : 'text-white/40'}`} />
                  <input
                    type="color"
                    value={cardData.headingColor}
                    onChange={(e) => setCardData({ ...cardData, headingColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Text Color</label>
              <div className="flex flex-wrap gap-3">
                {["#aaaaaa", "#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setCardData({ ...cardData, textColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${cardData.textColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${!["#aaaaaa", "#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b"].includes(cardData.textColor) ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`} style={{ backgroundColor: !["#aaaaaa", "#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b"].includes(cardData.textColor) ? cardData.textColor : 'transparent' }}>
                  <Palette className={`w-4 h-4 ${!["#aaaaaa", "#ffffff", "#000000", "#10b981", "#3b82f6", "#f59e0b"].includes(cardData.textColor) ? 'text-white' : 'text-white/40'}`} />
                  <input
                    type="color"
                    value={cardData.textColor}
                    onChange={(e) => setCardData({ ...cardData, textColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Accent Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCardData({ ...cardData, accentColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${cardData.accentColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {/* Custom Color Picker */}
                <div className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${!colors.includes(cardData.accentColor) ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`} style={{ backgroundColor: !colors.includes(cardData.accentColor) ? cardData.accentColor : 'transparent' }}>
                  <Palette className={`w-4 h-4 ${!colors.includes(cardData.accentColor) ? 'text-white' : 'text-white/40'}`} />
                  <input
                    type="color"
                    value={cardData.accentColor}
                    onChange={(e) => setCardData({ ...cardData, accentColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5 ml-1">Background Color</label>
              <div className="flex flex-wrap gap-3">
                {bgColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCardData({ ...cardData, sceneBgColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${cardData.sceneBgColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {/* Custom Color Picker */}
                <div className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${!bgColors.includes(cardData.sceneBgColor) ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:scale-105'}`} style={{ backgroundColor: !bgColors.includes(cardData.sceneBgColor) ? cardData.sceneBgColor : 'transparent' }}>
                  <Palette className={`w-4 h-4 ${!bgColors.includes(cardData.sceneBgColor) ? 'text-white' : 'text-white/40'}`} />
                  <input
                    type="color"
                    value={cardData.sceneBgColor}
                    onChange={(e) => setCardData({ ...cardData, sceneBgColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={() => exportQRCode(cardData)}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-3 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <QrCode className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Generate QR VCard</span>
          </button>
          <p className="text-[10px] text-center text-white/30 mt-4 uppercase tracking-widest">
            Powered by Three.js & React Fiber
          </p>
        </div>
      </div>
    </div>
  );
}
