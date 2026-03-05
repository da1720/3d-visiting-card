import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

interface LoginPageProps {
  onLogin: (userId: number, email: string) => void;
}

// Animated particle background
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: 160 + Math.random() * 30,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(160, 60%, 50%, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

// Floating 3D card preview
function FloatingCard() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    let time = 0;
    const animate = () => {
      time += 0.01;
      setRotation({
        x: Math.sin(time * 0.7) * 12,
        y: Math.cos(time * 0.5) * 18,
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-64 h-40 rounded-2xl relative overflow-hidden"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 25px 60px rgba(16, 185, 129, 0.15), 0 0 40px rgba(16, 185, 129, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(${rotation.y * 3}deg, transparent 20%, rgba(16, 185, 129, 0.4) 40%, rgba(59, 130, 246, 0.3) 50%, rgba(139, 92, 246, 0.3) 60%, transparent 80%)`,
          }}
        />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            <div className="w-20 h-1.5 bg-white/20 rounded-full mb-2" />
            <div className="w-32 h-1 bg-emerald-500/30 rounded-full" />
          </div>
          <div className="space-y-1.5">
            <div className="w-24 h-1 bg-white/10 rounded-full" />
            <div className="w-28 h-1 bg-white/10 rounded-full" />
            <div className="w-16 h-1 bg-white/10 rounded-full" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

// Google "G" logo SVG
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}


export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showRipple, setShowRipple] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setShowRipple(true);
      try {
        // Fetch real Google User Info
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();

        // Pass exact Google details to our Backend Database
        const res = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, name: userInfo.name })
        });
        const data = await res.json();

        if (data.userId) {
          onLogin(data.userId, data.email);
        } else {
          alert("Failed to sign in securely.");
        }
      } catch (err) {
        console.error(err);
        alert("Trouble connecting to the authentication server.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      alert("Google Login Failed");
      setIsLoading(false);
    }
  });

  const handleGoogleSignIn = () => {
    loginWithGoogle();
  };

  return (
    <div className="relative h-screen w-screen bg-[#050508] flex items-center justify-center overflow-hidden font-sans">
      {/* Particle background */}
      <ParticleField />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-[-30%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.02] blur-[100px]" />
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-violet-500/[0.02] blur-[80px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 px-6">
        {/* Left side - Branding & Card Preview */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col items-center gap-10"
        >
          <FloatingCard />

          <div className="text-center space-y-3">
            <h1 className="text-4xl font-light tracking-tighter text-white">
              3D<span className="font-bold">CARD</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.4em] text-white/30">
              Interactive Professional Identity
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xs">
            {['3D Preview', 'Custom Themes', 'Export Ready', 'Real-time Edit'].map((feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider bg-white/[0.03] border border-white/[0.06] text-white/30"
              >
                {feature}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right side - Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {/* Mobile branding */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-3xl font-light tracking-tighter text-white mb-2">
              3D<span className="font-bold">CARD</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Interactive Professional Identity
            </p>
          </div>

          {/* Glass card */}
          <div
            className="relative rounded-3xl p-8 lg:p-10 backdrop-blur-xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Glowing top edge */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5"
              >
                <Shield className="w-6 h-6 text-emerald-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl font-semibold text-white tracking-wide mb-2"
              >
                Welcome
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xs text-white/30 leading-relaxed"
              >
                Sign in to create and customize your<br />interactive 3D visiting card
              </motion.p>
            </div>

            {/* Google Sign-In Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button
                id="google-signin"
                type="button"
                disabled={isLoading}
                onClick={handleGoogleSignIn}
                whileHover={{ scale: 1.015, y: -1 }}
                whileTap={{ scale: 0.985 }}
                className="relative w-full py-4 rounded-2xl text-sm font-medium overflow-hidden transition-all duration-300 disabled:cursor-not-allowed group"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.95) 100%)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full"
                      />
                      <span className="text-gray-600">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <GoogleLogo className="w-5 h-5" />
                      <span className="text-gray-700 font-medium">Sign in with Google</span>
                    </>
                  )}
                </span>
                {/* Hover shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    animation: showRipple ? 'none' : undefined,
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-3 my-8"
            >
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] uppercase tracking-widest text-white/15">Secure Authentication</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="space-y-3"
            >
              {[
                { icon: '🔒', text: 'Secure Aiven MySQL Integration' },
                { icon: '⚡', text: 'Instant access to the card builder' },
                { icon: '🎨', text: 'Cards save to your account automatically' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 text-white/20 text-xs"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center mt-6 space-y-2"
          >
            <p className="text-[10px] text-white/15 tracking-wider">
              By signing in, you agree to our Terms of Service
            </p>
            <p className="text-[10px] text-white/10 tracking-wider">
              © 2026 3DCARD. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
