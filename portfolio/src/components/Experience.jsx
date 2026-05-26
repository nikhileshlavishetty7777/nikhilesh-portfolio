import React, { useRef, useState, useEffect } from "react";
import { EXPERIENCE } from "../data/portfolio";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const TYPE_COLORS = {
  achievement: { text: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  project: { text: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
  education: { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="experience" className="relative py-32 bg-[#0a0a0a]" ref={ref}>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-cyan-400/70 text-sm tracking-widest uppercase">03 — Experience</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            My <span className="text-gradient">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-8">
            {EXPERIENCE.map((item, i) => {
              const colors = TYPE_COLORS[item.type] || TYPE_COLORS.project;
              return (
                <div
                  key={i}
                  className={`relative flex gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Icon node */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-16 h-16 rounded-2xl glass flex items-center justify-center text-2xl z-10 relative border ${colors.border} ${colors.bg}`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass rounded-2xl p-6 hover:border-cyan-500/20 transition-all duration-300 card-hover">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                        <p className="text-white/50 font-mono text-sm">{item.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-mono capitalize border ${colors.text} ${colors.bg} ${colors.border}`}>
                          {item.type}
                        </span>
                        <span className="text-white/30 font-mono text-sm">{item.year}</span>
                      </div>
                    </div>
                    <p className="text-white/60 font-body leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
