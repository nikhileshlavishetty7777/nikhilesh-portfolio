import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = ["Initializing...", "Loading assets...", "Compiling portfolio...", "Ready."];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    const phaseInterval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, phases.length - 1));
    }, 650);
    return () => { clearInterval(interval); clearInterval(phaseInterval); };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center z-[9999]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Logo mark */}
      <div className="relative mb-12">
        <div className="w-20 h-20 rounded-2xl border border-cyan-500/50 flex items-center justify-center relative"
          style={{ boxShadow: "0 0 40px rgba(0,212,255,0.3)" }}>
          <span className="font-display font-bold text-2xl text-gradient">NS</span>
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-ping" />
        </div>
      </div>

      {/* Loading text */}
      <div className="mb-8 text-center">
        <p className="font-mono text-cyan-400/80 text-sm tracking-widest uppercase mb-2">
          {phases[phase]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
            boxShadow: "0 0 10px rgba(0,212,255,0.8)",
          }}
        />
      </div>
      <p className="mt-3 font-mono text-xs text-white/30">{Math.min(Math.round(progress), 100)}%</p>
    </div>
  );
}
