import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Atom, FlaskConical, Leaf, Globe, Zap, 
  Trophy, Flame, Target, ChevronRight, Star,
  Shield, Clock, Users, TrendingUp, Award, BookOpen,
  Rocket, GraduationCap, Sparkles
} from 'lucide-react';

const features = [
  { icon: Brain, title: 'Adaptive Learning', desc: 'Questions adjust to your skill level for optimal challenge', color: 'text-primary' },
  { icon: Trophy, title: 'League System', desc: 'Climb from Bronze to Gold as you master each subject', color: 'text-xp' },
  { icon: Flame, title: 'Daily Streaks', desc: 'Build consistency with login rewards and daily missions', color: 'text-streak' },
  { icon: Shield, title: 'Power-ups', desc: 'Use 50/50 and Freeze Time to conquer tough questions', color: 'text-accent' },
  { icon: Users, title: 'Leaderboards', desc: 'Compete globally and challenge friends to beat your score', color: 'text-correct' },
  { icon: Award, title: 'Badges & Rewards', desc: 'Unlock achievements as you reach new milestones', color: 'text-combo' },
];

const sectorList = [
  { icon: Atom, name: 'Physics', desc: 'Forces, energy & waves', gradient: 'from-physics to-[hsl(280,87%,55%)]' },
  { icon: FlaskConical, name: 'Chemistry', desc: 'Elements, bonds & reactions', gradient: 'from-chemistry to-[hsl(170,80%,38%)]' },
  { icon: Leaf, name: 'Biology', desc: 'Life, cells & ecosystems', gradient: 'from-biology to-[hsl(320,80%,50%)]' },
  { icon: Globe, name: 'Earth & Space', desc: 'Planets, geology & climate', gradient: 'from-earth-space to-[hsl(195,90%,48%)]' },
  { icon: BookOpen, name: 'General Science', desc: 'Broad scientific knowledge', gradient: 'from-general to-[hsl(25,95%,50%)]' },
];

const stats = [
  { value: '1000+', label: 'Questions' },
  { value: '5', label: 'Subjects' },
  { value: '125', label: 'Levels' },
  { value: '∞', label: 'Fun' },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">MindSpark</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold text-sm px-5 py-2.5 rounded-xl press-effect hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Start Learning
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 animate-slide-up">
              <Zap className="w-3.5 h-3.5 text-xp" />
              <span className="text-xs font-body font-bold text-primary">125 levels · 5 subjects · Free to play</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.05] mb-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Ignite Your
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-neon-pink bg-clip-text text-transparent">
                Knowledge
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-lg mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Master physics, chemistry, biology and more through bite-sized quizzes, 
              streaks, and friendly competition. Learning has never felt this good.
            </p>
            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold text-base px-8 py-4 rounded-2xl press-effect hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 glow-primary"
              >
                <Zap className="w-5 h-5" /> Play Now
              </button>
              <a
                href="#features"
                className="bg-card text-foreground border border-border font-display font-bold text-base px-8 py-4 rounded-2xl press-effect hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {stats.map(s => (
              <div key={s.label} className="text-center glass rounded-2xl p-4">
                <p className="font-display font-bold text-3xl md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{s.value}</p>
                <p className="text-xs text-muted-foreground font-body font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-40 left-1/3 w-[200px] h-[200px] bg-neon-pink/5 rounded-full blur-[60px] pointer-events-none" />
      </section>

      {/* Subjects */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <p className="text-xs font-body font-bold text-primary uppercase tracking-widest">Explore</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Five Worlds to Conquer</h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorList.map((sector, i) => (
              <RevealSection key={sector.name} delay={i * 80}>
                <div
                  className={`bg-gradient-to-br ${sector.gradient} rounded-2xl p-6 text-white press-effect cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden group`}
                  onClick={() => navigate('/login')}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3 backdrop-blur-sm border border-white/10">
                    <sector.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-1">{sector.name}</h3>
                  <p className="text-white/70 font-body text-sm mb-2">{sector.desc}</p>
                  <p className="text-white/50 font-display font-bold text-xs">25 levels</p>
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full transition-transform duration-500 group-hover:scale-125" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-accent/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealSection>
            <p className="text-xs font-body font-bold text-primary uppercase tracking-widest mb-2">Why MindSpark</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">Built to Keep You Coming Back</h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <RevealSection key={f.title} delay={i * 70}>
                <div className="glass rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-xs font-body font-bold text-primary uppercase tracking-widest mb-2">Simple</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">Pick. Play. Progress.</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose a Subject', desc: 'Pick from 5 science subjects, each with 25 levels of increasing difficulty.', icon: Target },
              { step: '02', title: 'Answer Questions', desc: 'Race the clock, build streaks, and use power-ups to maximize your score.', icon: Clock },
              { step: '03', title: 'Climb the Ranks', desc: 'Earn XP, unlock badges, and compete on the global leaderboard.', icon: TrendingUp },
            ].map((item, i) => (
              <RevealSection key={item.step} delay={i * 100}>
                <div className="relative">
                  <span className="font-display text-7xl font-bold text-primary/10 absolute -top-8 -left-2">{item.step}</span>
                  <div className="relative pt-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5">
        <RevealSection>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary via-accent to-neon-pink rounded-3xl p-10 md:p-16 text-center relative overflow-hidden glow-primary">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
                Ready to Ignite Your Knowledge?
              </h2>
              <p className="text-white/80 font-body text-lg mb-8 max-w-md mx-auto relative z-10">
                125 levels across 5 subjects. Start mastering science one question at a time.
              </p>
              <button
                onClick={() => navigate('/home')}
                className="bg-white text-background font-display font-bold text-base px-8 py-4 rounded-2xl press-effect hover:shadow-xl transition-all duration-300 relative z-10 inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-primary" /> Start Playing Free
              </button>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
              <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-white/5 rounded-full" />
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">MindSpark</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">© 2026 MindSpark. Ignite Your Knowledge.</p>
        </div>
      </footer>
    </div>
  );
}