# 🚀 Developer Portfolio — Ultra-Premium React App

A futuristic, Awwwards-level developer portfolio for a Final Year Computer Engineering student. Built with React, Tailwind CSS, and polished animations.

---

## ✨ Features

| Feature | Status |
|---|---|
| Animated particle hero (canvas) | ✅ |
| Typing animation effect | ✅ |
| Loading screen with progress | ✅ |
| Sticky animated navbar | ✅ |
| Scroll progress bar | ✅ |
| Dark/Light mode toggle | ✅ |
| Projects section + filter + modal | ✅ |
| Animated experience timeline | ✅ |
| Skills with animated progress bars | ✅ |
| GitHub API integration | ✅ |
| AI Portfolio Chatbot | ✅ |
| Contact form with validation | ✅ |
| Back-to-top button | ✅ |
| Glassmorphism UI throughout | ✅ |
| Fully responsive (mobile-first) | ✅ |
| SEO meta tags | ✅ |

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations (ready to use)
- **GitHub REST API** — Live profile + repo data
- **Canvas API** — Particle background in Hero

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🎨 Customization

### 1. Update your info — `src/data/portfolio.js`

```js
export const DEVELOPER = {
  name: "Your Name",          // ← Change this
  email: "you@email.com",     // ← Change this
  github: "https://github.com/yourusername",
  githubUsername: "yourusername",  // ← For GitHub API
  linkedin: "https://linkedin.com/in/you",
  resumeUrl: "/resume.pdf",   // ← Put resume in /public
};
```

### 2. Update Projects — same file

Edit `PROJECTS` array with your real project data, GitHub links, and descriptions.

### 3. Update Skills

Edit `SKILLS` object with your actual proficiency levels.

### 4. Color Theme — `src/index.css`

```css
:root {
  --neon-blue: #00d4ff;    /* Primary accent */
  --neon-purple: #7c3aed;  /* Secondary accent */
  --neon-cyan: #06b6d4;    /* Tertiary accent */
}
```

---

## 🤖 AI Chatbot

The chatbot is **rule-based** by default and answers questions about:
- Projects (Food System, Shopping App, Grievance System)
- Skills & technologies
- Contact information
- GitHub profile
- Availability for hire

### Enable Real AI (Optional)

To use Claude API for real AI responses, update `src/components/Chatbot.jsx`:

```js
// Replace matchResponse() with an API call:
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system: "You are a portfolio assistant for Alex Chen...",
    messages: [{ role: "user", content: userText }]
  })
});
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with dark mode toggle
│   ├── Hero.jsx            # Particle canvas + typing animation
│   ├── About.jsx           # Bio + animated counters
│   ├── Projects.jsx        # Cards + filter + modal
│   ├── Experience.jsx      # Animated timeline
│   ├── Skills.jsx          # Progress bars by category
│   ├── GitHub.jsx          # Live GitHub API data
│   ├── Contact.jsx         # Form with validation
│   ├── Footer.jsx          # Minimal footer
│   ├── Chatbot.jsx         # AI portfolio assistant
│   ├── LoadingScreen.jsx   # Animated loader
│   ├── ScrollProgress.jsx  # Top progress bar
│   └── BackToTop.jsx       # Scroll-to-top button
├── data/
│   └── portfolio.js        # ← ALL your content here
├── App.jsx
├── index.js
└── index.css               # Global styles + Tailwind
```

---

## 🌐 Vercel Deployment

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository → Deploy
4. Done! 🎉

---

Made with ❤️ and a lot of `console.log` debugging.
