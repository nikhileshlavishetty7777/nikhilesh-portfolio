import React, { useEffect, useRef, useState } from "react";
import { DEVELOPER, STATS } from "../data/portfolio";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 40);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="about" className="relative py-32 bg-[#0a0a0a]" ref={ref}>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-cyan-400/70 text-sm tracking-widest uppercase">01 — About</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mt-8 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Building the{" "}
              <span className="text-gradient">future</span>{" "}
              one commit at a time.
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-6">
              {DEVELOPER.bio}
            </p>
            <p className="font-body text-white/50 leading-relaxed mb-8">
              When I'm not shipping code, I'm exploring new frameworks, contributing to open source, or competing in hackathons. I believe great software is built at the intersection of technical excellence and user empathy.
            </p>
            <div className="flex flex-wrap gap-3">
              {["📍 Surat, Gujarat", "🎓 B.tech Computer Science Engineering", "🚀 Open to Opportunities", "⚡ Fast Learner"].map((tag) => (
                <span key={tag} className="tech-badge text-xs">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: Stats + Card */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Profile card */}
            <div className="glass rounded-2xl p-8 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-display font-bold text-white mb-4">
                  NL
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-1">{DEVELOPER.name}</h3>
                <p className="text-cyan-400 font-mono text-sm mb-4">{DEVELOPER.title}</p>
                <div className="flex flex-col gap-2 text-sm text-white/50">
                  <span>📧 {DEVELOPER.email}</span>
                  <span>📍 {DEVELOPER.location}</span>
                  <span>🎓 {DEVELOPER.subtitle}</span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="glass rounded-xl p-5 text-center hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="font-display text-3xl font-bold text-gradient mb-1">
                    {inView ? <CountUp target={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
                  </div>
                  <p className="text-white/40 text-xs font-mono">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
