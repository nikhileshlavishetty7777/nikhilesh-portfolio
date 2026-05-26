import React, { useEffect, useRef, useState } from "react";
import { DEVELOPER } from "../data/portfolio";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const TECH_ICONS = [
  { icon: "⚛️", label: "React", x: "10%", y: "20%", delay: 0 },
  { icon: "🔥", label: "Firebase", x: "85%", y: "15%", delay: 0.5 },
  { icon: "☕", label: "Java", x: "5%", y: "65%", delay: 1 },
  { icon: "🐘", label: "PHP", x: "90%", y: "60%", delay: 1.5 },
  { icon: "🗄️", label: "MySQL", x: "75%", y: "80%", delay: 0.8 },
  { icon: "📱", label: "Android", x: "20%", y: "80%", delay: 1.2 },
  { icon: "🟨", label: "JS", x: "50%", y: "90%", delay: 0.3 },
  { icon: "🐙", label: "GitHub", x: "50%", y: "5%", delay: 0.7 },
];

const TYPING_WORDS = [
  "AI Developer",
  "Full Stack Developer",
  "Android Developer",
  "Problem Solver",
  "Open Source Enthusiast",
  "3rd Year CSE Student",
];

function useTypingEffect(words) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => setCharIdx((c) => c + 1), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return displayed;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const typedText = useTypingEffect(TYPING_WORDS);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "0, 212, 255" : "124, 58, 237",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-orb"
        style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-orb"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)", animationDelay: "3s" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating tech icons */}
      {TECH_ICONS.map((item, i) => (
        <div
          key={i}
          className="absolute hidden md:flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity duration-300"
          style={{
            left: item.x,
            top: item.y,
            animation: `float ${5 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg border border-white/10">
            {item.icon}
          </div>
          <span className="text-[10px] font-mono text-white/40">{item.label}</span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-8 animate-fadeInUp">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-mono">Available for Internship & Opportunities</span>
        </div>

        {/* Name */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <span className="text-white">Nikhilesh </span>
          <span className="text-gradient">Lavishetty</span>
        </h1>

        {/* Typing animation */}
        <div className="h-10 mb-6 animate-fadeInUp flex items-center justify-center" style={{ animationDelay: "0.2s" }}>
          <span className="font-display text-xl md:text-2xl font-semibold text-cyan-400">
            {typedText}
            <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-[blink_1s_ease-in-out_infinite]" />
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-white/50 font-body text-sm font-medium tracking-widest uppercase mb-6 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          3rd Year Computer Science Engineering Student
        </p>

        {/* Tagline */}
        <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          {DEVELOPER.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary flex items-center gap-2"
          >
            <span>View Projects</span>
            <span>→</span>
          </button>
          <a
            href={DEVELOPER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
          >
            <span>🐙</span>
            <span>GitHub</span>
          </a>
          <a
            href={DEVELOPER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
          >
            <span>💼</span>
            <span>LinkedIn</span>
          </a>
           {/* Instagram */}
  <a
    href={DEVELOPER.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline flex items-center gap-2 hover:border-pink-500/40 hover:text-pink-400"
  >
    <FaInstagram />
    <span>Instagram</span>
  </a>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/20 text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-[float_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
