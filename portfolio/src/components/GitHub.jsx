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

// Fallback mock data if API fails
const MOCK_REPOS = [
  { id: 1, name: "food-management-system", description: "PHP/MySQL food inventory & order management", stargazers_count: 12, forks_count: 4, language: "PHP", html_url: "#" },
  { id: 2, name: "shopping-app-android", description: "Android shopping app with Firebase", stargazers_count: 28, forks_count: 9, language: "Java", html_url: "#" },
  { id: 3, name: "smart-grievance-system", description: "University complaint tracking system", stargazers_count: 41, forks_count: 15, language: "Java", html_url: "#" },
  { id: 4, name: "portfolio-website", description: "Personal developer portfolio", stargazers_count: 8, forks_count: 2, language: "JavaScript", html_url: "#" },
];

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  Java: "#b07219",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#2b7489",
};

export default function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = DEVELOPER.githubUsername;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=4`),
        ]);
        if (profileRes.ok) setProfile(await profileRes.json());
        if (reposRes.ok) {
          const data = await reposRes.json();
          setRepos(Array.isArray(data) && data.length > 0 ? data.slice(0, 4) : MOCK_REPOS);
        } else {
          setRepos(MOCK_REPOS);
        }
      } catch {
        setRepos(MOCK_REPOS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const stats = profile
    ? [
        { label: "Public Repos", value: profile.public_repos || "20+" },
        { label: "Followers", value: profile.followers || "50+" },
        { label: "Following", value: profile.following || "30+" },
        { label: "Gists", value: profile.public_gists || "5+" },
      ]
    : [
        { label: "Public Repos", value: "20+" },
        { label: "Projects", value: "15+" },
        { label: "Hackathons", value: "3" },
        { label: "Contributions", value: "500+" },
      ];

  return (
    <section id="github" className="relative py-32 bg-[#0a0a0a]" ref={ref}>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-cyan-400/70 text-sm tracking-widest uppercase">05 — GitHub</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Code on <span className="text-gradient">GitHub</span>
          </h2>
        </div>

        {/* Profile card + stats */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Profile */}
          <div className={`glass rounded-2xl p-6 lg:col-span-1 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                {profile?.avatar_url
                  ? <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover rounded-xl" />
                  : "🐙"}
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{profile?.name || DEVELOPER.name}</h3>
                <p className="font-mono text-sm text-cyan-400">@{username}</p>
              </div>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed mb-4">
              {profile?.bio || "Full Stack Developer | Building cool stuff with code"}
            </p>
            <a
              href={DEVELOPER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center text-sm block"
            >
              🐙 View Profile
            </a>
          </div>

          {/* Stats */}
          <div className={`lg:col-span-2 grid grid-cols-2 gap-4 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors duration-300">
                <div className="font-display text-3xl font-bold text-gradient mb-1">{s.value}</div>
                <p className="text-white/40 font-mono text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub contribution placeholder */}
        <div className={`glass rounded-2xl p-6 mb-8 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-sm text-white/50">Contribution Activity</p>
            <a href={DEVELOPER.github} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
              View on GitHub →
            </a>
          </div>
          <img
            src={`https://ghchart.rshah.org/00d4ff/${username}`}
            alt="GitHub Contributions"
            className="w-full rounded-lg opacity-80"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML += `<div class="text-center py-8 text-white/30 font-mono text-sm">📊 Contribution graph — connect your GitHub to display</div>`;
            }}
          />
        </div>

        {/* Repos */}
        <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-mono text-white/40 text-sm mb-4">Top Repositories</p>
          <div className="grid md:grid-cols-2 gap-4">
            {(loading ? MOCK_REPOS : repos).map((repo, i) => (
              <a
                key={repo.id}
                href={repo.html_url !== "#" ? repo.html_url : DEVELOPER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300 card-hover block"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-mono text-sm font-medium text-white truncate flex-1">{repo.name}</h4>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-xs text-white/40">⭐ {repo.stargazers_count}</span>
                    <span className="text-xs text-white/40">🍴 {repo.forks_count}</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs font-body leading-relaxed mb-3 line-clamp-2">
                  {repo.description || "No description available."}
                </p>
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] || "#aaa" }} />
                    <span className="text-xs font-mono text-white/40">{repo.language}</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
