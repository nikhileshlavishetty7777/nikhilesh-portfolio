import React, { useRef, useState, useEffect } from "react";
import { PROJECTS } from "../data/portfolio";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const FILTERS = ["all", "web", "mobile", "android", "hackathon", "backend"];

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid rgba(0,212,255,0.2)" }}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-3xl flex-shrink-0`}>
            {project.image}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
              {project.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-mono">
                  {project.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-white/40">
              <span>⭐ {project.stats.stars} stars</span>
              <span>🍴 {project.stats.forks} forks</span>
            </div>
          </div>
        </div>

        {/* Long description */}
        <p className="text-white/70 font-body leading-relaxed mb-6">{project.longDescription}</p>

        {/* Tech stack */}
        <div className="mb-6">
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm flex items-center gap-2">
            <span>🐙</span> View Code
          </a>
          {project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm flex items-center gap-2">
              <span>🚀</span> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${hovered ? "border-cyan-500/40 shadow-[0_20px_60px_rgba(0,212,255,0.12)]" : "border-white/5"} animate-fadeInUp`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Card header */}
      <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="text-6xl" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}>{project.image}</div>
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`} />
        {project.badge && (
          <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-yellow-400 font-mono border border-yellow-500/40">
            {project.badge}
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2 text-xs font-mono text-white/60">
          <span>⭐ {project.stats.stars}</span>
          <span>🍴 {project.stats.forks}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/50 text-sm font-body leading-relaxed mb-4 line-clamp-3">{project.description}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tech-badge text-[11px]">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-badge text-[11px]">+{project.tech.length - 4} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-2 rounded-lg border border-white/10 text-xs font-mono text-white/60 hover:text-white hover:border-cyan-500/40 transition-all duration-300 text-center">
            🐙 Code
          </a>
          <button onClick={() => onClick(project)}
            className="flex-1 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300">
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="relative py-32 bg-[#030303]" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-cyan-400/70 text-sm tracking-widest uppercase">02 — Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Things I've <span className="text-gradient">built</span>
          </h2>
          <p className="text-white/50 font-body max-w-xl">
            A collection of projects that showcase my skills across web development, mobile apps, and full-stack engineering.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap gap-2 mb-12 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 capitalize ${
                filter === f
                  ? "bg-cyan-500/20 border border-cyan-400/60 text-cyan-400"
                  : "border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={setSelected} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 font-mono">
            No projects in this category yet...
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
