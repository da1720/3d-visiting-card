import React, { useRef, Suspense, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Center,
  Float,
  Text,
  ContactShadows,
  Environment,
  Html,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import {
  Linkedin,
  Github,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  MapPin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  MessageSquare,
  Award,
  BookOpen,
  Calendar,
  Heart,
  Star,
  Zap,
  Shield,
  Briefcase
} from 'lucide-react';

const IconMap: Record<string, any> = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  phone: Phone,
  globe: Globe,
  location: MapPin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  message: MessageSquare,
  award: Award,
  book: BookOpen,
  calendar: Calendar,
  heart: Heart,
  star: Star,
  zap: Zap,
  shield: Shield,
  briefcase: Briefcase,
  link: ExternalLink
};

const FONT_URLS = {
  sans: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff',
  serif: 'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-400-normal.woff',
  mono: 'https://cdn.jsdelivr.net/npm/@fontsource/fira-mono/files/fira-mono-latin-400-normal.woff'
};

interface CardProps {
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
  sceneBgColor: string;
  textureType: 'noise' | 'geometric' | 'carbon' | 'marble' | 'brushed' | 'dotted';
  layoutType: 'modern' | 'minimal' | 'classic';
  finishType: 'matte' | 'glossy';
  textAlign: 'left' | 'center' | 'right';
  textAlignBack: 'left' | 'center' | 'right';
  fontFamily: string;
  textScale: number;
  qualification: string;
  experience: string;
  extraFieldsFront?: { label: string; value: string; icon?: string; link?: string }[];
  extraFieldsBack?: { label: string; value: string; icon?: string; link?: string }[];
  iconSize: number;
  iconColor: string;
  iconPosFrontX: number;
  iconPosFrontY: number;
  iconPosBackX: number;
  iconPosBackY: number;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
  photoSize: number;
  photoPosX: number;
  photoPosY: number;
  photoShape: 'circle' | 'square' | 'rounded';
}

class PhotoErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Photo load error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Or a placeholder mesh
    }
    return this.props.children;
  }
}

const UserPhoto: React.FC<{ url: string; size: number; posX: number; posY: number; shape: 'circle' | 'square' | 'rounded' }> = ({ url, size, posX, posY, shape }) => {
  const proxyUrl = url.startsWith('http') ? `https://threed-visiting-card.onrender.com/api/proxy-image?url=${encodeURIComponent(url)}` : url;
  const texture = useTexture(proxyUrl);
  return (
    <mesh position={[posX, posY, 0.05]}>
      {shape === 'circle' ? (
        <circleGeometry args={[size, 64]} />
      ) : (
        <planeGeometry args={[size * 2, size * 2]} />
      )}
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Card: React.FC<CardProps> = ({ name, title, email, phone, website, location, accentColor, frontColor, headingColor, textColor, baseColor, textureType, layoutType, finishType, textAlign, textAlignBack, fontFamily, textScale, qualification, experience, extraFieldsFront = [], extraFieldsBack = [], iconSize, iconColor, iconPosFrontX, iconPosFrontY, iconPosBackX, iconPosBackY, linkedin, github, photoUrl, photoSize, photoPosX, photoPosY, photoShape }) => {
  const fontUrl = FONT_URLS[fontFamily as keyof typeof FONT_URLS] || FONT_URLS.sans;

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base color - now white so we can tint with material color
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1024, 1024);

    if (textureType === 'noise' || textureType === 'geometric') {
      // Subtle noise/grain
      for (let i = 0; i < 20000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const opacity = Math.random() * 0.08;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    if (textureType === 'geometric') {
      // Abstract geometric lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        const x1 = Math.random() * 1024;
        const y1 = Math.random() * 1024;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + (Math.random() - 0.5) * 400, y1 + (Math.random() - 0.5) * 400);
        ctx.stroke();
      }
    }

    if (textureType === 'carbon') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 1024; i += 8) {
        for (let j = 0; j < 1024; j += 8) {
          if ((i + j) % 16 === 0) {
            ctx.fillRect(i, j, 4, 4);
          }
        }
      }
    }

    if (textureType === 'marble') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        let x = Math.random() * 1024;
        let y = 0;
        ctx.moveTo(x, y);
        while (y < 1024) {
          x += (Math.random() - 0.5) * 50;
          y += Math.random() * 100;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    if (textureType === 'brushed') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 1024; i += 2) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1024, i + (Math.random() - 0.5) * 10);
        ctx.stroke();
      }
    }

    if (textureType === 'dotted') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 1024; i += 16) {
        for (let j = 0; j < 1024; j += 16) {
          ctx.beginPath();
          ctx.arc(i, j, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Subtle gradient highlights
    const grad = ctx.createRadialGradient(512, 512, 0, 512, 512, 800);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [textureType]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Card Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.5, 2, 0.08]} />
          <meshStandardMaterial
            color={frontColor}
            map={texture}
            metalness={finishType === 'glossy' ? 0.9 : 0.2}
            roughness={finishType === 'glossy' ? 0.1 : 0.8}
            envMapIntensity={2}
          />
        </mesh>

        {/* Accent Strip */}
        {layoutType !== 'minimal' && (
          <mesh position={layoutType === 'classic' ? [0, 0.9, 0.05] : [-1.7, 0, 0.05]}>
            <boxGeometry args={layoutType === 'classic' ? [3.2, 0.04, 0.02] : [0.06, 1.8, 0.02]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} />
          </mesh>
        )}

        {/* User Photo */}
        {photoUrl && (
          <PhotoErrorBoundary key={photoUrl}>
            <Suspense fallback={null}>
              <UserPhoto
                url={photoUrl}
                size={photoSize}
                posX={photoPosX}
                posY={photoPosY}
                shape={photoShape}
              />
            </Suspense>
          </PhotoErrorBoundary>
        )}

        {/* Text Content - Front */}
        <group position={[0, 0, 0.05]}>
          <Text
            position={[textAlign === 'left' ? -1.5 : textAlign === 'right' ? 1.5 : 0, 0.5, 0]}
            fontSize={0.25 * textScale}
            color={headingColor}
            anchorX={textAlign}
            font={fontUrl}
          >
            {name}
          </Text>
          <Text
            position={[textAlign === 'left' ? -1.5 : textAlign === 'right' ? 1.5 : 0, 0.25, 0]}
            fontSize={0.12 * textScale}
            color={accentColor}
            anchorX={textAlign}
            font={fontUrl}
          >
            {title}
          </Text>

          <group position={[textAlign === 'left' ? -1.5 : textAlign === 'right' ? 1.5 : 0, -0.1, 0]}>
            <Text position={[0, 0, 0]} fontSize={0.08 * textScale} color={textColor} anchorX={textAlign} font={fontUrl} onClick={() => window.open(`mailto:${email}`, '_blank')} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'grab'}>
              {email}
            </Text>
            <Text position={[0, -0.14, 0]} fontSize={0.08 * textScale} color={textColor} anchorX={textAlign} font={fontUrl} onClick={() => window.open(`tel:${phone.replace(/[^0-9+]/g, '')}`, '_self')} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'grab'}>
              {phone}
            </Text>
            <Text position={[0, -0.28, 0]} fontSize={0.08 * textScale} color={textColor} anchorX={textAlign} font={fontUrl} onClick={() => window.open(website.startsWith('http') ? website : `https://${website}`, '_blank')} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'grab'}>
              {website}
            </Text>
            <Text position={[0, -0.42, 0]} fontSize={0.08 * textScale} color={textColor} anchorX={textAlign} font={fontUrl}>
              {location}
            </Text>
            {extraFieldsFront.map((field, index) => {
              const totalFields = 4 + extraFieldsFront.length;
              const spacing = Math.min(0.14, 0.8 / totalFields);
              const yPos = -0.42 - (index + 1) * spacing;
              const IconComponent = field.icon ? IconMap[field.icon] : null;

              if (field.icon || field.link) {
                return (
                  <group key={index} position={[0, yPos, 0]}>
                    <Html transform position={[0, 0, 0]} scale={0.04 * textScale} occlude>
                      <div
                        className={`flex items-center gap-2 whitespace-nowrap select-none ${field.link ? 'cursor-pointer pointer-events-auto hover:opacity-80' : 'pointer-events-none'}`}
                        style={{ color: textColor, textAlign: textAlign, justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center', fontFamily: fontUrl.includes('fira') ? 'monospace' : fontUrl.includes('playfair') ? 'serif' : 'sans-serif' }}
                        onClick={() => field.link && window.open(field.link.startsWith('http') ? field.link : `https://${field.link}`, '_blank')}
                      >
                        {IconComponent && <IconComponent size={14} color={textColor} />}
                        <span className="text-[10px] font-medium" style={{ fontSize: `${10 * textScale}px` }}>
                          {field.label ? `${field.label.toUpperCase()}: ${field.value}` : field.value}
                        </span>
                        {field.link && <ExternalLink size={10} className="opacity-40" />}
                      </div>
                    </Html>
                  </group>
                );
              }

              return (
                <Text
                  key={index}
                  position={[0, yPos, 0]}
                  fontSize={Math.min(0.08, 0.5 / totalFields) * textScale}
                  color={textColor}
                  anchorX={textAlign}
                  font={fontUrl}
                >
                  {field.label ? `${field.label.toUpperCase()}: ${field.value}` : field.value}
                </Text>
              );
            })}
          </group>

          {/* Social Icons */}
          <group position={[iconPosFrontX, iconPosFrontY, 0]}>
            <Html transform position={[0, 0, 0]} scale={0.06 * (iconSize / 20)} occlude>
              <div className="flex items-center gap-6 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white whitespace-nowrap select-none shadow-[0_0_20px_rgba(0,0,0,0.3)] pointer-events-auto">
                {linkedin && (
                  <div
                    className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition"
                    onClick={() => window.open(`https://linkedin.com/in/${linkedin.replace('/', '')}`, '_blank')}
                  >
                    <div className="p-1.5 bg-white/5 rounded-lg">
                      <Linkedin size={iconSize} color={iconColor} fill={iconColor} fillOpacity={0.2} />
                    </div>
                    <span className="text-[15px] font-bold tracking-tight">{linkedin}</span>
                  </div>
                )}
                {github && (
                  <div
                    className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition"
                    onClick={() => window.open(`https://github.com/${github.replace('/', '')}`, '_blank')}
                  >
                    <div className="p-1.5 bg-white/5 rounded-lg">
                      <Github size={iconSize} color={iconColor} />
                    </div>
                    <span className="text-[15px] font-bold tracking-tight">{github}</span>
                  </div>
                )}
              </div>
            </Html>
          </group>
        </group>

        {/* Back of the card */}
        <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
          <boxGeometry args={[3.5, 2, 0.02]} />
          <meshStandardMaterial
            color={baseColor}
            map={texture}
            roughness={finishType === 'glossy' ? 0.3 : 0.9}
            metalness={finishType === 'glossy' ? 0.5 : 0.1}
          />
          <Text
            position={[textAlignBack === 'left' ? -1.5 : textAlignBack === 'right' ? 1.5 : 0, 0.6, 0.02]}
            fontSize={0.4 * textScale}
            color={accentColor}
            anchorX={textAlignBack}
            anchorY="middle"
            font={fontUrl}
          >
            {name.split(' ').map(n => n[0]).join('')}
          </Text>

          <group position={[textAlignBack === 'left' ? -1.5 : textAlignBack === 'right' ? 1.5 : 0, 0.1, 0.02]}>
            <Text
              position={[0, 0.15, 0]}
              fontSize={0.08 * textScale}
              color={headingColor}
              maxWidth={3}
              textAlign={textAlignBack}
              anchorX={textAlignBack}
              font={fontUrl}
            >
              QUALIFICATION
            </Text>
            <Text
              position={[0, 0.05, 0]}
              fontSize={0.1 * textScale}
              color={accentColor}
              maxWidth={3}
              textAlign={textAlignBack}
              anchorX={textAlignBack}
              font={fontUrl}
            >
              {qualification}
            </Text>

            <Text
              position={[0, -0.15, 0]}
              fontSize={0.08 * textScale}
              color={headingColor}
              maxWidth={3}
              textAlign={textAlignBack}
              anchorX={textAlignBack}
              font={fontUrl}
            >
              EXPERIENCE
            </Text>
            <Text
              position={[0, -0.25, 0]}
              fontSize={0.1 * textScale}
              color={accentColor}
              maxWidth={3}
              textAlign={textAlignBack}
              anchorX={textAlignBack}
              font={fontUrl}
            >
              {experience}
            </Text>

            {extraFieldsBack.map((field, index) => {
              const totalFields = 2 + extraFieldsBack.length;
              const spacing = Math.min(0.3, 1.2 / totalFields);
              const fontSize = Math.min(0.1, 0.4 / totalFields);
              const labelFontSize = fontSize * 0.8;
              const yPos = -0.4 - index * spacing;
              const IconComponent = field.icon ? IconMap[field.icon] : null;

              if (field.icon || field.link) {
                return (
                  <group key={index} position={[0, yPos, 0]}>
                    <Html transform position={[0, 0, 0.02]} scale={0.05 * textScale} occlude>
                      <div
                        className={`flex flex-col gap-1 select-none ${field.link ? 'cursor-pointer pointer-events-auto hover:opacity-80' : 'pointer-events-none'}`}
                        style={{ color: accentColor, textAlign: textAlignBack, alignItems: textAlignBack === 'left' ? 'flex-start' : textAlignBack === 'right' ? 'flex-end' : 'center', fontFamily: fontUrl.includes('fira') ? 'monospace' : fontUrl.includes('playfair') ? 'serif' : 'sans-serif' }}
                        onClick={() => field.link && window.open(field.link.startsWith('http') ? field.link : `https://${field.link}`, '_blank')}
                      >
                        <span className="text-[8px] font-bold tracking-widest opacity-60 flex items-center gap-1" style={{ color: headingColor, fontSize: `${8 * textScale}px` }}>
                          {IconComponent && <IconComponent size={10} color={headingColor} />}
                          {field.label.toUpperCase()}
                        </span>
                        <span className="text-[12px] font-bold flex items-center gap-1" style={{ fontSize: `${12 * textScale}px` }}>
                          {field.value}
                          {field.link && <ExternalLink size={10} className="opacity-40" />}
                        </span>
                      </div>
                    </Html>
                  </group>
                );
              }

              return (
                <group key={index} position={[0, yPos, 0]}>
                  <Text
                    position={[0, 0.05, 0]}
                    fontSize={labelFontSize * textScale}
                    color={headingColor}
                    maxWidth={3}
                    textAlign={textAlignBack}
                    anchorX={textAlignBack}
                    font={fontUrl}
                  >
                    {field.label.toUpperCase()}
                  </Text>
                  <Text
                    position={[0, -0.05, 0]}
                    fontSize={fontSize * textScale}
                    color={accentColor}
                    maxWidth={3}
                    textAlign={textAlignBack}
                    anchorX={textAlignBack}
                    font={fontUrl}
                  >
                    {field.value}
                  </Text>
                </group>
              );
            })}
          </group>

          {/* Back Social Icons - Larger */}
          <group position={[iconPosBackX, iconPosBackY, 0.02]}>
            <Html transform position={[0, 0, 0]} scale={0.07 * (iconSize / 24)} occlude>
              <div className={`flex items-center gap-8 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white select-none shadow-2xl pointer-events-auto ${textAlignBack === 'left' ? 'justify-start' : textAlignBack === 'right' ? 'justify-end' : 'justify-center'}`}>
                {linkedin && (
                  <div
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 transition"
                    onClick={() => window.open(`https://linkedin.com/in/${linkedin.replace('/', '')}`, '_blank')}
                  >
                    <Linkedin size={iconSize * 1.2} color={iconColor} fill={iconColor} fillOpacity={0.2} />
                    <span className="text-[10px] font-bold tracking-tight opacity-70">LinkedIn</span>
                  </div>
                )}
                {github && (
                  <div
                    className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 transition"
                    onClick={() => window.open(`https://github.com/${github.replace('/', '')}`, '_blank')}
                  >
                    <Github size={iconSize * 1.2} color={iconColor} />
                    <span className="text-[10px] font-bold tracking-tight opacity-70">GitHub</span>
                  </div>
                )}
              </div>
            </Html>
          </group>

          <Text
            position={[0, -0.9, 0.02]}
            fontSize={0.06}
            color={headingColor}
            fillOpacity={0.3}
            anchorX="center"
            font={fontUrl}
          >
            tomprosoft
          </Text>
        </mesh>
      </group>
    </Float>
  );
};

export const VisitingCardScene: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full h-full relative min-h-[400px] cursor-grab active:cursor-grabbing" style={{ backgroundColor: props.sceneBgColor }}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ height: '100%', width: '100%' }}
        gl={{ preserveDrawingBuffer: true }}
        id="visiting-card-canvas"
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color={props.accentColor} />

        <Suspense fallback={null}>
          <Center>
            <Card {...props} />
          </Center>
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            enableDamping={true}
          />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Interaction Instructions Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-center z-10">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium">
          Left Click to Turn • Right Click to Tilt • Scroll to Zoom
        </p>
      </div>
    </div>
  );
};
