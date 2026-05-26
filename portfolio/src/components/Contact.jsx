import React, { useRef, useState, useEffect } from "react";
import { DEVELOPER } from "../data/portfolio";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const contactLinks = [
    { icon: "📧", label: "Email", value: DEVELOPER.email, href: `mailto:${DEVELOPER.email}` },
    { icon: "🐙", label: "GitHub", value: `github.com/${DEVELOPER.githubUsername}`, href: DEVELOPER.github },
    { icon: "💼", label: "LinkedIn", value: `linkedin.com/in/${DEVELOPER.githubUsername}`, href: DEVELOPER.linkedin },
  ];

  return (
    <section id="contact" className="relative py-32 bg-[#030303]" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-cyan-400/70 text-sm tracking-widest uppercase">07 — Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white/50 font-body max-w-xl mx-auto">
            I'm actively looking for internship opportunities and exciting projects. Whether you have a question or just want to say hi — my inbox is always open!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Available card */}
            <div className="glass rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="font-display font-bold text-green-400">Available for Hire</span>
              </div>
              <p className="text-white/50 text-sm font-body leading-relaxed">
                Open to full-time positions, internships, freelance work, and interesting collaborations.
              </p>
            </div>

            {/* Contact links */}
            {contactLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-all duration-300 card-hover block"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-lg flex-shrink-0">
                  {link.icon}
                </div>
                <div>
                  <p className="text-white/40 font-mono text-xs">{link.label}</p>
                  <p className="text-white font-body text-sm">{link.value}</p>
                </div>
                <span className="ml-auto text-white/30 text-sm">→</span>
              </a>
            ))}

            {/* Resume download */}
            <a href={DEVELOPER.resumeUrl} download
              className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              📄 Download Resume
            </a>
          </div>

          {/* Right: Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {submitted ? (
              <div className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50 font-body mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Name *</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Nikhilesh Lavishetty"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 font-body text-sm outline-none transition-all duration-300 focus:border-cyan-500/60 focus:bg-white/8 ${errors.name ? "border-red-500/60" : "border-white/10"}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Email *</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="nikhilesh@example.com"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 font-body text-sm outline-none transition-all duration-300 focus:border-cyan-500/60 ${errors.email ? "border-red-500/60" : "border-white/10"}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                  </div>
                </div>
                {/* Subject */}
                <div>
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Subject</label>
                  <input
                    type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Internship opportunity / Project collaboration..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 font-body text-sm outline-none transition-all duration-300 focus:border-cyan-500/60"
                  />
                </div>
                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell me about the opportunity or project you have in mind..."
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 font-body text-sm outline-none transition-all duration-300 focus:border-cyan-500/60 resize-none ${errors.message ? "border-red-500/60" : "border-white/10"}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
                </div>
                <button type="submit" disabled={sending}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>📤 Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
