import React, { useState, useEffect } from 'react';
import { Brain, Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'done'>('logo');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center ${phase === 'done' ? 'animate-splash-fade' : ''}`}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/5 rounded-full blur-[100px]" />
      </div>

      {/* Spark particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full animate-spark"
          style={{
            top: `${30 + Math.random() * 40}%`,
            left: `${20 + Math.random() * 60}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        />
      ))}

      {/* Logo */}
      <div className="relative animate-splash-logo">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-accent to-neon-pink flex items-center justify-center glow-primary">
          <Brain className="w-14 h-14 text-primary-foreground" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Zap className="w-8 h-8 text-xp fill-xp drop-shadow-[0_0_8px_hsl(var(--xp)/0.6)]" />
        </div>
      </div>

      {/* Text */}
      <h1 className="font-display text-4xl font-bold text-foreground mt-6 animate-splash-text">
        Mind<span className="bg-gradient-to-r from-primary via-accent to-neon-pink bg-clip-text text-transparent">Spark</span>
      </h1>
      <p className="font-body text-sm text-muted-foreground mt-2 animate-splash-text" style={{ animationDelay: '0.8s' }}>
        Ignite Your Knowledge
      </p>
    </div>
  );
}