import React, { useState, useEffect } from "react";
import { DEVELOPER } from "../data/portfolio";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
          scrolled
            ? "py-3 border-b border-white/[0.06]"
            : "py-5"
        }`}
        style={scrolled ? {
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative group"
          >
            <div className="w-10 h-10 rounded-xl border border-cyan-500/40 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <span className="font-display font-bold text-sm text-gradient">NL</span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 ${
                  active === link.href
                    ? "text-cyan-400 bg-cyan-400/10"
                    : "text-white/60 hover:text-white/90 hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Available badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-mono font-medium">Available</span>
            </div>

            <a
              href={DEVELOPER.resumeUrl}
              className="btn-primary text-xs py-2 px-4"
              download
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block h-[1.5px] bg-white/70 transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[499] md:hidden"
          style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="font-display text-2xl font-bold text-white/70 hover:text-white transition-colors duration-300"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => setDarkMode(!darkMode)} className="btn-outline text-sm">
                {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
              </button>
              <a href={DEVELOPER.resumeUrl} className="btn-primary text-sm" download>
                Resume ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
