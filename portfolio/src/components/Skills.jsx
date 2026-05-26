import React, { useRef, useState, useEffect } from "react";
import { SKILLS } from "../data/portfolio";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function SkillBar({ skill, inView, delay }) {
  return (
    <div
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-mono text-sm text-white/80 font-medium">{skill.name}</span>
        </div>
        <span className="font-mono text-xs text-cyan-400">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
            boxShadow: "0 0 8px rgba(0,212,255,0.5)",
            transitionDelay: `${delay + 0.2}s`,
          }}
        />
      </div>
    </div>
  );
}

const CATEGORY_META = {
  frontend: { label: "Frontend", icon: "🎨", color: "cyan" },
  backend: { label: "Backend", icon: "⚙️", color: "purple" },
  database: { label: "Database", icon: "🗄️", color: "blue" },
  tools: { label: "Tools & IDE", icon: "🔧", color: "pink" },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="skills" className="relative py-32 bg-[#030303]" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-cyan-400/70 text-sm tracking-widest uppercase">04 — Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-white/50 font-body mt-4 max-w-xl">
            A battle-tested collection of technologies I use to ship production-grade software.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(SKILLS).map(([cat, skills], ci) => {
            const meta = CATEGORY_META[cat];
            return (
              <div
                key={cat}
                className={`glass rounded-2xl p-6 hover:border-cyan-500/20 transition-all duration-500 card-hover ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${ci * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl">{meta.icon}</span>
                  <span className="font-display font-bold text-white text-sm">{meta.label}</span>
                </div>
                <div className="space-y-5">
                  {skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} inView={inView} delay={ci * 0.1 + i * 0.08} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Badge cloud */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-mono text-white/30 text-xs tracking-widest uppercase text-center mb-6">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["REST APIs", "Agile/Scrum", "OOP", "MVC Pattern", "Firebase Cloud Functions", "Linux", "Postman", "JSON", "XML", "Bootstrap", "Material Design", "XAMPP"].map((tag) => (
              <span key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono text-white/40 border border-white/10 hover:text-white/70 hover:border-white/20 transition-colors duration-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
