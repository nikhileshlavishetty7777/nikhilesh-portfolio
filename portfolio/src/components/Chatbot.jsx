import React, { useState, useEffect, useRef } from "react";
import { CHATBOT_RESPONSES, DEVELOPER } from "../data/portfolio";

function matchResponse(input) {
  const lower = input.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|howdy|sup|yo)\b/.test(lower)) {
    const arr = CHATBOT_RESPONSES.greetings;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Check each category
  const categories = ["projects", "food", "shopping", "grievance", "skills", "contact", "github", "experience", "available"];
  for (const cat of categories) {
    const rule = CHATBOT_RESPONSES[cat];
    if (rule && rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }

  // Default
  const defaults = CHATBOT_RESPONSES.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 glass rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <div className={`flex gap-2 chat-message-enter ${isBot ? "items-start" : "items-start flex-row-reverse"}`}>
      {isBot && (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-wrap ${
          isBot
            ? "glass rounded-bl-sm text-white/80"
            : "bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 rounded-br-sm text-white"
        }`}
        dangerouslySetInnerHTML={{
          __html: msg.text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}

const QUICK_PROMPTS = [
  "What projects have you built?",
  "What technologies do you know?",
  "Are you available for hire?",
  "Show your GitHub",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: `Hi there! 👋 I'm **Nikhilesh's Portfolio Assistant**.\n\nAsk me anything about his skills, projects, or how to contact him!`, id: 0 },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const msgIdRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const userMsg = { role: "user", text: userText, id: msgIdRef.current++ };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);

    // Simulate typing delay
    const delay = 600 + Math.random() * 800;
    await new Promise((r) => setTimeout(r, delay));

    const response = matchResponse(userText);
    setTyping(false);
    const botMsg = { role: "bot", text: response, id: msgIdRef.current++ };
    setMessages((m) => [...m, botMsg]);
    if (!open) setUnread((u) => u + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[600] w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg"
        style={{
          background: open ? "rgba(10,10,10,0.9)" : "linear-gradient(135deg, #00d4ff, #7c3aed)",
          boxShadow: open ? "none" : "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(124,58,237,0.2)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        title="Chat with Portfolio Assistant"
      >
        {open ? (
          <span className="text-white/80 text-lg">✕</span>
        ) : (
          <span className="text-xl">💬</span>
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[600] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: "520px",
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-white text-sm">Portfolio Assistant</p>
              <p className="font-mono text-[10px] text-cyan-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online — Ask me anything!
              </p>
            </div>
            <span className="text-white/20 font-mono text-xs">@{DEVELOPER.githubUsername}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
            {QUICK_PROMPTS.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors duration-200 whitespace-nowrap">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 pb-4 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, skills..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm outline-none focus:border-cyan-500/50 transition-all duration-300"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
            >
              <span className="text-white text-sm">↑</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
