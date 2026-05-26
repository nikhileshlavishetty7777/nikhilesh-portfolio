import React from "react";
import { DEVELOPER } from "../data/portfolio";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

 const socials = [
  { icon: "🐙", label: "GitHub", href: DEVELOPER.github },
  { icon: "💼", label: "LinkedIn", href: DEVELOPER.linkedin },
  { icon: "📸", label: "Instagram", href: DEVELOPER.instagram },
  { icon: "📧", label: "Email", href: `mailto:${DEVELOPER.email}` },
];

  return (
    <footer className="relative py-12 bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-cyan-500/40 flex items-center justify-center">
              <span className="font-display font-bold text-xs text-gradient">NL</span>
            </div>
            <span className="font-display font-semibold text-white/60 text-sm">{DEVELOPER.name}</span>
          </div>

          {/* Copyright */}
          <p className="font-mono text-white/20 text-xs text-center">
            © {year} {DEVELOPER.name} · Built with React & ❤️
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-sm hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300"
                title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 text-center">
          <p className="font-mono text-white/10 text-xs tracking-widest">
            DESIGNED & DEVELOPED BY {DEVELOPER.name.toUpperCase()} · {DEVELOPER.location.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
